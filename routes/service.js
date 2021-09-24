const express = require('express');

const router = express.Router();
const Service = require('../models/service');

//health endpoint
router.get('/health', async(req, res) => {
    try {
      return res.status(200).json({message: 'service healthy'})
    } catch (err) {
      return res.status(500).json({ message: err.message });
    } 
  });

// get all data
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        return res.status(200).json(services);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
  
// get all versions of one service
router.get('/:serviceId', async (req, res) => {
  try {
    const service = await Service.find({ serviceId: req.params.serviceId });
    if (service.length < 1) {
      return res.status(404).json({ message: 'The service does not exist.' });
    }
    return res.status(200).json(service);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// get a particular version of one service
router.get('/:serviceId/:version', async (req, res) => {
  try {
    const service = await Service.find({
      serviceId: req.params.serviceId,
      version: Number(req.params.version),
    });
    if (service.length < 1) {
      return res.status(404).json({ message: 'The service does not exist.' });
    }
    return res.status(200).json(service);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// create a new service
router.post('/', async (req, res) => {
  const service = new Service({
    name: req.body.name,
    serviceId: req.body.serviceId,
    description: req.body.description,
    version: req.body.version,
    endpoint: req.body.endpoint,
  });
  try {
    const newService = await service.save();
    return res.status(201).json({
      message: 'Successfully updated the service.',
      service: newService,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
