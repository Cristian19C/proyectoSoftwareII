const mongoose = require('mongoose')
const {Schema}= mongoose

const userSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }, 
    email: {
        type: String, 
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['employee', 'customer', 'administrator'],
        default: 'customer'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)