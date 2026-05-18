const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// GET /api/jobs - list all jobs with optional filters
router.get('/', async(req, res) => {
    try {
        const { category, status } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (status) filter.status = status;

        const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/jobs/:id - fetch single job
router.get('/:id', async(req, res) => {
    try {
        const job = await JobRequest.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/jobs - create new job
router.post('/', async(req, res) => {
    try {
        const job = new JobRequest(req.body);
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
});

// PATCH /api/jobs/:id - update status only
router.patch('/:id', async(req, res) => {
    try {
        const { status } = req.body;

        if (!['Open', 'In Progress', 'Closed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const job = await JobRequest.findByIdAndUpdate(
            req.params.id, { status }, { new: true, runValidators: true }
        );

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/jobs/:id - delete job
router.delete('/:id', async(req, res) => {
    try {
        const job = await JobRequest.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;