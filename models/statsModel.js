const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'user must be specified'],
  },
  type: {
    type: String,
    required: [true, 'Type must be specified'],
    // unique: true,
    // trim: true
  },
  charge: {
    type: Number,
    required: [true, 'charge must be specified in minutes'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration must be specified in days'],
  },
  createdAt: {
    type: Date,
    // select: false,
  },
  endDate: {
    type: Number,
  },
  // sth: [{}],
  // sth1: {
  //   type: Number,
  //   required: [true, 'sth aaaa'],
  //   default: 0,
  // },
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;

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
