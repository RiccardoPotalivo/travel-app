import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

function Home() {
    const [trips, setTrips] = useState([]);
    const [tripData, setTripData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        // Fetch all trips on component mount
        axios.get('http://localhost:5000/api/trips')
            .then(response => setTrips(response.data))
            .catch(error => console.error("There was an error fetching the trips!", error));
    }, []);

    const handleChange = (e) => {
        setTripData({ ...tripData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the post request to create a new Trip
        axios.post('http://localhost:5000/api/trips', tripData)
            .then(response => {
                setTrips([...trips, response.data]); // Add the new trip to the list
                setTripData({ title: '', description: '', startDate: '', endDate: '' }); // Clear the form
            })
            .catch(error => console.error("There was an error creating the trip!", error));
    };

    return (
        <Container>
            <h1 className="mt-5">Travel App</h1>

            {/* Form per creare un nuovo Trip */}
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="title" 
                        value={tripData.title} 
                        onChange={handleChange} 
                        placeholder="Enter trip title" 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="description" 
                        value={tripData.description} 
                        onChange={handleChange} 
                        placeholder="Enter trip description" 
                    />
                </Form.Group>

                <Form.Group controlId="formStartDate" className="mt-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="startDate" 
                        value={tripData.startDate} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formEndDate" className="mt-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="endDate" 
                        value={tripData.endDate} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Create Trip
                </Button>
            </Form>

            {/* Lista dei Trip esistenti */}
            <Row className="mt-5">
                {trips.map(trip => (
                    <Col key={trip._id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{trip.title}</Card.Title>
                                <Card.Text>{trip.description}</Card.Text>
                                <Card.Text><strong>Start Date:</strong> {new Date(trip.startDate).toLocaleDateString()}</Card.Text>
                                <Card.Text><strong>End Date:</strong> {new Date(trip.endDate).toLocaleDateString()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
