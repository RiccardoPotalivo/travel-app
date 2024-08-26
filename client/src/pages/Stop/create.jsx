import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createStop } from "../../services/stop";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function StopCreate() {
    const { tripSlug, daySlug } = useParams();
    const [stopData, setStopData] = useState({
        name: "",
        position: [0, 0],
        arrivalTime: "",
        departureTime: "",
        images: [],
        food: "",
        curiosities: "",        
    });

    // const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "position") {
            const [lat, lng] = value.split(",");
            setStopData({ ...stopData, position: [parseFloat(lat), parseFloat(lng)] });
        } else {
            setStopData({ ...stopData, [name]: value });
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the post request to create a new Stop
        createStop(tripSlug, daySlug, stopData)
            .then(response => {
                // Reset form state
                setStopData({
                    name: "",
                    position: [0, 0],
                    arrivalTime: "",
                    departureTime: "",
                    images: [],
                    food: "",
                    curiosities: "",
                });

                // Correctly navigate to the newly created stop's page
                // const { trip, day, slug } = response.data;
                // navigate(`/trips/${trip.slug}/days/${day.slug}/stops/${slug}`);
            })
            .catch((error) => {
                console.error("There was an error creating the stop!", error);
            })
    };

    return (
        <Container>
            <h1 className="mt-5">Create New Stop</h1>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={stopData.name}
                        onChange={handleChange}
                        placeholder="Enter stop name"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPosition" className="mt-3">
                    <Form.Label>Position (latitude, longitude)</Form.Label>
                    <Form.Control
                        type="text"
                        name="position"
                        value={stopData.position.join(", ")}
                        onChange={handleChange}
                        placeholder="Enter stop position"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formArrivalTime" className="mt-3">
                    <Form.Label>Arrival Time</Form.Label>
                    <Form.Control
                        type="time"
                        name="arrivalTime"
                        value={stopData.arrivalTime}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDepartureTime" className="mt-3">
                    <Form.Label>Departure Time</Form.Label>
                    <Form.Control
                        type="time"
                        name="departureTime"
                        value={stopData.departureTime}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formImages" className="mt-3">
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                        type="text"
                        name="images"
                        value={stopData.images}
                        onChange={handleChange}
                        placeholder="Enter image URLs separated by commas"
                    />
                </Form.Group>
                <Form.Group controlId="formFood" className="mt-3">
                    <Form.Label>Food</Form.Label>
                    <Form.Control
                        type="text"
                        name="food"
                        value={stopData.food}
                        onChange={handleChange}
                        placeholder="Enter food details"
                    />
                </Form.Group>
                <Form.Group controlId="formCuriosities" className="mt-3">
                    <Form.Label>Curiosities</Form.Label>
                    <Form.Control
                        type="text"
                        name="curiosities"
                        value={stopData.curiosities}
                        onChange={handleChange}
                        placeholder="Enter curiosities"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Create Stop
                </Button>
            </Form>
        </Container>
    );
}

export default StopCreate;
