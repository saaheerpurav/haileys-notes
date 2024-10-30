export const msalConfig = {
    auth: {
        clientId: "d1a12150-fb89-4d07-8f1e-ecff2c7d464e", // Replace with your Azure AD clientId
        authority: "https://login.microsoftonline.com/c3a35706-041d-4cfe-ac4d-566567acb444", // Replace with your Azure AD tenantId
        redirectUri: "http://localhost:3000", // The URL you want users redirected to after login
    },
    cache: {
        cacheLocation: "localStorage", // Can also be "localStorage"
        storeAuthStateInCookie: false, // Set to true for IE11 or Edge
    },
};

export const loginRequest = {
    scopes: ["User.Read", "Calendars.Read", "Calendars.ReadBasic", "Calendars.ReadWrite"], // Define the permissions you need from Microsoft Graph API
};