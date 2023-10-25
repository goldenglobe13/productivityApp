const Daily = require('../models/dailyModel');
const APIFeatures = require('../utils/apiFeatures');

// exports.getOnlyUser = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//   next();
// };

// const arrayRange = (start, stop, step) =>
//   Array.from(
//     { length: (stop - start) / step + 1 },
//     (value, index) => start + index * step,
//   );

// function getRandom(arr, n) {
//   let result = new Array(n);
//   let len = arr.length;
//   let taken = new Array(len);
//   if (n > len)
//     throw new RangeError('getRandom: more elements taken than available');
//   while (n--) {
//     let x = Math.floor(Math.random() * len);
//     result[n] = arr[x in taken ? taken[x] : x];
//     taken[x] = --len in taken ? taken[len] : len;
//   }
//   return result;
// }

// exports.middlewareSelect = (req, res, next) => {
//   req.query.sort = '-rating';
//   req.query.fields = 'title,rating,seasons,epsCount,year';
//   next();
// };

exports.getAllDailyTasks = async (req, res) => {
  try {
    // BUILD QUERY
    // 2) Sorting
    // 3) Field limiting
    // 4) Pagination
    // EXECUTE QUERY
    const features = new APIFeatures(Daily.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tasks = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: tasks.length,
      data: { tasks },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.newDailyTask = async (req, res) => {
  try {
    const newDaily = await Daily.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        daily: newDaily,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.updateDailyTask = async (req, res) => {
  try {
    const daily = await Daily.findOneAndReplace(
      { user: req.body.user, activity: req.body.activity },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        daily,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};
