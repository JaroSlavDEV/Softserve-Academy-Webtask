const express = require('express');
const Appeal = require('../models/Appeal');

const router = express.Router();

router.get('/', async (req, res) => {
  const appeals = await Appeal.find();
  return res.status(200).send(appeals);
});

router.post('/', async (req, res) => {
  let appeals = [];

  if(Array.isArray(req.body)) {
    req.body.forEach(async item => appeals.push(await Appeal.create(item)));

  } else {
    appeals.push(await Appeal.create(req.body));
  }

  return res.status(201).send({
    error: false,
    appeals
  });
});

module.exports = router;
