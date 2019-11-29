const mongoose = require('mongoose')
require('./to-do-list')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    saltString: String
})

userSchema.pre('save', function(next) {
    bcrypt.genSalt(5, (err, Salt) => {
        bcrypt.hash(this.password, Salt, (err, hash) => {
            if(err) {
                console.log('Error in generating salt: ' + err)
            }
            else {
                this.password = hash
                this.saltString = Salt
                next()
            }
        })
    })
})

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)