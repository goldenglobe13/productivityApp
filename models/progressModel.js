const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
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
  level: {
    type: Number,
    required: [true, 'level must be specified'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration must be specified in minutes'],
  },
  year: {
    type: Number,
  },
  month: {
    type: Number,
  },
  day: {
    type: Number,
  },
  createdAt: {
    type: Date,
    // select: false,
  },
  // sth: [{}],
  // sth1: {
  //   type: Number,
  //   required: [true, 'sth aaaa'],
  //   default: 0,
  // },
});

progressSchema.index(
  { user: 1, activity: 1, year: 1, month: 1, day: 1 },
  { unique: true },
);

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;

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
