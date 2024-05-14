const { model, Schema } = require("mongoose");

const signUpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("SignUp", signUpSchema);
