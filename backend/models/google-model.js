var mongoose = require('mongoose')

module.exports = mongoose.model('GoogleUser', {
    google: {
        id: String,
        token: String,
        name: String,
        email: String,
        // picture: String
    }
})