const express = require('express');
const statsController = require('../controllers/statsController');

const router = express.Router();

// router.param('id', tourController.checkID);

// router
//   .route('/top-5-cheap')
//   .get(tourController.aliasTopTour, tourController.getAllTours);

router
  .route('/')
  .get(
    // statsController.middlewareSelect,
    statsController.getAllStats,
  )
  .post(statsController.newStat);

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
