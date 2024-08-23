import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { fetchDay } from '../../services/day'; // Assuming you have this function

function DayShow() {
    const { tripSlug, daySlug } = useParams();
    const [day, setDay] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchDay(tripSlug, daySlug)
            .then(response => {
                setDay(response);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the day!", error);
                setLoading(false);
            });
    }, [tripSlug, daySlug]);

    if (loading) {
        return (
            <Container>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (!day) {
        return <Container>No day found</Container>;
    }

    return (
        <Container>
            <h1>{day.title}</h1>
            <p><strong>Date:</strong> {new Date(day.date).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {day.description}</p>
        </Container>
    );
}

export default DayShow;
