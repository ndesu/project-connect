import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MapPage from "./pages/Map";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import NewPost from "./pages/NewPost";
import "./App.css"

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/newpost" element={<NewPost />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/events" element={<Events />} />
                <Route path="*" element={<div>404: Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}
