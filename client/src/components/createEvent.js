import React, { useState } from "react";

export default function CreateEvent({ orgID }) {
    const apiKey = ''
    const [createEventData, setCreateEventData] = useState({
        orgID: orgID,
        eventName: "",
        eventDescription: "",
        date: "",
        time: "",
        maxVolunteers: "",
        address: "",
        // latitude: "",
        // longitude: ""
    })

    function checkFields(dataObj) {
        console.log(dataObj)
        for (let key in dataObj) {
            if (!dataObj.hasOwnProperty(key)) continue;
            if (!dataObj[key]) {
                return false
            };
        }
        return true;
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCreateEventData({...createEventData, [name]: value })
    }

    const handleCreateEventSubmit = (e) => {
        e.preventDefault();
        
        // const geocodingURL = new URL("https://maps.googleapis.com/maps/api/geocode/json")
        // geocodingURL.searchParams.append("address", createEventData.address)
        // geocodingURL.searchParams.append("key", apiKey)

        // fetch(geocodingURL.toString())
        //     .then((response) => response.json())
        //     .then((geocodingData) => {
        //         if (geocodingData.status === "OK") {
        //             console.log(geocodingData)
        //             const currLocation = geocodingData.results[0].geometry.location
        //             console.log("location:", currLocation.lat, currLocation.lng)
        //             setCreateEventData.latitude(currLocation.lat)
        //             setCreateEventData.longitude(currLocation.lng)
        //         } else {
        //             console.error("Geocoding error: ", geocodingData.status)
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("error fetching geocoding data:", error.message)
        //     })
        
        if(!checkFields(createEventData)) {
            alert("Enter All Information Before Submitting")
        } else {
            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "createEvent", ...createEventData }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                })
        }
    }

    return (
        <form class="formFields" onSubmit={handleCreateEventSubmit}>
            <label htmlFor="eventName">Event Name</label>
            <input type="eventName" name="eventName" value={createEventData.eventName} onChange={handleFormChange} />

            <label htmlFor="eventDescription">Description of Event</label>
            <input type="eventDescription" name="eventDescription" value={createEventData.eventDescription} onChange={handleFormChange} />

            <label htmlFor="date">Date of Event</label>
            <input type="date" name="date" value={createEventData.date} onChange={handleFormChange} />

            <label htmlFor="time">Time of Event</label>
            <input type="time" name="time" value={createEventData.time} onChange={handleFormChange} />

            <label htmlFor="volunteers">Max Volunteer Slots</label>
            <input type="volunteers" name="maxVolunteers" value={createEventData.maxVolunteers} onChange={handleFormChange} />

            <label htmlFor="address">Full Address</label>
            <input type="address" name="address" value={createEventData.address} onChange={handleFormChange} />

            <div class="button-wrapper"><button type="submit">Create Event</button></div>
        </form>
    )
}