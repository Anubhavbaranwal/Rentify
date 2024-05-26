import mongoose, { Schema } from 'mongoose';
import { model } from 'mongoose';

const propertySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  nearbyAmenities: {
    type: [String],
    required: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
 
});

export const Property = model('Property', propertySchema);

// module.exports = Property;
