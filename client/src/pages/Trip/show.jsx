import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTrip } from "../../services/trip";
import { Container, Spinner } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet"; // Importa Leaflet per usare le icone
import "leaflet/dist/leaflet.css";

// Importa le icone predefinite di Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configura l'icona del marker utilizzando le immagini predefinite di Leaflet
const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41], // Dimensioni dell'icona
    iconAnchor: [12, 41], // Punto dell'icona che corrisponde alla posizione del marker
    popupAnchor: [1, -34], // Punto dell'icona da cui si apre il popup
    shadowUrl: markerShadow,
    shadowSize: [41, 41] // Dimensioni dell'ombra dell'icona
});

// Funzione per impostare il bounding box della mappa
const SetMapBounds = ({ stops }) => {
    const map = useMap();

    useEffect(() => {
        if (stops.length > 0) {
            const latLngs = stops.map(stop => [stop.position[0], stop.position[1]]);
            const bounds = L.latLngBounds(latLngs);
            map.fitBounds(bounds, { padding: [20, 20] }); // Imposta il padding per evitare che i marker siano troppo vicini ai bordi
        }
    }, [stops, map]);

    return null;
};

function TripShow() {
    const { tripSlug } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allStops, setAllStops] = useState([]);

    useEffect(() => {
        let isMounted = true; // Per evitare aggiornamenti dopo che il componente è smontato

        setLoading(true);
        fetchTrip(tripSlug)
            .then((response) => {
                if (isMounted) {
                    setTrip(response);

                    // Estrai tutti gli stop dai giorni e mettili in un unico array
                    const stops = response.days.flatMap(day => day.stops || []);
                    setAllStops(stops);

                    setLoading(false);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    console.error("There was an error fetching the trip!", error);
                    setLoading(false);
                }
            });

        // Funzione di pulizia
        return () => {
            isMounted = false;
        };
    }, [tripSlug]);

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
            <h3>Days</h3>
            <ul>
                {trip.days.map(day => (
                    <li key={day._id}>
                        <Link to={`/trips/${trip.slug}/days/${day.slug}`}>
                            {new Date(day.date).toLocaleDateString()} - {day.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mappa con i marker per ogni stop */}
            <MapContainer center={[51.505, -0.09]} zoom={6} style={{ height: "500px", marginTop: "20px" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <SetMapBounds stops={allStops} />
                {allStops.length > 0 && allStops.map(stop => (
                    stop.position && stop.position.length === 2 && (
                        <Marker
                            key={stop._id}
                            position={[stop.position[0], stop.position[1]]}
                            icon={customIcon} // Usa l'icona predefinita di Leaflet
                        >
                            <Popup>
                                <strong>{stop.name}</strong><br />
                                {stop.description}<br />
                                Arrival: {stop.arrivalTime ? new Date(stop.arrivalTime).toLocaleTimeString() : "N/A"}<br />
                                Departure: {stop.departureTime ? new Date(stop.departureTime).toLocaleTimeString() : "N/A"}
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </Container>
    );
}

export default TripShow;
