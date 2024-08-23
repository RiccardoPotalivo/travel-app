import mongoose from 'mongoose';

// Define Trip schema
const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Day' }],
}, {
    timestamps: true // Add createdAt e updatedAt
});

export default mongoose.model('Trip', tripSchema);
