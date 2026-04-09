import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Tools']
  },
  name: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  icon: {
    type: String,
    default: '⭐'
  }
}, { timestamps: true });

const Skill =mongoose.model('skill', skillSchema);

export default Skill ; 