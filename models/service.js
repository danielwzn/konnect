const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serviceId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
    unique: true,
  },
  creationTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
