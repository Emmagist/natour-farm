// const fs = require("fs");
const express = require("express");
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouters');
const userRouter = require('./routes/userRouters');
// const res = require("express/lib/response");

const app = express();

// console.log(process.env.NODE_ENV);

//1 Middleware 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Creating our middleware
app.use((req, res, next) => {
    console.log('Hello from the middleware');

    next()
})

module.exports = app;

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    next()
})


//3 Router
//Get all data
// app.get('/api/v1/tours/', getAllTour);
// //Get single data
// app.get('/api/v1/tours/:id', getSingleTour);
// //Post URL
// app.post('/api/v1/tours', createTour);
// //Patch
// app.patch('/api/v1/tours/:id', updateTour);
// //Delete
// app.delete('/api/v1/tours/:id', deleteTour);

//Refactor Router to a better way
// app.route('/api/v1/tours/').get(getAllTour).post(createTour);
// app.route('/api/v1/tours/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);
// app.route('/api/v1/users/').get(getAllUsers).post(createUser);
// app.route('/api/v1/users/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);

//Mounting Route
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);