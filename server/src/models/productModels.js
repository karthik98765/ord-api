const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    // outlet_id: {
    //     type: ,

    // }
    name: {
        type: String,
        trim: true,
        required: true
    },
    cost: {
        type: Decimal128,
        required: true,
        validate(value) {
            if(value = 0) {
                throw new Error('cost must be positive number')
            }
        }
    }
})

module.exports = Product