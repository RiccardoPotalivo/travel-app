import mongoose from 'mongoose';

const daySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    date: { type: Date, required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }],
}, {
    timestamps: true
});

export default mongoose.model('Day', daySchema);