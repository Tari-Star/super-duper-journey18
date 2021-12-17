const router = require('express').Router();
const { Router } = require('express');
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    reviseThought,
    removeThought
} = require('../../controllers/thought-controller');
 
// set up GET at /api/thoughts
router
.route('/')
.get(getAllThoughts);

// set up POST at /api/users/:userId/thoughts/
router
.route('/:userId')
.post(addThought);

// set up GET one, PUT and DELETE at /api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)
.put(reviseThought)
.delete(removeThought);

// set up POST and DELETE at /api/thoughts/:thoughtId/reactions
// separate them?
router
.route('/:thoughtId')
.post()
.delete();

module.exports = router;