const express = require('express');

const Projects = require('../helpers/projectModel')

const Actions = require('../helpers/actionModel')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch {
        res.status(500).json({
            message: 'Error retrieving actions'
        })
    }   
})

router.get('/:id', async (req, res) => {
    try {
        const actionId = req.params.id;
        const action = await Actions.get(actionId);
        res.status(200).json(action)

    } catch {
        res.status(500).json({
            message: 'Error retrieving action'
        })
    }
})

function propertyChecker(req,res,next) {
    // Make sure that project_id description and notes are included in request
    const newAction = req.body;
    if (!newAction.hasOwnProperty('project_id') || !newAction.hasOwnProperty('description') || !newAction.hasOwnProperty('notes')) {
        res.status(400).json({
            message: 'Please include a project_id, description, and notes'
        }) 
    } else {
        next()
    }
}

async function projectChecker(req,res,next) {
    // Make sure that the project exists
    const newAction = req.body;
    if (newAction.hasOwnProperty('project_id')) {
        try {
            const validProject = await Projects.get(req.body.project_id)
            next()
        } catch {
            res.status(400).json({
                message: 'The project you are trying to add to does not exist'
            })
        }   
    }
}

function descriptionChecker(req,res,next) {
    // Make sure description is only allowed to be 128 characters long
    const newAction = req.body;
    const descriptionLength = req.body.description.length;
    if (descriptionLength > 128){
        res.status(400).json({
            message: 'Your description is too long - please reduce to 128 characters or lower'
        }) 
    } else {
        next()
    }
}

router.post('/', propertyChecker, projectChecker, descriptionChecker, async (req,res,next) => {
    try {
        const newAction = req.body;
        const action = await Actions.insert(newAction)
        res.status(201).json(action)
    } catch {
        res.status(500).json({
            message: 'Error creating action'
        })
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const actionId = req.params.id
        const response = await Actions.remove(actionId)
        res.status(200).json({
            message: 'Successfully deleted action'
        })
    } catch {
        res.status(500).json({
            message: 'Error deleting action'
        })
    }
})

router.put('/:id', propertyChecker, projectChecker, descriptionChecker, async (req,res) => {
    try {
        const changes = req.body
        const actionId = req.params.id
        const action = await Actions.update(actionId, changes)
        res.status(200).json(action)
    } catch {
        res.status(500).json({
            message: 'Error updating action'
        })
    }
})

module.exports = router;