const express = require('express');
const dailyController = require('../controllers/dailyController');

const router = express.Router();

// router.param('id', tourController.checkID);

// router
//   .route('/top-5-cheap')
//   .get(tourController.aliasTopTour, tourController.getAllTours);

router
  .route('/')
  .get(
    // statsController.middlewareSelect,
    dailyController.getAllDailyTasks,
  )
  .post(dailyController.newDailyTask)
  .patch(dailyController.updateDailyTask);

// router
//   .route('/whatIsYear')
//   .get(statsController.middlewareSelect, statsController.whatIsYear);
// .post(tourController.createTour);

// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = router;
