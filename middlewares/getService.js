const Catalog = require('../models/catalog');

async function getService(req, res, next) {
  let service;
  try {
    service = await Catalog.find({ serviceId: req.params.serviceId });
    if (service.length === 0) {
      return res.status(404).json({ message: 'The service does not exist' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // by id, only one service can be returned
  const [first] = service;
  res.service = first;
  return next();
}

module.exports = getService;
