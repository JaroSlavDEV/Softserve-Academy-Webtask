const express = require('express');
const Appeal = require('../models/Appeal');

const router = express.Router();

router.get('/', async (req, res) => {
  const appeals = await Appeal.find();
  return res.status(200).send(appeals);
});

router.post('/', async (req, res) => {
  const appeals = await Appeal.create(req.body);
  return res.status(201).send({
    error: false,
    appeals
  });
});

module.exports = router;
