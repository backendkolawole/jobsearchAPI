const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const { NotFoundError } = require('../errors')


const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
   res.status(StatusCodes.CREATED).json(job)
}

const getAllJobs = async (req, res)=> {
    const {userId} = req.user
    const job = await Job.find({createdBy: userId}).sort('createdAt')
    res.status(StatusCodes.CREATED).json(job)
}

const getSingleJob = async (req, res) => {
    const {userId} = req.user
    const {id} = req.params
    const job = await Job.findOne({ _id: id, createdBy: userId } )
    if (!job) {
        throw new NotFoundError(`No job with id: ${id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const updateJob = async (req, res) => {

    const {id} = req.params
    const {userId} = req.user
    const {company, position} = req.body

    if (!company || !position) {
        throw new BadRequestError(`Company or position fields cannot be empty`)
    }

    const job = await Job.findByIdAndUpdate({_id: id, createdBy: userId}, req.body, {runValidators: true, new: true})

    if (!job) {
        throw new NotFoundError(`No job with id: ${id}`)
    }

    res.status(StatusCodes.OK).json(job)
}

const deleteJob = async (req, res)=> {

    const {id} = req.params
    const {userId} = req.user
    const job = await Job.findByIdAndDelete({_id: id, createdBy: userId})
    if (!job) {
        throw new NotFoundError(`No job with id: ${id}`)
    }
    res.status(StatusCodes.OK).send()
}



module.exports = {createJob, getAllJobs, getSingleJob, updateJob, deleteJob}