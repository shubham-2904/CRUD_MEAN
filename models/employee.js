// creating the model for employee 
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// creating the schema for employee
let Employee = new Schema(
    {
        firstName : { type: String },
        lastName : { type: String },
        email : { type: String }
    },
    {
        collection: 'employees'
    }
)

module.exports = mongoose.model('Employee', Employee);