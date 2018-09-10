const User = require('../models/user')
const axios = require('axios')
const jwt = require('jsonwebtoken')

module.exports = {

    fbLogin: (req, res) => {
        let fbToken = req.headers.token
        axios({
            method:'get',
            url:`https://graph.facebook.com/me?fields=id,name,email&&access_token=${fbToken}`
        })
        .then(response => {
            User
                .findOne({
                    email: response.data.email
                })
                .then(data => {
                    if(data == null){
                        User
                        .create({
                            name: response.data.name,
                            email: response.data.email,
                            password: process.env.FB_DEFAULT_PASSWORD
                        })
                        .then(user => {
                            res.status(201).json({
                                msg: `create account success`,
                                data: user
                            })
                        })
                    }else{
                        jwt.sign({
                            userId: data.id,
                            email: data.email,
                            name: data.name
                        }, process.env.JWT_SECRET_KEY, (err, token) => {
                            if(!err){
                                res.status(200).json({
                                    msg: 'login success',
                                    token: token
                                })
                            }else{
                                res.status(401).json({
                                    msg: `Unauthorized`
                                })
                            }
                        })
                    }
                })
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
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