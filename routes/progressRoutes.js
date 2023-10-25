const express = require('express');
const progressController = require('../controllers/progressController');

const router = express.Router();

// router.param('id', tourController.checkID);

// router
//   .route('/top-5-cheap')
//   .get(tourController.aliasTopTour, tourController.getAllTours);

router
  .route('/')
  .get(
    // statsController.middlewareSelect,
    progressController.convertToInt,
    progressController.getAllProgress,
  )
  .put(progressController.newProgress)
  .patch(progressController.updateProgress);

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
