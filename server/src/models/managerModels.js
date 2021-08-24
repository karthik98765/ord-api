const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    phoneno: {
        type: Number,
    }
})

managerSchema.statics.findByCredentials = async (email, password) => {
    const manager = await Manager.findOne({ email })

    if(!manager) {
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, manager.password)

    if(!isMatch) {
        throw new Error('unable to login')
    }

    return manager
}

managerSchema.pre('save', async function(next) {
    const manager = this

    if(manager.isModified('password')) {
        manager.password = await bcrypt.hash(manager.password, 8)
    }

    next()
})


const Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager