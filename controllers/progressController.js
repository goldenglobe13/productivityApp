const Progress = require('../models/progressModel');
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

exports.convertToInt = function (req, res, next) {
  next();
};

exports.getAllProgress = async (req, res) => {
  try {
    // BUILD QUERY
    // 2) Sorting
    // 3) Field limiting
    // 4) Pagination
    // EXECUTE QUERY
    req.query.year = parseInt(req.query.year);
    req.query.month = parseInt(req.query.month);
    req.query.day = parseInt(req.query.day);
    console.log(req.query);
    const features = new APIFeatures(Progress.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const progress = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: progress.length,
      data: { progress },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.newProgress = async (req, res) => {
  try {
    let progress = await Progress.findOneAndReplace(
      {
        user: req.body.user,
        activity: req.body.activity,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
      },
      req.body,
      {
        new: true,
        // runValidators: true,
      },
    );
    if (!progress) {
      progress = await Progress.create(req.body);
    }

    res.status(201).json({
      status: 'success',
      data: {
        progress: progress,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
    console.log(err.message);
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findOneAndReplace(
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
        progress,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

// exports.whatIsYear = async (req, res) => {
//   try {
//     const query = Stats.aggregate([{ $sample: { size: 1 } }]);
//     const stats = await query;
//     // console.log(series);

//     const indexOfStats = Math.floor(
//       stats.length * Math.random() !== stats.length
//         ? stats.length * Math.random()
//         : stats.length - 1,
//     );

//     // console.log(indexOfSeries);
//     // console.log(series[indexOfSeries]);

//     const ans = stats[indexOfStats].year;
//     console.log(ans);

//     const rng = getRandom([2, 3, 4], 1)[0];
//     console.log(rng);

//     const arrayOfPossibleOptions =
//       ans !== 2023
//         ? arrayRange(ans - rng, ans + rng, 1).filter((item, i) => i !== rng)
//         : arrayRange(ans - 2 * rng, ans - 1, 1);

//     console.log(arrayOfPossibleOptions);

//     const ops = getRandom(arrayOfPossibleOptions, 3);
//     const opsIndex = getRandom([1, 2, 3, 4], 4);
//     // console.log(opsIndex);
//     let options = [ans, ...ops];
//     // console.log(options);
//     // SEND RESPONSE
//     res.status(200).json({
//       status: 'success',
//       result: stats.length,
//       data: {
//         question: `In which year was the TV series ${stats[indexOfStats].title} first aired:`,
//         options: options,
//         opsIndex: opsIndex,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: `${err}`,
//     });
//   }
// };

// exports.getSeries = async (req, res) => {
//   try {
//     const series = await Series.findById(req.params.id);
//     // const series = await Series.findOne({ _id: req.params.id });
//     res.status(200).json({
//       status: 'success',
//       data: { series },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.updateSeries = async (req, res) => {
//   try {
//     const series = await Series.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         series,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Invalid data sent',
//     });
//   }
// };

// exports.deleteSeries = async (req, res) => {
//   try {
//     await Series.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Invalid data sent',
//     });
//   }
// };
