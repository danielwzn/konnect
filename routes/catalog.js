const express = require('express');

const router = express.Router();
const Catalog = require('../models/catalog');
const getService = require('../middlewares/getService');

// health endpoint
router.get('/health', async (req, res) => {
  try {
    return res.status(200).json({ message: 'service healthy' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// get all services
router.get('/', async (req, res) => {
  try {
    const services = await Catalog.find();
    return res.status(200).json({
      services,
      count: services.length,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// get one service by id
router.get('/:serviceId', getService, (req, res) => res.status(200).json(res.service));

// can filter and search services by partial name, description, and serviceId
router.get('/services/search', async (req, res) => {
  const { q } = req.query;
  try {
    const services = await Catalog
      .find({
        $text: {
          $search: `${q}`,
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      });
    return res.status(200).json({
      services,
      count: services.length,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// sort result given a key and an order (-1, 1)
router.get('/services/sort', async (req, res) => {
  const { key, order } = req.query;
  const mySort = {};
  mySort[key] = order;
  try {
    const services = await Catalog.find().sort(mySort);
    return res.status(200).json({
      services,
      count: services.length,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get('/services/page', async (req, res) => {
  const { skip, limit } = req.query;
  try {
    const services = await Catalog.find().skip(Number(skip)).limit(Number(limit));
    return res.status(200).json({
      services,
      count: services.length,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
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
    return res.status(201).json({
      message: 'Successfully created a new service.',
      newService,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
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
    return res.status(200).json({
      message: 'Successfully updated the service.',
      service: updatedService,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// delete service in catalog
router.delete('/:serviceId', getService, async (req, res) => {
  try {
    await res.service.remove();
    return res.status(200).json({ message: 'The service has been successfully deleted!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
