const mongoose = require('mongoose')

const Outlet = mongoose.model('Outlet', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    phoneno: {
        type: Number,
    },
    address: {
        type: String,
        required: true,
    }
})

module.exports = Outlet