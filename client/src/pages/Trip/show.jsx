import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTrip } from "../../services/trip";
import { Container, Spinner } from "react-bootstrap";

function TripShow() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchTrip(id)
            .then((response) => {
                setTrip(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the trip!", error);
                setLoading(false);
            });
    }, [id]);

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
        </Container>
    );
}

export default TripShow;