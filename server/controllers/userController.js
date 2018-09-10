const User = require('../models/user')
const axios = require('axios')

module.exports = {

    fbLogin: (req, res) => {
        console.log(req.headers.token);
        
        
    },
    signin: (req, res) => {
        User
            .findOne({
                email: req.params.email
            })
            .then(user => {
                if(user){
                    
                }else{
                    res.status(404).json({
                        msg: `User Not Found`
                    })  
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
    createUser: (req, res) => {
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password:  req.body.password
            })
            .then(user => {
                res.status(201).json({
                    message: `Add user success`,
                    data: user
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    },
    showAllUsers: (req, res) => {
        User
            .find()
            .then(user => {
                res.status(201).json({
                    message: `Display All User Success`,
                    data: user
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
}