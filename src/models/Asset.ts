import mongoose, { Schema, model, models } from 'mongoose';

const AssetSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['MENU', 'TRAYS'],
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Asset = models.Asset || model('Asset', AssetSchema);

export default Asset;
