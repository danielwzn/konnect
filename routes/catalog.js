const express = require('express');

const router = express.Router();
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
  next();
}

// get all services
router.get('/', async (req, res) => {
  try {
    const services = await Catalog.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one service by id
router.get('/service/:serviceId', getService, (req, res) => {
  res.status(200).json(res.service);
});

// can filter or search services by partial name, description, and serviceId
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const filteredServices = await Catalog
      .find({
        $text: {
          $search: `${q}`,
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      });
    res.status(200).json(filteredServices);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/sort', async (req, res) => {
  const { key, order } = req.query;
  const mySort = {};
  mySort[key] = order;
  try {
    const sortedServices = await Catalog.find().sort(mySort);
    res.status(200).json(sortedServices);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// create services in catalog
router.post('/', async (req, res) => {
  const service = new Catalog({
    name: req.body.name,
    serviceId: req.body.serviceId,
    description: req.body.description,
    versions: req.body.versions,
  });
  try {
    const newService = await service.save();
    res.status(201).json({
      message: 'Successfully created a new service.',
      newService,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update services in catalog
router.patch('/:serviceId', getService, async (req, res) => {
  if (req.body.name !== null) {
    res.service.name = req.body.name;
  }
  if (req.body.description !== null) {
    res.service.description = req.body.description;
  }
  if (req.body.versions !== null) {
    res.service.versions = req.body.versions;
  }
  try {
    const updatedService = await res.service.save();
    res.status(200).json({
      message: 'Successfully updated the service.',
      service: updatedService,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete service in catalog
router.delete('/:serviceId', getService, async (req, res) => {
  try {
    await res.service.remove();
    res.status(200).json({ message: 'The service has been successfully deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
