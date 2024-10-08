import { useState } from 'react';
import './App.css';
// import 'react-leaflet/dist/leaflet.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <div className='App'>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  )
}

export default App
