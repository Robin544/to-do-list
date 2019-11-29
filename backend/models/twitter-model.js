var mongoose = require('mongoose')

module.exports = mongoose.model('TwitterUser', {
    twitter: {
        id: String,
        token: String,
        username: String,
        displayName: String,
        lastStatus: String
    }
})