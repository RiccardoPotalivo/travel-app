import React, { useState } from "react";
import { createTrip } from "../../services/trip";
import { Container, Form, Button } from "react-bootstrap";

function TripCreate() {
    const [tripData, setTripData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        setTripData({ ...tripData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the post request to create a new Trip
        createTrip(tripData)
            .then(response => {
                console.log(response);
                // setTrips([...trips, response.data]);
                setTripData({
                    title: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                });
            })
            .catch((error) => {
                console.error("There was an error creating the trip!", error);
            })
    };

    return (
        <Container>
            <h1 className="mt-5">Create New Trip</h1>
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
                        required
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
        </Container>
    );
}

export default TripCreate;