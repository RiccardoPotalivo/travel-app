import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    position: [{ type: Number, required: true }],
    arrivalTime: { type: Date },
    departureTime: { type: Date },
    images: [{ type: String }],
    food: { type: String },
    curiosities: { type: String },
    day: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: true },
}, {
    timestamps: true
});

export default mongoose.model('Stop', stopSchema);
