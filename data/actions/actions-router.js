const express = require('express');

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

module.exports = router;