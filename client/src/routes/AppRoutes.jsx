import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home";
import TripIndex from "../pages/Trip/index";
import TripCreate from "../pages/Trip/create";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<TripIndex />} />
            <Route path="/trips/create" element={<TripCreate />} />

        </Routes>
    );
}

export default AppRoutes;