import mongoose from 'mongoose';

// Define Trip schema
const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Day' }]
}, {
    timestamps: true // Add createdAt e updatedAt
});

// Create Trip model
const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
