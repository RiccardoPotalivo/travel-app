import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { fetchTrip } from '../services/trip';
import { fetchDay } from '../services/day';

const Breadcrumbs = () => {
    const location = useLocation();
    const [trip, setTrip] = useState(null);
    const [day, setDay] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const pathParts = location.pathname.split('/').filter(Boolean);
            // console.log("Path parts:", pathParts);

            if (pathParts[0] === 'trips' && pathParts[1]) {
                const tripSlug = pathParts[1];
                try {
                    const tripData = await fetchTrip(tripSlug);
                    // console.log('Fetched trip data:', tripData);
                    setTrip(tripData);

                    if (pathParts[2] === 'days' && pathParts[3]) {
                        const daySlug = pathParts[3];
                        try {
                            const dayData = await fetchDay(tripSlug, daySlug);
                            // console.log('Fetched day data:', dayData);
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

            setIsLoading(false);
        };

        fetchData();
    }, [location]);

    if (isLoading) {
        return <div>Loading breadcrumbs...</div>;
    }

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
            {trip && (
                <Breadcrumb.Item 
                    linkAs={Link} 
                    linkProps={{ to: `/trips/${trip.slug}` }}
                    active={!day}
                >
                    {trip.title}
                </Breadcrumb.Item>
            )}
            {day && (
                <Breadcrumb.Item active>
                    {day.title}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default Breadcrumbs;