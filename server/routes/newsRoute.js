const express = require('express');
const New = require('../models/New');

const router = express.Router();

router.get('/', async (req, res) => {
  const news = await New.find();
  return res.status(200).send(news);
});

router.post('/', async (req, res) => {
  const news = await New.create(req.body);
  return res.status(201).send({
    error: false,
    news
  });
});

module.exports = router;
