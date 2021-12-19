const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    addReaction,
    reviseThought,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');
 
// set up GET at /api/thoughts
router
.route('/')
.get(getAllThoughts);

// set up POST at /api/thoughts/:userId
router
.route('/:userId')
.post(addThought);

// set up GET one, PUT and DELETE at /api/thoughts/:userId/:thoughtId
router
.route('/:userId/:thoughtId')
.post(addReaction)
.get(getThoughtById)
.put(reviseThought)
.delete(removeThought);

// set up DELETE at /api/thoughts/:userId/:thoughtId/:reactionId
router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;