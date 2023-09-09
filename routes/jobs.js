const express = require('express')
const { createJob, getAllJobs, getSingleJob, updateJob, deleteJob } = require('../controllers/jobs')
const router = express.Router()



router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router