const express = require('express');

const Projects = require('../helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    } catch {
        res.status(500).json({
            message: 'Error retrieving projects'
        })
    }
})

module.exports = router;