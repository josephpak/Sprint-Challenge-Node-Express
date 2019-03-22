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

module.exports = router;