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

router.get('/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Projects.get(projectId);
        res.status(200).json(project)
    } catch {
        res.status(500).json({
            message: 'Error retrieving project'
        })
    }
})

module.exports = router;