var mongoose = require('mongoose')

module.exports = mongoose.model('FacebookUser', {
    fb: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String
    }
})