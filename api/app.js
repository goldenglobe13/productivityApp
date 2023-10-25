// const express = require('express');
// const morgan = require('morgan');

// const statsRouter = require('./routes/statsRoutes');
// const progressRouter = require('./routes/progressRoutes');
// const dailyRouter = require('./routes/dailyRoutes');

// const app = express();

// // 1) MIDDLEWARES
// console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// app.use(express.json());

// app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// // 2) ROUTE HANDLERS

// // 3) ROUTES

// app.use('/api/v1/stats', statsRouter);
// app.use('/api/v1/progress', progressRouter);
// app.use('/api/v1/daily', dailyRouter);

// // const DB = process.env.DATABASE.replace(
// //   '<PASSWORD>',
// //   process.env.DATABASE_PASSWORD,
// // );

// module.exports = app;
