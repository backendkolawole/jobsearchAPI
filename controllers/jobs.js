const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError } = require("../errors");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  return res.status(StatusCodes.CREATED).json(job);
};

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;
  const { userId } = req.user;

  const queryObject = {
    createdBy: userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  if (status && status != 'all') {
    queryObject.status = status
  }

  if (jobType && jobType != 'all') {
    queryObject.jobType = jobType
  }

  let result = Job.find(queryObject);

  if (sort == 'latest') {
    result = result.sort('-createdAt')
  }

  if (sort == 'oldest') {
    result = result.sort('createdAt')
  }

  if (sort == 'a-z') {
    result = result.sort('position')
  }

  if (sort == 'z-a') {
    result = result.sort('-position')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)
  return res.status(StatusCodes.OK).json({jobs, totalJobs, numOfPages});
};

const getSingleJob = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const job = await Job.findOne({ _id: id, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError(`Company or position fields cannot be empty`);
  }

  const job = await Job.findByIdAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    { runValidators: true, new: true }
  );

  if (!job) {
    throw new NotFoundError(`No job with id: ${id}`);
  }

  return res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const job = await Job.findByIdAndDelete({ _id: id, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${id}`);
  }
  res.status(StatusCodes.NO_CONTENT).send();
};

module.exports = { createJob, getAllJobs, getSingleJob, updateJob, deleteJob };
