require('../models/users')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var jwt=require('jsonwebtoken');

// facebook -->
var FacebookStrategy = require('passport-facebook').Strategy
var FacebookUser = require('../models/fb-model')
var fbConfig = require('./fb')

// twitter -->
var TwitterStrategy = require('passport-twitter').Strategy
var TwitterUser = require('../models/twitter-model')
var twitterConfig = require('./twitter')

// google -->
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var GoogleUser = require('../models/google-model')
var googleConfig = require('./google')

// linkedin -->
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var LinkedinUser = require('../models/linkedin-model')
var linkedinConfig = require('./linkedin')

const mongoose = require('mongoose')
var User = mongoose.model('User')

// local strategy -->
passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    User.findOne({ email: username }).then(user => {
        if(!user) {
            return done(null, false, { message: 'User does not exists!' })
        }
        else if(!user.verifyPassword(password)) {
            return done(null, false, { message: 'Password does not match!' })
        }
        else {
            console.log('User found!')
            return done(user)
        }
    }).catch(err => {
        return err
    })
}));
// -->


//Facebook strategy -->
passport.use(new FacebookStrategy({
    clientID: fbConfig.appID,
    clientSecret: fbConfig.appSecret,
    callbackURL: fbConfig.callbackURL
},

// Facebook will send back the token and profile
(access_token, refresh_token, profile, done) =>{
   console.log('profile: ', profile)

   //asynchronous
   process.nextTick(function() {
       // find the user in database based on their facebook id
       FacebookUser.findOne({ 'id': profile.id }, function(err, user) {
           // if there is an error, stop everything and return that ie an error connecting to database
           if(err) {
            //    console.log(done(err));
            return done(err);
           }

           // if the user is found, then log them in
           if(user) {
            //    console.log(done(user)) // user found, return that user
            return done(user);
           } else {
               // if there is no user found with that facebook id, create then
               var newUser = new FacebookUser()

               // set all of the facebook information in our user model
               newUser.fb.id = profile.id // set the users facebook id
               newUser.fb.access_token = access_token
               newUser.fb.firstName = profile.name.givenName
               newUser.fb.lastName = profile.name.familyName
               newUser.fb.email = profile.emails[0].value

               //save our user to the database
               newUser.save(function() {
                   if(err) {
                       throw err
                    } else {
                       return done(newUser)
                    }
                })
            }
        })
    })
}))
// -->


// twitter strategy -->
passport.use(new TwitterStrategy({
    consumerKey: twitterConfig.appID,
    consumerSecret: twitterConfig.appSecret,
    callbackURL: twitterConfig.callbackURL
}, (token, tokenSecret, profile, done) => {

    // make the code ansynchronous
    // TwitterUser.findOne() won't fire until we have all our data back from twitter
    process.nextTick(function() {
        TwitterUser.findOne({ 'twitter.id': profile.id }, function(err, user) {
            if (err) {
                return done(err)
            }
            if (user) {
                return done(user)
            } else {
                // if there is no user, create them
                var newUser = TwitterUser()

                // set all of the user data that we need
                newUser.twitter.id = profile.id
                newUser.twitter.token = jwt.sign({ id: profile.id }, "ABC123", { expiresIn:'30m' });
                newUser.twitter.username = profile.username
                newUser.twitter.displayName = profile.displayName
                newUser.twitter.lastStatus = profile._json.status.text    
                
                // save our user into the database
                newUser.save(function(err) {
                    if (err) {
                        return done(err)
                    } else {
                        return done(newUser)
                    }
                })
            }
        })
    })
}))
// -->


// google strategy
passport.use(new GoogleStrategy ({
    clientID: googleConfig.appID,
    clientSecret: googleConfig.appSecret,
    callbackURL: googleConfig.callbackURL
}, (token, tokenSecret, profile, done) => {

    // make the code asynchronous
    process.nextTick(function() {
        GoogleUser.findOne({ 'google.id': profile.id }, function(err, user) {
            if (err) {
                return done(err)
            }
            if (user) {
                return done(user)
            } else {
                // if there is no user, create them
                var newUser = GoogleUser()

                // set all of the user data that we need
                newUser.google.id = profile.id
                newUser.google.token = jwt.sign({ id: profile.id }, "ABC123", { expiresIn:'30m' });
                newUser.google.name = profile.name
                newUser.google.email = profile.emails[0].value
                
                // save our user into the database
                newUser.save(function(err) {
                    if (err) {
                        return done(err)
                    } else {
                        return done(newUser)
                    }
                })
            }
        })
    })
}))
// -->


// linkedin strategy -->
passport.use(new LinkedInStrategy ({
    clientID: linkedinConfig.clientID,
    clientSecret: linkedinConfig.clientSecret,
    callbackURL: linkedinConfig.callbackURL,
    profileFields: ['id', 'first-name', 'last-name', 'email-address']
}, (token, tokenSecret, profile, done) => {
     // make the code asynchronous
     process.nextTick(function() {
        LinkedinUser.findOne({ 'linkedin.id': profile.id }, function(err, user) {
            if (err) {
                return done(err)
            }
            if (user) {
                return done(user);
               // console.log(done(user));
            } else {
                // if there is no user, create them
                var newUser = LinkedinUser()

                // set all of the user data that we need
                newUser.linkedin.id = profile.id
                newUser.linkedin.token = jwt.sign({ id: profile.id }, "ABC111", { expiresIn:'30m' });
                newUser.linkedin.firstName = profile.first-name
                newUser.linkedin.lastName = profile.last-name
                newUser.linkedin.email = profile.email-address[0].value
                
                // save our user into the database
                newUser.save(function(err) {
                    if (err) {
                        return done(err)
                    } else {
                        return done(newUser)
                    }
                })
            }
        })
    })
}))

// -->


passport.serializeUser(function(user, done) {
   console.log('serializing user: ', user)
   done(user._id)
})

passport.deserializeUser(function(id, done) {
    FacebookUser.findById(id, function(err, user) {
        console.log('deserialing user: ', user)
        done(err, user)
    })
    TwitterUser.findById(id, function(err, user) {
        console.log('deserialing user: ', user)
        done(err, user)
    })
    GoogleUser.findById(id, function(err, user) {
        console.log('deserialing user: ', user)
        done(err, user)
    })
    LinkedinUser.findById(id, function(err, user) {
        console.log('deserialing user: ', user)
        done(err, user)
    })
})