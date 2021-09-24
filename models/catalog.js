const mongoose = require('mongoose');

const catalogSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  serviceId: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  versions: {
    type: Number,
    required: true,
  },
  creationTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Catalog', catalogSchema);
