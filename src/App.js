import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import CalendarScreen from "./screens/CalendarScreen";
import EventScreen from "./screens/EventScreen";

const { ipcRenderer } = window.require("electron")

export default function App() {
  const [screen, setScreen] = useState("calender");
  const [events, setEvents] = useState([]);

  const appendEvents = (e) => {
    setEvents([...events, e]);
    ipcRenderer.send("set_events", [...events, e]);
  }

  const setLocalEvents = (e) => {
    setEvents(e);
    ipcRenderer.send("set_events", e);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar screen={screen} setScreen={setScreen} />
      {
        screen === "calender"
          ? <CalendarScreen appendEvents={appendEvents} setLocalEvents={setEvents} />
          : <EventScreen key={events} events={events} setLocalEvents={setLocalEvents} />
      }
    </div>
  );
}