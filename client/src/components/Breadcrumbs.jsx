import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Badge } from 'react-bootstrap';
import { fetchTrip } from '../services/trip';
import { fetchDay } from '../services/day';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
    const location = useLocation();
    const [trip, setTrip] = useState(null);
    const [day, setDay] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const pathParts = location.pathname.split('/').filter(Boolean);

            if (pathParts[0] === 'trips') {
                if (pathParts[1]) {
                    const tripSlug = pathParts[1];
                    try {
                        const tripData = await fetchTrip(tripSlug);
                        setTrip(tripData);

                        if (pathParts[2] === 'days' && pathParts[3]) {
                            const daySlug = pathParts[3];
                            try {
                                const dayData = await fetchDay(tripSlug, daySlug);
                                setDay(dayData);
                            } catch (error) {
                                console.error('Error fetching day:', error);
                                setDay(null);
                            }
                        } else {
                            setDay(null);
                        }
                    } catch (error) {
                        console.error('Error fetching trip:', error);
                        setTrip(null);
                        setDay(null);
                    }
                } else {
                    setTrip(null);
                    setDay(null);
                }
            } else {
                setTrip(null);
                setDay(null);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [location]);

    if (isLoading) {
        return <div>Loading breadcrumbs...</div>;
    }

    const isHomeActive = location.pathname === '/';
    const isTripsActive = location.pathname.startsWith('/trips') && !trip;
    const isTripsCreate = location.pathname.startsWith('/trips/create');
    const isTripActive = trip && !day && location.pathname.startsWith(`/trips/${trip.slug}`);
    const isDayActive = day && location.pathname.startsWith(`/trips/${trip.slug}/days/${day.slug}`);

    return (
        <Breadcrumb className="custom-breadcrumb">
            <Breadcrumb.Item className={isHomeActive ? 'active' : ''}>
                <Link to="/">
                    <Badge className={isHomeActive ? 'badge-active' : 'badge-inactive'}>Home</Badge>
                </Link>
            </Breadcrumb.Item>
            {!isHomeActive && (
            <Breadcrumb.Item className={isTripsActive ? 'active' : ''}>
                <Link to="/trips">
                    <Badge className={isTripsActive && !isTripsCreate ? 'badge-active' : 'badge-inactive'}>Trips</Badge>
                </Link>
            </Breadcrumb.Item>
            )}
            {isTripsCreate && (
            <Breadcrumb.Item className={isTripsCreate ? 'active' : ''}>
                <Link to="/trips/create">
                    <Badge className={isTripsCreate ? 'badge-active' : 'badge-inactive'}>Create New Trip</Badge>
                </Link>
            </Breadcrumb.Item>
            )}
            {trip && (
                <Breadcrumb.Item className={isTripActive ? 'active' : ''}>
                    <Link to={`/trips/${trip.slug}`}>
                        <Badge className={isTripActive ? 'badge-active' : 'badge-inactive'}>
                            {trip.title}
                        </Badge>
                    </Link>
                </Breadcrumb.Item>
            )}
            {day && (
                <Breadcrumb.Item active>
                    <Badge className="badge-active">{day.title}</Badge>
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
