import mongoose, { Schema, model, models } from 'mongoose';

const FormSubmissionSchema = new Schema({
  type: {
    type: String,
    enum: ['CONTACT', 'BOOK_NOW'],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
  },
  eventDate: {
    type: Date,
  },
  guestCount: {
    type: Number,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['PENDING', 'REviewed', 'COMPLETED'],
    default: 'PENDING',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FormSubmission = models.FormSubmission || model('FormSubmission', FormSubmissionSchema);

export default FormSubmission;
