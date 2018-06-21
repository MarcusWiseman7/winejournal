const express = require('express');
const { ObjectId } = require('mongodb');

const { ensureAuthenticated } = require('../utils/authenticate');
const { mongoose } = require('../db/mongoose');
const { Wine } = require('../models/wine');

const router = express.Router();

// POST new wine to db
router.post('/', ensureAuthenticated, async (req, res) => {
  const wine = new Wine(req.body);

  wine.set({ _creator: req.user._id });

  try {
    await wine.save();
    res.redirect('/homepage');
  } catch(e) {
    res.status(400).send(e);
  }
});

// GET wine by id to edit/show
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) return res.status(404).send();

  try {
    const wine = await Wine.findById(id);

    if (!wine) return res.status(404).send();

    res.send({ wine });
  } catch(e) {
    res.status(400).send(e);
  }
});

// DELETE wine from db
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  
  if (!ObjectId.isValid(id)) return res.status(404).send();

  try {
    const wine = await Wine.findByIdAndRemove(id);

    if (!wine) return res.status(404).send();

    res.send({ wine });
  } catch(e) {
    res.status(400).send(e);
  }
});

// PATCH update wine in db
router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) return res.status(404).send();

  try {
    const wine = await Wine.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    if (!wine) return res.status(404).send();

    res.send({ wine });
  } catch(e) {
    res.status(400).send(e);
  }
});

module.exports = router;
