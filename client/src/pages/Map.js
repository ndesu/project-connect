import React, { useEffect, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import Header from "../components/Header";
import { AdvancedMarker, APIProvider, Map, Marker, Pin } from "@vis.gl/react-google-maps";
import eventIcon from '../../../static/images/event-icon.png'
import supplyIcon from '../../../static/images/supply-icon.png'

export default function MapPage() {
    const location = useLocation();
    const email = location.state?.email
    const [eventMarkers, setEventMarkers] = useState([])
    const [supplyMarkers, setSupplyMarkers] = useState([]) 
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
                setEventMarkers(data[0])
                setSupplyMarkers(data[1])
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
            {email ? 
            (<APIProvider apiKey={apiKey}>
                <Map
                    style={{width: '100vw', height: '100vh', padding: '20px'}}
                    defaultCenter={{lat: 40.696446033578745, lng: -73.98791095312244}}
                    defaultZoom={10}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {eventMarkers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            title={`Event: ${marker.eventName} at ${marker.address}`}
                            options={{
                                icon: {
                                    url: eventIcon,
                                }
                            }}
                        />
                    ))}
                    {supplyMarkers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            title={`${marker.itemName} needed at ${marker.address}`}
                            options={{
                                icon: {
                                    url: supplyIcon,
                                }
                            }}
                        />
                    ))}
                </Map>
            </APIProvider>)
            : (<p>You are not logged in</p>)}
        </div>
    )
}