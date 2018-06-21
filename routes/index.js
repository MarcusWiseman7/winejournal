const express = require('express');

const { ensureAuthenticated } = require('../utils/authenticate');
const { mongoose } = require('../db/mongoose');
const { Wine } = require('../models/wine');

const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.render('index', { title: 'Wine Journal' });
});

// GET user wine journal
router.get('/homepage', ensureAuthenticated, (req, res) => {
  res.render('index', { title: 'Wine Journal' });
});

// GET all beer/wine in db to display
router.get('/wines', ensureAuthenticated, async (req, res) => {
  try {
    const wines = await Wine.find({ _creator: req.user._id });

    res.send({ wines })
  } catch(e) {
    res.status(400).send(e);
  }
});

module.exports = router;
