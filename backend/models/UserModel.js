const { Schema, SchemaTypes, model } = require("mongoose");

const schemaUser = Schema({
  userName: {
    type: String,
    required: [true, "Name is required"],
  },
  userEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    index: true,
  },
  userPassword: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["user", "boss", "admin"],
    default: "user",
  },
  boss: {
    type: SchemaTypes.ObjectId,
    required: false,
    default: null,
  },
  token: {
    type: String,
    required: false,
    default: null,
  },
});

module.exports = model("user", schemaUser);
