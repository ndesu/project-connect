import React, { useEffect, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import Header from "../components/Header";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function MapPage() {
    const location = useLocation();
    const email = location.state?.email
    const [markers, setMarkers] = useState([]) 

    const apiKey = ''

    const mapLocations = () => {
        fetch("http://localhost:8080/map", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.text())
        .then((rawText) => {
            const jsonEndIndex = rawText.indexOf("HTTP/1.0");
            const validJson = jsonEndIndex > 0 
                ? rawText.slice(0, jsonEndIndex).trim()
                : rawText.trim();
            try {
                const data = JSON.parse(validJson);
                console.log("Parsed JSON Data:", data); // Use the cleaned data
                setMarkers(data)
            } catch (error) {
                console.error("Error parsing JSON:", error.message, {
                    rawText,
                    validJson,
                });
            }
        })
        .catch((error) => {
            console.error("Error fetching locations:", error.message);
        });
    };
    

    

    useEffect(() => {
        mapLocations();
    }, []);

    return (
        <div>
            <Header email={email}/>
            <h1>This is the Map Page</h1>
            {email ? <p>Welcome {email}!</p> : 
            <p>You are not logged in</p>
            }
            <APIProvider apiKey={apiKey}>
                <Map
                    style={{width: '100vw', height: '100vh', padding: '20px'}}
                    defaultCenter={{lat: 40.696446033578745, lng: -73.98791095312244}}
                    defaultZoom={14}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lon }}
                            title={marker.address}
                        />
                    ))}
                </Map>
            </APIProvider>
        </div>
    )
}