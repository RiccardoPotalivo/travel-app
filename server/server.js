import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import tripRoutes from './routes/tripRoutes.js';
import dayRoutes from './routes/dayRoutes.js';
import stopRoutes from './routes/stopRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();

app.use(cors());
app.use(express.json());

// Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connesso a MongoDB'))
.catch((err) => console.error('Errore di connessione:', err));

// Routes
app.use('/api', tripRoutes);
app.use('/api', dayRoutes);
app.use('/api', stopRoutes);

// Middleware error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Qualcosa è andato storto!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`));
