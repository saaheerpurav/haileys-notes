import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../calendar.css"

import DropDown from "../components/dropdown";
import MultiCheckbox from "../components/MultiCheckbox";

const { ipcRenderer } = window.require("electron")

const testEventObj = [
  {
    "@odata.etag": "W/\"0L/bk7+nEUGXEypnKz9vZAAGW21enQ==\"",
    "id": "AQMkADAwATMwMAItMGEwNi1mNWM1LTAwAi0wMAoARgAAA6zFLyuXrXdHi-MleEUrqDsHANC-25O-pxFBlxMqZys-b2QAAAIBDQAAANC-25O-pxFBlxMqZys-b2QABltg9WgAAAA=",
    "createdDateTime": "2024-09-29T06:56:53.5056563Z",
    "lastModifiedDateTime": "2024-09-29T06:56:54.090318Z",
    "changeKey": "0L/bk7+nEUGXEypnKz9vZAAGW21enQ==",
    "categories": [],
    "transactionId": "b37b6c21-096a-9016-1b53-b02db0d741f7",
    "originalStartTimeZone": "Dateline Standard Time",
    "originalEndTimeZone": "Dateline Standard Time",
    "iCalUId": "040000008200E00074C5B7101A82E00800000000E0791BC43C12DB010000000000000000100000008524927A4FE4334893795601CF0B2565",
    "uid": "040000008200E00074C5B7101A82E00800000000E0791BC43C12DB010000000000000000100000008524927A4FE4334893795601CF0B2565",
    "reminderMinutesBeforeStart": 15,
    "isReminderOn": true,
    "hasAttachments": false,
    "subject": "test",
    "bodyPreview": "",
    "importance": "normal",
    "sensitivity": "normal",
    "isAllDay": false,
    "isCancelled": false,
    "isOrganizer": true,
    "responseRequested": true,
    "seriesMasterId": null,
    "showAs": "busy",
    "type": "singleInstance",
    "webLink": "https://outlook.live.com/owa/?itemid=AQMkADAwATMwMAItMGEwNi1mNWM1LTAwAi0wMAoARgAAA6zFLyuXrXdHi%2FMleEUrqDsHANC%2F25O%2FpxFBlxMqZys%2Fb2QAAAIBDQAAANC%2F25O%2FpxFBlxMqZys%2Fb2QABltg9WgAAAA%3D&exvsurl=1&path=/calendar/item",
    "onlineMeetingUrl": null,
    "isOnlineMeeting": false,
    "onlineMeetingProvider": "unknown",
    "allowNewTimeProposals": true,
    "occurrenceId": null,
    "isDraft": false,
    "hideAttendees": false,
    "responseStatus": {
      "response": "organizer",
      "time": "0001-01-01T00:00:00Z"
    },
    "body": {
      "contentType": "html",
      "content": ""
    },
    "start": {
      "dateTime": "2024-10-03T15:00:00.0000000",
      "timeZone": "UTC"
    },
    "end": {
      "dateTime": "2024-10-03T15:30:00.0000000",
      "timeZone": "UTC"
    },
    "location": {
      "displayName": "",
      "locationType": "default",
      "uniqueIdType": "unknown",
      "address": {},
      "coordinates": {}
    },
    "locations": [],
    "recurrence": null,
    "attendees": [],
    "organizer": {
      "emailAddress": {
        "name": "Saaheer Purav",
        "address": "outlook_BA9A6DD3BED4C765@outlook.com"
      }
    },
    "onlineMeeting": null,
    "calendar@odata.associationLink": "https://graph.microsoft.com/v1.0/users('outlook_BA9A6DD3BED4C765@outlook.com')/calendars('AQMkADAwATMwMAItMGEwNi1mNWM1LTAwAi0wMAoARgAAA6zFLyuXrXdHi-MleEUrqDsHANC-25O-pxFBlxMqZys-b2QAAAIBBgAAANC-25O-pxFBlxMqZys-b2QAAACz557yAAAA')/$ref",
    "calendar@odata.navigationLink": "https://graph.microsoft.com/v1.0/users('outlook_BA9A6DD3BED4C765@outlook.com')/calendars('AQMkADAwATMwMAItMGEwNi1mNWM1LTAwAi0wMAoARgAAA6zFLyuXrXdHi-MleEUrqDsHANC-25O-pxFBlxMqZys-b2QAAAIBBgAAANC-25O-pxFBlxMqZys-b2QAAACz557yAAAA')"
  },
  {
    "@odata.etag": "W/\"0L/bk7+nEUGXEypnKz9vZAAGW21eBA==\"",
    "id": "AQMkADAwATMwMAItMGEwNi1mNWM1LTAwAi0wMAoARgAAA6zFLyuXrXdHi-MleEUrqDsHANC-25O-pxFBlxMqZys-b2QAAAIBDQAAANC-25O-pxFBlxMqZys-b2QABltg9WcAAAA=",
    "createdDateTime": "2024-09-29T06:48:55.1133282Z",
    "lastModifiedDateTime": "2024-09-29T06:50:56.2039485Z",
    "changeKey": "0L/bk7+nEUGXEypnKz9vZAAGW21eBA==",
    "categories": [],
    "transactionId": "7E163156-7762-4BEB-A1C6-729EA81755A7",
    "originalStartTimeZone": "Pacific Standard Time",
    "originalEndTimeZone": "Pacific Standard Time",
    "iCalUId": "040000008200E00074C5B7101A82E0080000000082BCF5A63B12DB0100000000000000001000000011EB023168C0A04D838FCF60472C233E",
    "uid": "040000008200E00074C5B7101A82E0080000000082BCF5A63B12DB0100000000000000001000000011EB023168C0A04D838FCF60472C233E",
    "reminderMinutesBeforeStart": 15,
    "isReminderOn": true,
    "hasAttachments": false,
    "subject": "Lets go for lunch",
    "bodyPreview": "Does mid month work for you?",
    "importance": "normal",
    "sensitivity": "normal",
    "isAllDay": false,
    "isCancelled": false,
    "isOrganizer": true,
    "responseRequested": true,
    "seriesMasterId": null,
    "showAs": "busy",
    "type": "singleInstance",
    "webLink": "https://outlook.live.com/owa/?itemid=AQMkADAwATMwMAItMGEwNi1mNWM1LTAwAi0wMAoARgAAA6zFLyuXrXdHi%2FMleEUrqDsHANC%2F25O%2FpxFBlxMqZys%2Fb2QAAAIBDQAAANC%2F25O%2FpxFBlxMqZys%2Fb2QABltg9WcAAAA%3D&exvsurl=1&path=/calendar/item",
    "onlineMeetingUrl": null,
    "isOnlineMeeting": false,
    "onlineMeetingProvider": "unknown",
    "allowNewTimeProposals": true,
    "occurrenceId": null,
    "isDraft": false,
    "hideAttendees": false,
    "responseStatus": {
      "response": "organizer",
      "time": "0001-01-01T00:00:00Z"
    },
    "body": {
      "contentType": "html",
      "content": "<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n</head>\r\n<body>\r\nDoes mid month work for you?\r\n</body>\r\n</html>\r\n"
    },
    "start": {
      "dateTime": "2024-10-01T19:00:00.0000000",
      "timeZone": "UTC"
    },
    "end": {
      "dateTime": "2024-10-01T21:00:00.0000000",
      "timeZone": "UTC"
    },
    "location": {
      "displayName": "Harrys Bar",
      "locationType": "default",
      "uniqueId": "Harrys Bar",
      "uniqueIdType": "private"
    },
    "locations": [
      {
        "displayName": "Harrys Bar",
        "locationType": "default",
        "uniqueId": "Harrys Bar",
        "uniqueIdType": "private"
      }
    ],
    "recurrence": null,
    "attendees": [
      {
        "type": "required",
        "status": {
          "response": "none",
          "time": "0001-01-01T00:00:00Z"
        },
        "emailAddress": {
          "name": "Adele Vance",
          "address": "adelev@contoso.com"
        }
      }
    ],
    "organizer": {
      "emailAddress": {
        "name": "Saaheer Purav",
        "address": "outlook_BA9A6DD3BED4C765@outlook.com"
      }
    },
    "onlineMeeting": null,
    "calendar@odata.associationLink": "https://graph.microsoft.com/v1.0/users('outlook_BA9A6DD3BED4C765@outlook.com')/calendars('AQMkADAwATMwMAItMGEwNi1mNWM1LTAwAi0wMAoARgAAA6zFLyuXrXdHi-MleEUrqDsHANC-25O-pxFBlxMqZys-b2QAAAIBBgAAANC-25O-pxFBlxMqZys-b2QAAACz557yAAAA')/$ref",
    "calendar@odata.navigationLink": "https://graph.microsoft.com/v1.0/users('outlook_BA9A6DD3BED4C765@outlook.com')/calendars('AQMkADAwATMwMAItMGEwNi1mNWM1LTAwAi0wMAoARgAAA6zFLyuXrXdHi-MleEUrqDsHANC-25O-pxFBlxMqZys-b2QAAAIBBgAAANC-25O-pxFBlxMqZys-b2QAAACz557yAAAA')"
  }
];

