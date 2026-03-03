import mongoose, { Schema, model, models } from 'mongoose';

const CareerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthMonth: String,
  birthDay: String,
  birthYear: String,
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  resumePublicId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'REviewed', 'HIRED', 'REJECTED'],
    default: 'PENDING',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Career = models.Career || model('Career', CareerSchema);

export default Career;
