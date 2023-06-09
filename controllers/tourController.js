const fs = require("fs");
const Tour = require("./../model/tourModel");

//Route Handlers

// exports.checkID = (req, res, next, val) => {  //Validator
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'failed',
//             message: 'Invalid ID'
//         })
//     }
//     next();
// }

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(404).json({
//             status: 'failed',
//             message: 'Missing name or price'
//         })
//     }
//     next();
// }

exports.getAllTour = async (req, res) => {
    try {
        console.log(req.query);
        const tours = await Tour.find();
        res.status(200).json({
            status: 'success',
            result: tours.length,
            data: {
                tours: tours,
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
           message: error
        })
    }
    
}

exports.getSingleTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tours: tour,
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
           message: error
        })
    }

    

    // const id = req.params.id * 1;

    //how to loop through a url params(id)
    // const tour = tours.find(el => el.id === id);

    // res.status(200).json({
    //     status: 'success',
    //     // result: tours.length,
    //     data: {
    //         tours: tour,
    //     }
    // })
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        // console.log(req.body);
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error
        })
    }
    
}

exports.updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            tour: tour,
            message: 'Updated Successfully'
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error
        })
    }

    
}

exports.deleteTour = async (req, res) => {

    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            message: "Data successfully deleted"
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error
        })
    }
    
}