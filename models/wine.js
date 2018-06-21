const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// wine schema model
const wineSchema = new Schema({
  wineName: {
    type: String,
    trim: true,
  },
  winery: {
    type: String,
    trim: true,
  },
  grapes: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  vintage: {
    type: String,
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, {
  usePushEach: true,
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = { Wine };
