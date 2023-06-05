const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

//Route Handlers

exports.checkID = (req, res, next, val) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(404).json({
            status: 'failed',
            message: 'Missing name or price'
        })
    }
    next();
}

exports.getAllTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: tours.length,
        data: {
            tours: tours,
        }
    })
}

exports.getSingleTour = (req, res) => {

    const id = req.params.id * 1;

    //how to loop through a url params(id)
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        // result: tours.length,
        data: {
            tours: tour,
        }
    })
}

exports.createTour = (req, res) => {
    // console.log(req.body);
    //How to create new id
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
            res.status(201).json({
                status: "success",
                data: {
                    tour: newTour
                }
            })
        })
        // res.send('Done');
}

exports.updateTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<>Update done here...<>'
        }
    })
}

exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: 'success',
        data: {
            tour: null
        }
    })
}