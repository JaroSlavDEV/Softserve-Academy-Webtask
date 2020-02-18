const express = require('express');
const New = require('../models/New');

const router = express.Router();

router.get('/', async (req, res) => {
  const news = await New.find();
  return res.status(200).send(news);
});

router.post('/', async (req, res) => {
  let news = [];

  if (Array.isArray(req.body)) {
    req.body.forEach(async item => news.push(await New.create(item)));

  } else {
    news.push(await New.create(req.body));
  }

  return res.status(201).send({
    error: false,
    news
  });
});

module.exports = router;
