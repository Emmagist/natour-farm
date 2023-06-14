const fs = require("fs");
const Tour = require("./../model/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

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

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTour = async (req, res) => {
    try {
        //how to query Object from the url
        //First build query
        //1) Filtering
        // const queryObj = {...req.query};
        // const excludedField = ['page', 'sort', 'limit', 'field'];
        // excludedField.forEach(el => delete queryObj[el]);

        // //2) Advance filtering
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // // console.log(JSON.parse(queryStr));

        // let query = Tour.find(JSON.parse(queryStr));

        //2) Sorting
        // if(req.query.sort){
        //     // query = query.sort(req.query.sort); // Single sort

        //     const sortBy = req.query.sort.split(',').join(' ');//joing two sort together
        //     query = query.sort(sortBy);
        // }else{
        //     //if user doesn't sort then it should sort by date desc order - means desc
        //     query = query.sort('-createdAt')
        // }

        // 3) Field limiting
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // }else{
        //     query = query.select('-__v'); //minus here works for excluding a data to be send to the client
        // }

        // 4) Pagination
        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page - 1) * limit;  // minus one from the current page requested for

        // query = query.skip(skip).limit(limit);

        //Check if requested page is greater than amount of data then throw error
        // if (req.query.page) {
        //     const numTour = await Tour.countDocuments();
        //     if(skip > numTour) throw new Error('This page does not exist');
        // }

        // const tours = await Tour.find({
        //     duration: 5,
        //     difficulty:'easy'
        // });

        // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

        //Execute query
        const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limit()
        .pagination();
        const tours = await features.query;

        // const tours = await query;
        
        //Send response
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

exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    // _id: null,     //If you don't want to specify any column in the pipe line
                    // _id: '$difficulty', //Passing a string check
                    _id: { $toUpper: '$difficulty' },
                    numTour: { $sum: 1 },
                    numRating: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }
            // {
            //     $match: { _id: { $ne: 'EASY' } }
            // }
        ])

        res.status(200).json({
            status: 'success',
            data: {
                tours: stats,
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