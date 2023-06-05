const express = require("express");
const tourController = require('./../controllers/tourController');
const { route } = require("./userRouters");

const router = express.Router();

//Declaring a parameter
router.param('id', tourController.checkID);

router.route('/').get(tourController.getAllTour).post(tourController.checkBody, tourController.createTour);
router.route('/:id').get(tourController.getSingleTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;