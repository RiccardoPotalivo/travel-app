import React from "react";
import { Routes, Route } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Home from "../pages/Home/home";
import TripIndex from "../pages/Trip/index";
import TripShow from "../pages/Trip/show";
import TripCreate from "../pages/Trip/create";
import DayShow from "../pages/Day/show";
import StopCreate from "../pages/Stop/create";
import StopShow from "../pages/Stop/show";

function AppRoutes() {
    return (
        <div>
            <Breadcrumbs />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trips" element={<TripIndex />} />
                <Route path="/trips/:tripSlug" element={<TripShow />} />
                <Route path="/trips/create" element={<TripCreate />} />
                <Route path="/trips/:tripSlug/days/:daySlug" element={<DayShow />} />
                <Route path="/trips/:tripSlug/days/:daySlug/stops/create" element={<StopCreate />} />
                <Route path="/trips/:tripSlug/days/:daySlug/stops/:stopSlug" element={<StopShow />} />
            </Routes>
        </div>
    );
}

export default AppRoutes;