import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from 'moment'

import DropDown from "../components/dropdown";

export default function EventScreen({ events, setLocalEvents }) {
    const [selectedField, setSelectedField] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredResults, setFilteredResults] = useState(events);

    useEffect(() => {
        handleSearch();
    }, [searchText]);

    const childTypeCounts = events.reduce((acc, event) => {
        const { childType } = event;
        acc[childType] = (acc[childType] || 0) + 1;
        return acc;
    }, {});

    const getSearchableFields = (eventFields) => {
        const fields = [];

        eventFields.forEach((field) => {
            if (field.searchable) {
                fields.push(field);
            }

            // If a field is a container, check the options inside
            if (field.type === "container") {
                field.options.forEach((option) => {
                    if (option.searchable) {
                        fields.push(option);
                    }
                });
            }
        });

        return fields;
    };

    // Get all unique searchable fields across all events
    const searchableFields = Array.from(
        new Set(
            events.flatMap((event) => getSearchableFields(event.eventFields).map((field) => field.name))
        )
    );

    // Handle the search logic
    const handleSearch = () => {
        if (!selectedField || searchText === "") {
            setFilteredResults(events); // Show all if no search
        } else {
            const results = events.filter((event) =>
                event.eventFields.some((field) => {
                    if (field.name === selectedField && field.value.toString().toLowerCase().includes(searchText.toLowerCase())) {
                        return true;
                    }

                    // Handle container fields
                    if (field.type === "container") {
                        return field.options.some(
                            (option) =>
                                option.name === selectedField &&
                                option.value.toString().toLowerCase().includes(searchText.toLowerCase())
                        );
                    }

                    return false;
                })
            );

            setFilteredResults(results);
        }
    };


    const renderFieldValue = (obj) => {
        if (obj.type === "multiselect") return <p>{obj.value.join(", ")}</p>
        else if (obj.type === "checkbox") return <p>{obj.checked ? "Yes" : "No"}</p>
        else if (obj.type === "container") return renderField(obj.options)
        else return <p>{obj.value}</p>;
    }

    const renderField = (eventList) => {
        return eventList.map((obj, idx2) => {
            return obj.name !== "Event Title"
                ? <EventField key={idx2} style={{ flexDirection: obj.type === "container" ? "column" : "row" }}>
                    {
                        obj.type === "container"
                            ? <p style={{ marginRight: 10, fontWeight: 500 }}>{obj.name}</p>
                            : <p style={{ marginRight: 10 }}>{obj.name}:</p>
                    }
                    {renderFieldValue(obj)}
                </EventField>
                : null
        })
    }

    const deleteEvent = (idx) => {
        let tempEvents = [...events];
        tempEvents.splice(idx, 1);
        setLocalEvents(tempEvents);
    }



    return (
        <div style={{ width: "100%", backgroundColor: "#f5f5f5", padding: 20 }}>
            <h2 style={{ marginTop: 0, color: "#1c77ff" }}>Events</h2>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 30 }}>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                    <label style={{ marginRight: 10 }} htmlFor="fieldSelect">Search By:</label>
                    <DropDown options={searchableFields} setOption={(e) => { setSelectedField(e); }} />
                </div>

                <Input type="text" placeholder="Enter search term" value={searchText} onChange={(e) => setSearchText(e.target.value)} disabled={selectedField.trim() === ""} />

            </div>

            <div style={{ display: "flex", flexDirection: "row", marginBottom: 50 }}>
                {Object.entries(childTypeCounts).map(([childType, count]) => (
                    <div style={{ marginRight: 20 }} key={childType}>
                        <span style={{ marginRight: 5 }}>{childType}:</span>{count}
                    </div>
                ))}
            </div>

            <ListContainer>

                {
                    filteredResults.map((event, idx1) =>
                        <EventContainer key={idx1}>

                            <DeleteButton onClick={() => { deleteEvent(idx1) }}>Delete</DeleteButton>

                            <b style={{ fontWeight: 500 }}>{event.meta.title}</b>
                            <p style={{ marginTop: 0 }}>{moment(event.meta.start).format('D MMMM, YYYY')}</p>

                            {renderField(event.eventFields)}

                        </EventContainer>
                    )
                }
            </ListContainer>
        </div>

    );
}

const DeleteButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    color: red;
    font-weight: 600;
    font-family: inherit;
    background-color: white;

    &:active {
        opacity: 0.7;
    }
`

const Input = styled.input`
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    width: 80%;
    height: 33px;
    box-sizing: border-box;
`

const ListContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: auto auto auto;
    grid-gap: 25px;
    overflow: auto;
    height: 70vh;
`

const EventContainer = styled.div`
    position: relative;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
`

const EventField = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;

    & p{
        margin: 0px;
    }
`