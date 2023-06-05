const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    userNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log(con.connections);
    console.log('DB connected successfully...');
})

//4 Start Server
const port = process.env.PORT || 3000;
// const host = 127.0.0.1;
app.listen(port, () => {
    console.log(`App running on port: ${port}...`);
});