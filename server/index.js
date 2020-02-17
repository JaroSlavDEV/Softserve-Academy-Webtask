const express = require('express');
const mongoose = require('mongoose');

const appealsRoute = require('./routes/appealsRoute');
const newsRoute = require('./routes/newsRoute');

const app = express();

app.use(express.json({limit: '50mb'}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  next();
});

app.use('/api/appeals', appealsRoute);
app.use('/api/news', newsRoute);

mongoose
  .connect('mongodb://localhost:27017/FCBarcelonaDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connection to database established');
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
  });

const PORT = 3012;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
