import mongoose, { Schema, model, models } from 'mongoose';

const GallerySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
    enum: ['WEDDINGS', 'PRIVATE EVENTS', 'HIGH TEAS', 'LIFESTYLE'],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = models.Gallery || model('Gallery', GallerySchema);

export default Gallery;
