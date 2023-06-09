const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../model/tourModel');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log('DB connected successfully...');
})

//Read Data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//Import Data from file to Database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Created Successfully');
    } catch (error) {
        console.log(error)
    }

    process.exit(); //Execute running code
}

//Delete Data from file to Database
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Deleted Successfully');
    } catch (error) {
        console.log(error)
    }

    process.exit(); //Execute running code
}

if (process.argv[2] === '--import') {
    importData();
}else if (process.argv[2] === '--delete') {
    deleteData()
}

// console.log(process.argv) get a process.argv array from terminal