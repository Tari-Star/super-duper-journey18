const { Schema, model, Types } = require("mongoose");
// const dateFormat = require("../utils/dateFormat");
const moment = require('moment');

const ReactionSchema = new Schema(
  {
    // set custom to avoid confusion with parent thought _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdVal => moment(createdVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // to format the timestamp on query
      get: createdVal => moment(createdVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
    username: {
      type: String,
      required: true,
      ref: 'User'
    },
    // use ReactionSchema to validate data for a reaction
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// virtual that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
// Create Thought model using ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

// export Thought model
module.exports = Thought;
