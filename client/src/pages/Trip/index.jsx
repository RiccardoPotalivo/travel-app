import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTrips } from "../../services/trip";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function TripIndex() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        // Fetch all trips on component mount
        fetchTrips()
            .then((data) => setTrips(data))
            .catch((error) => console.error("There was an error fetching the trips!", error));
    }, []);

    return (
        <Container>
            <h1>Trips</h1>
            <Button variant="primary" className="mt-3">
                <Link to="/trips/create" className="text-white">Create New Trip</Link>
            </Button>
            {/* <Link to="/trips/create">Create New Trip</Link> */}
            <Row className="mt-5">
                {trips.map((trip) => (
                    <Col key={trip._id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title><Link to={`/trips/${trip._id}`}>{trip.title}</Link></Card.Title>
                                <Card.Text>{trip.description}</Card.Text>
                                <Card.Text>
                                    <strong>Start Date:</strong>{" "}
                                    {new Date(trip.startDate).toLocaleDateString()}
                                </Card.Text>
                                <Card.Text>
                                    <strong>End Date:</strong>{" "}
                                    {new Date(trip.endDate).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default TripIndex;
