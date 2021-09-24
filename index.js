require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(`connection error: ${err}`));
db.once('open', () => console.log('Connected to DB!'));

app.use(express.json());

const catalogRouter = require('./routes/catalog');

app.use('/catalog', catalogRouter);

app.listen(port, () => {
  console.log('Server Started!');
});
