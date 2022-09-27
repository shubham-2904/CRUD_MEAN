// import all package
const express = require( 'express' ),
path = require( 'path' ),
bodyParser = require( 'body-parser' ),
mongoose = require( 'mongoose' ),
cors = require( 'cors' );

// mongodb url
var mongodbDatabase = 'mongodb://localhost:27017/employeeDetails';

// create express server
const app = express();

// connect to mongodb database  
mongoose.connect( mongodbDatabase, { useNewUrlParser: true } ).then(
    (x) => {
        console.log( 'Database connected :) : ' + x );
    },
    err => {
        console.log( 'Something went wrong to connect the database' + err );
    }
);

// all the express routes
const employeeRoutes = require( './routes/employee.router.js' );

// convert the incoming data into JSON format
app.use( bodyParser.json() );

// enabled cors
app.use( cors({ origin: 'http://localhost:4200' }) );

// routes configuration
app.use( '/employees', employeeRoutes );


const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log('Server start at port : ' + PORT);
});