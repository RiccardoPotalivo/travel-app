import React from "react";
import { Routes, Route } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Home from "../pages/Home/home";
import TripIndex from "../pages/Trip/index";
import TripShow from "../pages/Trip/show";
import TripCreate from "../pages/Trip/create";

function AppRoutes() {
    return (
        <div>
            <Breadcrumbs />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trips" element={<TripIndex />} />
                <Route path="/trips/:tripId" element={<TripShow />} />
                <Route path="/trips/create" element={<TripCreate />} />
            
            </Routes>
        </div>
    );
}

export default AppRoutes;