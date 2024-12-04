import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AdvancedMarker, APIProvider, Map, Marker, Pin } from "@vis.gl/react-google-maps";
import eventIcon from '../../../static/images/event-icon.png'
import supplyIcon from '../../../static/images/supply-icon.png'

export default function MapPage() {
    const location = useLocation();
    const email = location.state?.email
    const clientinfo = location.state?.clientinfo
    const [eventMarkers, setEventMarkers] = useState([])
    const [supplyMarkers, setSupplyMarkers] = useState([])
    const [userLocation, setUserLocation] = useState(null)
    const apiKey = 'AIzaSyAHfuaC6Xs3ld9E6ref8FKCxulfDaz2RkY'

    const mapLocations = () => {
        fetch("http://localhost:8080/get_map", {
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

    const getCenter = () => {
        console.log('function called')
        fetch("http://localhost:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "getMapCenter", email })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("map center: ", data)

                const cityState = data
                const geocodingURL = new URL("https://maps.googleapis.com/maps/api/geocode/json")
                geocodingURL.searchParams.append("address", cityState)
                geocodingURL.searchParams.append("key", apiKey)

                fetch(geocodingURL.toString())
                    .then((response) => response.json())
                    .then((geocodingData) => {
                        if (geocodingData.status === "OK") {
                            console.log(geocodingData)
                            const currLocation = geocodingData.results[0].geometry.location
                            console.log("location:", currLocation.lat, currLocation.lng)
                            setUserLocation(currLocation)
                        } else {
                            console.error("Geocoding error: ", geocodingData.status)
                        }
                    })
                    .catch((error) => {
                        console.error("error fetching geocoding data:", error.message)
                    })
            })
            .catch((error) => {
                console.error("Error fetching map center: ", error.message)
            })
    }

    useEffect(() => {
        mapLocations();
        getCenter();
    }, []);

    return (
        <div>
            <Header email={email} clientinfo={clientinfo} />
            {email ? (
                userLocation ? ( // Render the map only after userLocation is ready
                    <APIProvider apiKey={apiKey}>
                        <Map
                            style={{ width: '100vw', height: '100vh' }}
                            defaultCenter={userLocation} // Use 'center' for dynamic updates
                            defaultZoom={10}
                            options={{
                                gestureHandling: 'greedy',
                                disableDefaultUI: true,
                            }}
                        >
                            {/* Event Markers */}
                            {eventMarkers.map((marker, index) => (
                                <Marker
                                    key={index}
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                    title={`Event: ${marker.eventName} at ${marker.address}`}
                                    options={{
                                        icon: {
                                            url: eventIcon,
                                        },
                                    }}
                                />
                            ))}

                            {/* Supply Markers */}
                            {supplyMarkers.map((marker, index) => (
                                <Marker
                                    key={index}
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                    title={`${marker.itemName} needed at ${marker.address}`}
                                    options={{
                                        icon: {
                                            url: supplyIcon,
                                        },
                                    }}
                                />
                            ))}
                        </Map>
                    </APIProvider>
                ) : (
                    <p>Loading map...</p> // Fallback while waiting for userLocation
                )
            ) : (
                <p>You are not logged in</p>
            )}
        </div>

    )
}