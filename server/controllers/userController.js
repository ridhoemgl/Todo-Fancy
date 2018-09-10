const User = require('../models/user')
const axios = require('axios')

module.exports = {

    fbLogin: (req, res) => {
        let fbToken = req.headers.token
        axios({
            method:'get',
            url:`https://graph.facebook.com/me?fields=id,name,email&&access_token=${fbToken}`
        })
        .then(response => {
            console.log(response.data);
            User
                .findOne({
                    email: response.data.email
                })
                .then(data => {
                    if(data){
                        // redirect login
                        console.log('redirect login');
                    }else{
                        // create account
                        User
                            .create({
                                name: response.data.name,
                                email: response.data.email,
                                password: '123'
                            })
                            .then(user => {
                                console.log(user);
                            })
                    }
                })
        })
        .catch(err => {
            console.log(err);
        })
        
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