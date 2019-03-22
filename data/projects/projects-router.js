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

function propertyChecker(req,res,next) {
    // Make sure that name and description are included in request
    const newProject = req.body;
    if (!newProject.hasOwnProperty('name') || !newProject.hasOwnProperty('description')) {
        res.status(400).json({
            message: 'Please include a name and description'
        }) 
    } else {
        next()
    }
}

router.post('/', propertyChecker, async (req,res) => {
    try {
        const newProject = req.body
        const project = await Projects.insert(newProject)
        res.status(201).json(project)
    } catch {
        res.status(500).json({
            message: 'Error creating a project'
        })
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const projectId = req.params.id
        const response = await Projects.remove(projectId)
        res.status(200).json({
            message: 'Successfully deleted project'
        })
    } catch {
        res.status(500).json({
            message: 'Error deleting project'
        })
    }
})

router.put('/:id', propertyChecker, async (req,res) => {
    try {
        const changes = req.body
        const projectId = req.params.id
        const project = await Projects.update(projectId, changes)
        res.status(200).json(project)
    } catch {
        res.status(500).json({
            message: 'Error updating project'
        })
    }
})

router.get('/:id/actions', async (req,res) => {
    try {
        const projectId = req.params.id
        const projectActions = await Projects.getProjectActions(projectId)
        res.status(200).json(projectActions)
    } catch {
        res.status(500).json({
            message: 'Error getting actions for this project'
        })
    }
})

module.exports = router;