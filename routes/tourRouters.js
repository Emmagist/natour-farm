const express = require("express");
const tourController = require('./../controllers/tourController');
const { route } = require("./userRouters");

const router = express.Router();

//Declaring a parameter
// router.param('id', tourController.checkID);

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTour)
router.route('/').get(tourController.getAllTour).post(tourController.createTour);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router.route('/:id').get(tourController.getSingleTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;