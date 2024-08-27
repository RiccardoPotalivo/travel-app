import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchStop } from "../../services/stop";
import { Container, Spinner, Card, Row, Col } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './show.scss';

function StopShow() {
    const { tripSlug, daySlug, stopSlug } = useParams();
    const [stop, setStop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchStop(tripSlug, daySlug, stopSlug)
            .then(response => {
                setStop(response);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the stop!", error);
                setLoading(false);
            });
    }, [tripSlug, daySlug, stopSlug]);

    useEffect(() => {
        const DefaultIcon = L.icon({
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        L.Marker.prototype.options.icon = DefaultIcon;
    }, []);

    if (loading) {
        return (
            <Container>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (!stop) {
        return <Container>No stop found</Container>;
    }

    return (
        <Container>
            <h1>{stop.name}</h1>
            <p><strong>Position:</strong> {stop.position[0]}, {stop.position[1]}</p>
            <p><strong>Arrival Time:</strong> {new Date(stop.arrivalTime).toLocaleTimeString()}</p>
            <p><strong>Departure Time:</strong> {new Date(stop.departureTime).toLocaleTimeString()}</p>

            <Card className="mt-4">
                <Card.Header><strong>Map</strong></Card.Header>
                <Card.Body>
                    <div className="map-container">
                        <MapContainer center={stop.position} zoom={13} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={stop.position}>
                                <Popup>{stop.name}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </Card.Body>
            </Card>

            <Card className="mt-4">
                <Card.Header><strong>Images</strong></Card.Header>
                <Card.Body>
                    {stop.images && stop.images.length > 0 ? (
                        <Row xs={1} md={3} className="g-4">
                            {stop.images.map((image) => (
                                <Col key={image}>
                                    <Card>
                                        <Card.Img variant="top" src={image} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>No images available</p>
                    )}
                </Card.Body>
            </Card>

            <p><strong>Food:</strong> {stop.food}</p>
            <p><strong>Curiosities:</strong> {stop.curiosities}</p>
        </Container>
    );
}

export default StopShow;
