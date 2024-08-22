import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTrip } from "../../services/trip";
import { Container, Spinner } from "react-bootstrap";

function TripShow() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchTrip(tripId)
            .then((response) => {
                setTrip(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the trip!", error);
                setLoading(false);
            });
    }, [tripId]);

    if (loading) {
        return (
            <Container>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (!trip) {
        return <Container>No trip found</Container>;
    }
    
    console.log('trip', trip);
    // console.log('days', trip.days);

    return (
        <Container>
            <h1>{trip.title}</h1>
            <p>{trip.description}</p>
            <p>
                <strong>Start Date:</strong>{" "}
                {new Date(trip.startDate).toLocaleDateString()}
            </p>
            <p>
                <strong>End Date:</strong>{" "}
                {new Date(trip.endDate).toLocaleDateString()}
            </p>
            <h3>Days</h3>
            <ul>
                {trip.days.map(day => (
                    <li key={day._id}>
                        <strong>{day.title}</strong>: {new Date(day.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>


        </Container>
    );
}

export default TripShow;