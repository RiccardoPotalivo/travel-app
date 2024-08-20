import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home";
import TripPage from "../pages/Trip/index";
import TripIndex from "../pages/Trip/index";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<TripIndex />} />
        </Routes>
    );
}

export default AppRoutes;