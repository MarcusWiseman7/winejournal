const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { mongoose } = require('../db/mongoose');
const { User } = require('../models/user');

const router = express.Router();

// POST new user to db from sign up
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const user = new User(body);
    await user.save();

    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.send({ user });;
    });
  } catch(e) {
    res.status(400).send(e);
  }
});

// POST login user (passport style...)
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/',
    failureFlash: true,
  })
);

// GET logout user
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

// PATCH change user password
router.patch('/password', async (req, res) => {
  try{
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      const message = 'Username incorrect!';
      return res.status(404).send(message);
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      user.password = req.body.newPassword;
  
      await user.save();
      return res.send(user);
    } else {
      const message = 'Password incorrect!';
      return res.status(404).send(message);
    }
  } catch(e) {
    res.status(400).send();
  }
});

module.exports = router;
