import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDay } from "../../services/day";
import { fetchTrip } from "../../services/trip";
import { Container, Spinner } from "react-bootstrap";