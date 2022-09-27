// Importing important packages
const express = require('express');
const employee = require('../models/employee');

// Using express and routes
const app = express();
const employeeRoute = express.Router();

// Employee module which is required and imported
let employeeModel = require('../models/employee');

// to get list of Employee
employeeRoute.route('/').get( function( req, res ) {
    employeeModel.find(function(err, employee) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(employee);
        }
    });
} );

// to add new employee
employeeRoute.route('/addEmployee').post( function(req, res) {
    let employee = new employeeModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
    employee.save()
    .then( game => {
        res.status(200).json({ 'employee': 'Employee Added Successfully' });
    })
    .catch(err => {
        res.status(400).send("Something Went Wrong");
    })
} );

// to update the data 
employeeRoute.route('/updateEmployee/:id').put(function(req, res) {
    employeeModel.findById( req.params.id, function(err, employee) {
        if (!employee) {
            return next(new Error('Unable To Find Employee With This Id'));
        }
        else {
            employee.firstName = req.body.firstName;
            employee.lastName = req.body.lastName;
            employee.email = req.body.email;

            employee.save().then ((response) => {
                res.json('Employee Updated Successfully');
            })
            .catch(err => {
                res.status(400).send("Unable To Update Employee");
            });
        }
    } );
});


// to delete the data
employeeRoute.route('/deleteEmployee/:id').delete( function(req, res) {
    employeeModel.findByIdAndRemove({ _id: req.params.id }, (err, employee) => {
        if (err) 
            res.json(err);
        else 
            res.json('Employee Deleted Successfully')
    })
} );

module.exports = employeeRoute;