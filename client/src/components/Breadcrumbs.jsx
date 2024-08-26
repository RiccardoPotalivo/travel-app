import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Badge } from 'react-bootstrap';
import { fetchTrip } from '../services/trip';
import { fetchDay } from '../services/day';
import { fetchStop } from '../services/stop';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
    const location = useLocation();
    const [trip, setTrip] = useState(null);
    const [day, setDay] = useState(null);
    const [stop, setStop] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const pathParts = location.pathname.split('/').filter(Boolean);

            try {
                if (pathParts[0] === 'trips') {
                    const tripSlug = pathParts[1];
                    if (tripSlug === 'create') {
                        setTrip(null);
                        setDay(null);
                        setStop(null);
                    } else {
                        const tripData = await fetchTrip(tripSlug);
                        setTrip(tripData);

                        if (pathParts[2] === 'days' && pathParts[3]) {
                            const daySlug = pathParts[3];
                            const dayData = await fetchDay(tripSlug, daySlug);
                            setDay(dayData);

                            if (pathParts[4] === 'stops' && pathParts[5] === 'create') {
                                setStop({ title: 'Create New Stop' });
                            } else if (pathParts[4] === 'stops' && pathParts[5]) {
                                const stopSlug = pathParts[5];
                                // console.log(stopSlug);
                                const stopData = await fetchStop(tripSlug, daySlug, stopSlug);
                                setStop(stopData || null);
                                console.log(stop);
                            } else {
                                setStop(null);
                            }
                        } else {
                            setDay(null);
                            setStop(null);
                        }
                    }
                } else {
                    setTrip(null);
                    setDay(null);
                    setStop(null);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setTrip(null);
                setDay(null);
                setStop(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [location]);

    if (isLoading) {
        return <div>Loading breadcrumbs...</div>;
    }

    const isHomeActive = location.pathname === '/';
    const isTripsActive = location.pathname.startsWith('/trips') && !trip;
    const isTripsCreate = location.pathname === '/trips/create';
    const isTripActive = trip && !day && location.pathname.startsWith(`/trips/${trip?.slug}`);
    const isDayActive = day && !stop && location.pathname.startsWith(`/trips/${trip?.slug}/days/${day?.slug}`);
    const isStopCreate = location.pathname.startsWith(`/trips/${trip?.slug}/days/${day?.slug}/stops/create`);
    const isStopActive = stop && !isStopCreate;

    return (
        <Breadcrumb className="custom-breadcrumb">
            <Breadcrumb.Item className={isHomeActive ? 'active' : ''}>
                {isHomeActive ? (
                    <Badge className="badge-active">Home</Badge>
                ) : (
                    <Link to="/">
                        <Badge className="badge-inactive">Home</Badge>
                    </Link>
                )}
            </Breadcrumb.Item>
            {!isHomeActive && (
                <Breadcrumb.Item className={isTripsActive ? 'active' : ''}>
                    {isTripsActive && !isTripsCreate ? (
                        <Badge className="badge-active">Trips</Badge>
                    ) : (
                        <Link to="/trips">
                            <Badge className="badge-inactive">Trips</Badge>
                        </Link>
                    )}
                </Breadcrumb.Item>
            )}
            {isTripsCreate && (
                <Breadcrumb.Item className={isTripsCreate ? 'active' : ''}>
                    <Badge className="badge-active">Create New Trip</Badge>
                </Breadcrumb.Item>
            )}
            {trip && !isTripsCreate && (
                <Breadcrumb.Item className={isTripActive ? 'active' : ''}>
                    {isTripActive ? (
                        <Badge className="badge-active">Trip: {trip.title}</Badge>
                    ) : (
                        <Link to={`/trips/${trip.slug}`}>
                            <Badge className="badge-inactive">Trip: {trip.title}</Badge>
                        </Link>
                    )}
                </Breadcrumb.Item>
            )}
            {day && (
                <Breadcrumb.Item className={isDayActive ? 'active' : ''}>
                    {isDayActive ? (
                        <Badge className="badge-active">Day: {day.title}</Badge>
                    ) : (
                        <Link to={`/trips/${trip.slug}/days/${day.slug}`}>
                            <Badge className="badge-inactive">Day: {day.title}</Badge>
                        </Link>
                    )}
                </Breadcrumb.Item>
            )}
            {isStopCreate && (
                <Breadcrumb.Item className={isStopCreate ? 'active' : ''}>
                    <Badge className="badge-active">Create New Stop</Badge>
                </Breadcrumb.Item>
            )}
            {isStopActive && (
                <Breadcrumb.Item active>
                    <Badge className="badge-active">Stop: {stop.name}</Badge>
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
