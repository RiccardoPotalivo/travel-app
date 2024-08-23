import React from "react";
import { Routes, Route } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Home from "../pages/Home/home";
import TripIndex from "../pages/Trip/index";
import TripShow from "../pages/Trip/show";
import TripCreate from "../pages/Trip/create";
import DayShow from "../pages/Day/show";

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
            </Routes>
        </div>
    );
}

export default AppRoutes;