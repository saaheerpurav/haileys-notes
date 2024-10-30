import { app, BrowserWindow, ipcMain, shell, safeStorage } from 'electron';
import path from "path";
import { fileURLToPath } from 'url';

import { PublicClientApplication, CryptoProvider } from '@azure/msal-node';
import {
  DataProtectionScope,
  Environment,
  PersistenceCreator,
  PersistenceCachePlugin,
} from "@azure/msal-node-extensions";

import Store from 'electron-store';

var window;
const isDev = !app.isPackaged;

const store = new Store({
  name: 'app-encrypted',
  watch: true,
  encryptionKey: 'this_only_obfuscates',
});

if ([undefined, null].includes(store.get("events"))) store.set("events", []);

const cachePath = path.join(
  Environment.getUserRootDirectory(),
  "./cache.json"
);

const persistenceConfiguration = {
  cachePath,
  dataProtectionScope: DataProtectionScope.CurrentUser,
  serviceName: "test-msal-electron-service",
  accountName: "test-msal-electron-account",
  usePlaintextFileOnLinux: false,
};

const persistence = await PersistenceCreator.createPersistence(persistenceConfiguration);



if (process.defaultApp) {
  if (process.argv.length >= 2) app.setAsDefaultProtocolClient('haileys-notes', process.execPath, [path.resolve(process.argv[1])])
}
else app.setAsDefaultProtocolClient('haileys-notes')

const gotTheLock = app.requestSingleInstanceLock();

const msalConfig = {
  auth: {
    clientId: "4afa5547-eb1c-4c8a-a996-7e371419b901", // Replace with your Azure AD clientId
    authority: "https://login.microsoftonline.com/common", // Replace with your Azure AD tenantId
  }
};

const loginScopes = ["User.Read", "Calendars.Read", "Calendars.ReadBasic", "Calendars.ReadWrite"];

const pca = new PublicClientApplication({
  auth: msalConfig.auth,
  cache: {
    cachePlugin: new PersistenceCachePlugin(persistence),
  },
});
const { verifier, challenge } = await new CryptoProvider().generatePkceCodes();

const authCodeUrlParameters = {
  scopes: loginScopes,
  redirectUri: "haileys-notes://auth",
  codeChallenge: challenge,
  codeChallengeMethod: "S256",
};



function setToken(key, password) {
  const buffer = safeStorage.encryptString(password);
  store.set(key, buffer.toString('latin1'));
}

function getToken(key) {
  let token = store.get(key);
  if (token !== undefined) return safeStorage.decryptString(Buffer.from(token, 'latin1'))
  return null;
}


function createWindow() {
  // Create the main application window
  window = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  // Hide the top menu
  window.removeMenu();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Load the React application
  // If development, load localhost, else load index.html
  window.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Open DevTools if in development environment
  if (isDev) window.webContents.openDevTools({ mode: 'detach' });
}

if (!gotTheLock) app.quit();
else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (window) {
      if (window.isMinimized()) window.restore()
      window.focus()
    }
    let newUrl = commandLine.pop();

    if (newUrl.startsWith("haileys-notes://auth")) {
      const urlParams = new URLSearchParams(newUrl.split('?')[1]);

      const tokenRequest = {
        code: urlParams.get("code"),
        codeVerifier: verifier,
        redirectUri: "haileys-notes://auth",
        scopes: loginScopes,
      };

      pca.acquireTokenByCode(tokenRequest)
        .then((response) => {
          setToken("access_token", response.accessToken);
          window.webContents.send("token", response.accessToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })



  app.whenReady().then(() => {
    createWindow();

    //store.clear();

    const openBrowser = async (url) => {
      await shell.openExternal(url);
    };

    const loginAuth = () => {
      try {
        pca.getAuthCodeUrl(authCodeUrlParameters)
          .then((response) => {
            openBrowser(response);
          })
          .catch((error) => console.log(error));
      }
      catch (error) {
        console.error('Login failed: ', error);
      }
    }

    ipcMain.on("set_events", (e, tempEvents) => {
      store.set("events", tempEvents);
    })

    ipcMain.handle("get_events", () => {
      return store.get("events");
    });

    ipcMain.handle('login', async () => {
      loginAuth();
    });

    ipcMain.handle("init", () => {
      return getToken("access_token");
    })

    ipcMain.handle("get_refresh_token", async () => {
      let cache = pca.getTokenCache();
      let currentAccounts = await cache.getAllAccounts();

      let silentTokenRequest = {
        account: currentAccounts[0],
        scopes: loginScopes,
      }

      return pca.acquireTokenSilent(silentTokenRequest)
        .then(e => {
          setToken("access_token", e.accessToken);
          return e.accessToken;
        })
        .catch(e => {
          console.log(e);
          loginAuth();
          return null;
        })
    })

  });
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application
  // in memory even after all windows have been closed

  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})