export default function CalendarScreen({ setLocalEvents, appendEvents }) {
  const [accessToken, setAccessToken] = useState(null);
  const [events, setEvents] = useState([]);

  const [parentType, setParentType] = useState("Direct Student Services");
  const [childType, setChildType] = useState("Classroom Lessons");

  const [selectedDate, setSelectedDate] = useState(null);
  const [formVis, setFormVis] = useState(false);
  const [eventFields, setEventFields] = useState([]);

  const localizer = momentLocalizer(moment);



  useEffect(() => {
    let tempData;

    if (childType === "Classroom Lessons") tempData = [
      { name: "Event Title", type: "input", searchable: true, value: "" },
      { name: "Grade", type: "input", searchable: true, value: "" },
      { name: "Teacher", type: "input", searchable: true, value: "" },
      { name: "Domain", type: "dropdown", searchable: true, value: "Academic", options: ["Academic", "Social Emotional", "College/Career"] },
      { name: "Topic", type: "input", searchable: false, value: "" },
    ];

    else if (childType === "Students") tempData = [
      { name: "Event Title", type: "input", searchable: true, value: "" },
      { name: "Name", type: "input", searchable: true, value: "" },
      { name: "Grade", type: "input", searchable: true, value: "" },
      { name: "Gender", type: "input", searchable: true, value: "" },
      { name: "Type of Incident", type: "dropdown", searchable: true, value: "Individual", options: ["Individual", "Restorative", "Small Group", "Crisis Intervention"] },
      { name: "Topic", type: "multiselect", searchable: true, value: [], options: ["General Check In", "Emotions", "Friendship", "Family", "Problem Solving", "Other"] },
      { name: "Parent Contact", type: "checkbox", searchable: false, checked: false },
      { name: "Follow Up", type: "textbox", searchable: false, value: "" },
    ];

    else if (childType === "Staff") tempData = [
      { name: "Event Title", type: "input", searchable: true, value: "" },
      { name: "Name", type: "input", searchable: true, value: "" },
      { name: "Conversation Topic", type: "input", searchable: false, value: "" },
      { name: "Follow Up", type: "textbox", searchable: false, value: "" },
    ];

    else if (childType === "Meetings") tempData = [
      { name: "Event Title", type: "input", searchable: true, value: "" },
      { name: "Type of Meeting", type: "dropdown", searchable: true, value: "Guidance Team", options: ["Guidance Team", "504 Plan", "IEP", "General"] },
      {
        name: "People Present", type: "container", searchable: false, options: [
          { name: "Parents", type: "input", searchable: true, value: "", inContainer: true },
          { name: "Student Name", type: "input", searchable: true, value: "", inContainer: true },
          { name: "Student Present", type: "checkbox", searchable: false, checked: false, inContainer: true },
          { name: "Other Staff Present", type: "input", searchable: false, value: "", inContainer: true },
          { name: "Follow Up", type: "textbox", searchable: false, value: "", inContainer: true },
        ]
      },
    ];

    else if (childType === "Team Meetings") tempData = [
      { name: "Event Title", type: "input", searchable: true, value: "" },
      { name: "Team Meetings", type: "dropdown", searchable: false, value: "MTSS Team", options: ["MTSS Team", "SWB", "RE&I", "Admin Team"] },
    ];

    setEventFields(tempData);
  }, [childType]);

  useEffect(() => {
    if (parentType === "Direct Student Services") setChildType("Classroom Lessons")
    else if (parentType === "Indirect Student Services") setChildType("Staff")
  }, [parentType]);

  useEffect(() => {
    ipcRenderer.on("token", (event, token) => {
      setAccessToken(token);
      sendEventReq(token, events);
    });

    ipcRenderer.invoke("get_events").then(e => {
      if (e) {
        setLocalEvents(e);
        let tempEvents = [];
        for (let i of e) tempEvents.push({ ...i.meta, childType: i.childType });

        ipcRenderer.invoke("init").then(token => {
          if (token !== null) {
            setAccessToken(token);
            sendEventReq(token, tempEvents);
          }
          else setEvents(tempEvents);
        });
      }
    })
  }, []);



  const colorSetter = (ct) => {
    let bgColor, textColor;

    switch (ct) {
      case "Classroom Lessons":
        bgColor = "#1655b3"
        textColor = "#fff"
        break;

      case "Students":
        bgColor = "#369cf0"
        textColor = "#fff"
        break;

      case "Staff":
        bgColor = "#0e8327"
        textColor = "#fff"
        break;

      case "Meetings":
      case "Team Meetings":
        bgColor = "#55f378"
        textColor = "#000"
        break;

      default:
        break;
    }

    return {
      backgroundColor: bgColor,
      color: textColor,
    }
  }

  const handleLogin = () => {
    ipcRenderer.invoke('login');
  };

  function convertToDateTimeWithTimezone(dateTime) {
    let date = new Date(dateTime);
    let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    let offset = date.getTimezoneOffset() / 60;
    let hours = date.getHours();

    newDate.setHours(hours - offset);
    return newDate;
  }

  const sendEventReq = (token, defaultEvents) => {
    fetch(`https://graph.microsoft.com/v1.0/me/calendar/events`, {
      method: 'GET',
      headers: {
        "Authorization": token,
      }
    })
      .then(res => res.json())
      .then(res => {
        if (Object.keys(res).includes("error") && res["error"]["code"] === "InvalidAuthenticationToken") {
          ipcRenderer.invoke("get_refresh_token").then(e => {
            setAccessToken(e);
            sendEventReq(e, events);
          })
        }

        else {
          let tempEvents = [...defaultEvents];

          for (let [idx, obj] of res.value.entries()) tempEvents.push({
            id: idx,
            title: obj.subject,
            start: convertToDateTimeWithTimezone(obj.start.dateTime),
            end: convertToDateTimeWithTimezone(obj.end.dateTime),
          });

          setEvents(tempEvents);
        }
      })
      .catch(error => console.log('error', error));

  }

  const handleFieldChange = (obj, val) => {
    let tempEvents = [...eventFields];
    let activeEvent;

    if (obj.inContainer === true) {
      let tempArr = tempEvents[2]["options"];
      activeEvent = tempArr[tempArr.findIndex(e => e.name === obj.name)];
    }
    else activeEvent = tempEvents[tempEvents.findIndex(e => e.name === obj.name)];


    if (["input", "textbox", "dropdown", "multiselect"].includes(obj.type)) activeEvent.value = val;
    else if (obj.type === "checkbox") activeEvent.checked = val;

    setEventFields(tempEvents);
  }

  const renderField = (e) => {
    if (e.type === "input") return <Input value={e.value} onChange={(event) => { handleFieldChange(e, event.target.value) }} />
    else if (e.type === "textbox") return <Textbox value={e.value} onChange={(event) => { handleFieldChange(e, event.target.value) }} />
    else if (e.type === "dropdown") return <DropDown defaultOption={e.options[0]} options={e.options} setOption={(v) => { handleFieldChange(e, v) }} />
    else if (e.type === "multiselect") return <MultiCheckbox defaultOptions={e.value} options={e.options} setOptions={(v) => { handleFieldChange(e, v) }} />
    else if (e.type === "checkbox") return <input type="checkbox" checked={e.checked} onChange={() => handleFieldChange(e, !e.checked)} />
    else if (e.type === "container") return renderEvents(e.options)
  }

  const renderEvents = (eventsList) => {
    return eventsList.map((e, idx) =>
      <div key={idx}>
        <p>{e.name}</p>
        {renderField(e)}
      </div>
    )
  }

  const createEvent = () => {
    let newObj = {
      id: selectedDate.id ?? events.length,
      title: selectedDate.title ?? eventFields.find(e => e.name === "Event Title").value,
      start: selectedDate.start,
      end: selectedDate.end,
      childType,
    };

    appendEvents({
      parentType,
      childType,
      eventFields,
      meta: newObj
    });

    if (selectedDate.id === undefined) setEvents([...events, newObj]);

    Promise.resolve()
      .then(() => { setChildType(null); })
      .then(() => { setChildType("Classroom Lessons"); })

    setFormVis(false);
  }


  
  return (
    <div style={{ width: "100%", padding: 20, backgroundColor: "#f5f5f5", height: "100vh" }}>
      <h2 style={{ marginTop: 0, color: "#1c77ff" }}>Calendar</h2>

      <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
        <div style={{ width: "100%" }}>
          <Calendar
            localizer={localizer}
            events={events}
            selectable
            startAccessor="start"
            endAccessor="end"
            style={{ height: "80%", width: "100%", backgroundColor: "white", borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
            onSelectSlot={(e) => { setSelectedDate(e); }}
            onSelectEvent={(e) => { setSelectedDate(e); }}
            eventPropGetter={
              (event, start, end, isSelected) => {
                if ("childType" in event) return { style: colorSetter(event.childType) }
              }
            }
          />
          {
            accessToken
              ? null
              : <Button onClick={handleLogin} style={{ marginTop: 20 }}>Sign In with Microsoft</Button>
          }
        </div>

        {
          formVis
            ? <div style={{ overflow: "auto", height: "100vh", minWidth: 300, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", }}>
              <h2>New Event</h2>

              <p style={{ marginTop: 0 }}>{moment(selectedDate.start).format('D MMMM, YYYY')}</p>

              <DropDown defaultOption={parentType} options={["Direct Student Services", "Indirect Student Services"]} setOption={(e) => { setParentType(e); }} />

              <div key={parentType} style={{ marginTop: 20, paddingBottom: 20 }}>
                {
                  parentType === "Direct Student Services"
                    ? <DropDown defaultOption={childType} options={["Classroom Lessons", "Students"]} setOption={(e) => { setChildType(e); }} />
                    : <DropDown defaultOption={childType} options={["Staff", "Meetings", "Team Meetings"]} setOption={(e) => { setChildType(e); }} />
                }

                {renderEvents(eventFields)}
              </div>

              <Button onClick={createEvent}>Create Event</Button>
              <Button onClick={() => { setFormVis(false); }} style={{ marginTop: 10, background: "transparent", color: "red" }}>Cancel</Button>
            </div>

            : <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", marginLeft: 20, minWidth: 200 }}>
              <Button onClick={() => { setFormVis(true); }} disabled={selectedDate === null}>New Event</Button>
              {
                selectedDate === null
                  ? <p>Kindly select a date</p>
                  : <p>{moment(selectedDate.start).format('D MMMM, YYYY')}</p>
              }
            </div>
        }
      </div>
    </div>

  );
}

const Button = styled.button`
  background-color: #1c77ff;
  color: white;
  text-align: center;
  padding: 10px 20px;
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 200px;
  box-sizing: border-box;

  &:active {
    background-color: #1655b3;
  }

  &:disabled{
    background-color: #aaa;
    cursor: default;
  }
`

const InputCss = css`
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  width: 200px;
  box-sizing: border-box;
`

const Input = styled.input`
  ${InputCss};
`;

const Textbox = styled.textarea`
  ${InputCss};
  font-family: inherit;
`;