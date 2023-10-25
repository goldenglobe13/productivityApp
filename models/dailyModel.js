const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'user must be specified'],
    // unique: true,
    // trim: true
  },
  activity: {
    type: String,
    required: [true, 'activity must be specified'],
    // unique: true,
    // trim: true
  },
  levels: [],
  outside: Boolean,
  createdAt: {
    type: Date,
    // select: false,
  },
});

// dailySchema.index({ user: 1, activity: 1 }, { unique: true });

const Daily = mongoose.model('Daily', dailySchema);

module.exports = Daily;

// const testTour = new Tour({
//   name: 'The Park Camper',
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR:', err);
//   });
