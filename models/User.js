const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: "Username is required!",
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Email address is required!",
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false,
  }
);

// get total of friends on retrieval
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model using the UserSchema
const User = model("User", UserSchema);

// Export the User model
module.exports = User;
