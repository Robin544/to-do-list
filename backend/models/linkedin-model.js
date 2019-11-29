var mongoose = require('mongoose')

module.exports = mongoose.model('LinkedinUser', {
    linkedin: {
        id: String,
        token: String,
        firstName: String,
        lastName: String,
        emailAddress: String,
        // picture: String
    }
})