const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username:
    {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "email address is required",
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display Name is required",
    },

    created: {
      type: Date,
      default: Date.now,
    },

    update: {
      type: Date,
      default: Date.now,
    },
  },

  {
    collection: "users",
  }
);

let options = { missingPasswordError: "Wrong Password" };
userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", userSchema);
