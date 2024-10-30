import { useState } from "react";
import styled from "styled-components";

export default function Sidebar({ screen, setScreen }) {
  return (
    <TableContainer>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <p style={{ fontWeight: 500, fontSize: 20 }}>Hailey's Notes</p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Subcontainer onClick={() => { setScreen("calender") }} selected={screen === "calender"}>Calendar</Subcontainer>
          <Subcontainer onClick={() => { setScreen("events") }} selected={screen === "events"}>Events</Subcontainer>
        </div>
      </div>
    </TableContainer>
  );
}

const Subcontainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.selected ? "#1c77ff" : "grey"};
  font-weight: 600;
  cursor: pointer;
  padding: 7px 0px 7px 0px;

  &:active{
    opacity: 0.7;
  }

`

const TableContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px 0px 20px;
  background-color: #fff;
  color: black;
  border-right: 1px solid #ddd;
`