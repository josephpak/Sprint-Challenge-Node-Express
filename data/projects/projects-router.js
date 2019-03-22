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

router.post('/', async (req,res) => {
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

router.put('/:id', async (req,res) => {
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

module.exports = router;