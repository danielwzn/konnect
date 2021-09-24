const express = require('express');

const app = express();

const { services } = require('./data');

const logger = require('./logger');

const apiPath = '/api';

app.use(apiPath, logger);

app.get('/api/v1/services/:serviceID', (req, res) => {
  const { serviceID } = req.params;
  const singleService = services.find((service) => service.id === Number(serviceID));
  if (!singleService) {
    return res.status(404).send('Service does not exist');
  }
  return res.json(singleService);
});

app.get('/api/v1/services', (req, res) => {
  let filteredServices = [...services];
  const { search, limit } = req.query;
  if (search) {
    filteredServices = filteredServices.filter((service) => service.name.startsWith(search));
  }

  if (limit) {
    filteredServices = filteredServices.slice(0, Number(limit));
  }

  if (filteredServices.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }

  return res.status(200).json(filteredServices);
});

app.listen(3000, () => {
//   console.log('server is listening on port 3000...');
});
