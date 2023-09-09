const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company']
    },
    position: {
        type: String,
        required: [true, `Please provide a name`]
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined', 'hired'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, {timestamps: true})


const Job = mongoose.model('Job', jobSchema)
module.exports = Job