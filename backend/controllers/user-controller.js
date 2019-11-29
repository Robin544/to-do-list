const User = require('../models/users')
var passport = require('passport')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
var nodemailer = require('nodemailer');
require('../config/passport-config')
require('./to-do-list-controller')

// nodemailer -->
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'robinsinghkamboj1998@gmail.com',
      pass: 'robin544@gmail.com'
    }
})

exports.postSignUp = (req, res, next) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    const email = req.body.email;
    return User.findOne({email: email}).then(doc => {
        if(!doc){
            return user.save().then(doc => {
                // send email -->
                var mailOptions = {
                    from: 'robinsinghkamboj1998@gmail.com',
                    to: req.body.email,
                    subject: 'Welcome',
                    text: 'Thankyou for registration!\nYour username is ' + doc.name + '\nemail is ' + req.body.email + '\npassword is ' + req.body.password
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                res.status(200).json({
                    success: true,
                    message: 'Data inserted successfully!!!',
                    data: doc
                })
            }).catch(err => {
                console.log('Error in insertion of data: ' + err)
            })
        }
        else{
            res.status(200).json({
                success: false,
                message: 'User already exists!',
            })
        }
    }).catch(err => {
        console.log('Error in finding selected user: ' + err)
    })
}

exports.getSelectedUser = (req, res, next) => {
    return User.findById(req.params.id).then(doc => {
        res.status(200).json({
            success: true,
            message: 'Selected user found!',
            data: doc
        })
    }).catch(err => {
        console.log('Error in finding selected user: ' + err)
    })
}

exports.postEditUser = async (req, res, next) => {
    var id = req.params.id
    var oldPassword = req.body.oldPassword
    var updatedUser = await User.findById(id)
    if(!updatedUser.verifyPassword(oldPassword))
    {
        res.status(200).json({
            success: false,
            message: 'Invalid old password!',
        })
    }
    else{
        updatedUser.name = req.body.name
        updatedUser.email = updatedUser.email
        updatedUser.password = req.body.newPassword
    
        return updatedUser.save().then(doc => {
            // send email -->
            var mailOptions = {
                from: 'robinsinghkamboj1998@gmail.com',
                to: doc.email,
                subject: 'Profile Updated',
                text: 'Profile updated successfully!\nYour updated username is ' + doc.name + '\nnew password is ' + req.body.password
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            res.status(200).json({
                success: true,
                message: 'User updated successfully!',
                data: doc
            })
        }).catch(err => {
            console.log('Error in updation: ' + err)
        })
    }
    
}

exports.deleteUser = async (req, res, next) => {
    var id = req.params.id
    return User.findByIdAndDelete(id).then(doc => {
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: doc
        })
    }).catch(err => {
        console.log('Error in deletion: ' + err)
    })
}

exports.authenticate = (req, res, next) => {
    return passport.authenticate('local', (user, info, err) => {
        if(user) {
            res.status(200).json({
                success: true,
                message: 'User found!!!',
                token: jwt.sign({ id: user._id }, 'Robin', { expiresIn: '3600m' }),
                userData: _.pick(user, ['_id', 'name', 'email'])
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: 'Invalid Credentials'               
            })
        }
    }) (req, res, next)
}

// forgot password -->
exports.forgotPassword = (req, res, next) => {
    const email = req.body.email
    return User.findOne({email: email}).then((doc) => {
        if (doc != null) {
            res.status(200).json({
                success: true,
                message: 'Already sent an email on registration!',
                data: doc
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: 'User does not exists!'
            })
        }  
    }).catch(err => {
        console.log('Error in finding email during forgot password: ' + err)
    })
}

// login with facebook -->
exports.loginFacebook = (req, res, next) => {
    return passport.authenticate('facebook', { scope: 'email' }, (user, info, err) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Error in facebook login'
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Login succesfully with facebook!',
                data: user
            })
        }
    }) (req,res,next)
}

exports.callbackFacebook = (req, res, next) => {
    return passport.authenticate('facebook') (req, res, next)
}


// login with twitter -->
exports.loginTwitter = (req, res, next) => {
    return passport.authenticate('twitter', (user, info, err) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Error in twitter login'
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Login succesfully with twitter!',
                user_id: _.pick(user, ['id']),
                data: user
            })
        }
    }) (req,res,next)
}

exports.callbackTwitter = (req, res, next) => {
    return passport.authenticate('twitter') (req, res, next)
}


// login with google -->
exports.loginGoogle = (req, res, next) => {
    return passport.authenticate('google', { scope: 'email' }, (user, info, err) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Error in google login'
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Login succesfully with google!',
                user_id: _.pick(user, ['id']),
                data: user
            })
        }
    }) (req,res,next)
}

exports.callbackGoogle = (req, res, next) => {
    return passport.authenticate('google') (req, res, next)
}


// login with linkedin -->
exports.loginLinkedin = (req, res, next) => {
    return passport.authenticate('linkedin', { scope:  ['r_basicprofile', 'r_emailaddress'], state: true }, (user, info, err) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Error in linkedin login'
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Login succesfully with linkedin!',
                user_id: _.pick(user, ['id']),
                data: user
            })
        }
    }) (req,res,next)
}

exports.callbackLinkedin = (req, res, next) => {
    return passport.authenticate('linkedin') (req, res, next)
}