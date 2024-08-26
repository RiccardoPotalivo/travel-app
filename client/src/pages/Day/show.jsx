import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner, Button, Card, ListGroup } from 'react-bootstrap';
import { fetchDay } from '../../services/day'; // Assumendo che tu abbia questa funzione

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
    console.log(day);

    return (
        <Container>
            <h1>{day.title}</h1>
            <Button variant="primary" className="mt-3">
                <Link to={`/trips/${tripSlug}/days/${daySlug}/stops/create`} className="text-white">Create New Stop</Link>
            </Button>
            <p><strong>Date:</strong> {new Date(day.date).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {day.description}</p>

            {/* Visualizzazione degli Stops */}
            {day.stops && day.stops.length > 0 ? (
                <Card className="mt-4">
                    <Card.Header><strong>Stops</strong></Card.Header>
                    <ListGroup variant="flush">
                        {day.stops.map((stop) => (
                            <ListGroup.Item key={stop._id}>
                                <Link to={`/trips/${tripSlug}/days/${daySlug}/stops/${stop.slug}`}>
                                    <h5> {stop.name}</h5>
                                </Link>
                                <p><strong>Position:</strong> {stop.position[0]}, {stop.position[1]}</p>
                                <p><strong>Arrival Time:</strong> {new Date(stop.arrivalTime).toLocaleTimeString()}</p>
                                <p><strong>Departure Time:</strong> {new Date(stop.departureTime).toLocaleTimeString()}</p>
                                <p><strong>Curiosities:</strong> {stop.curiosities}</p>
                                {stop.images && stop.images.length > 0 && (
                                    <div>
                                        <strong>Images:</strong>
                                        <ul>
                                            {stop.images.map((image, index) => (
                                                <li key={index}>
                                                    <img src={image} alt={`Stop ${stop.name} image`} style={{ maxWidth: '100px', margin: '5px' }} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            ) : (
                <p>No stops available for this day.</p>
            )}
        </Container>
    );
}

export default DayShow;
