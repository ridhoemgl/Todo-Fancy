const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { becryptPassword } = require('../helpers/helper')

module.exports = {
    signin: (req, res) => {
        console.log(req.body);
        
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if(user){
                    console.log(user);
                    
                    if(becryptPassword(user.password, req.body.password)){
                        console.log('if');
                        
                        let token = jwt.sign({
                            id : user.id,
                            name : user.name,
                            email : user.email
                        }, JWT_SECRET_KEY)
                        res.status(200).json({
                            msg : `login success`,
                            token
                        })
                    }else{
                        res.status(404).json({
                            msg: 'password wrong'
                        })    
                    }
                }else{
                    res.status(404).json({
                        msg: 'email wrong'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err
                })
            })
    },
    signup: (req, res) => {
        console.log(req.body);
        
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
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