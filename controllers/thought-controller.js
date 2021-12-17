const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get a single thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        //if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        // push the created thought's _id to the associated user's thoughts array field
        return User.findByIdAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        //if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  reviseThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        //if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        //if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};
