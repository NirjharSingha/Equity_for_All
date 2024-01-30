import mongoose from "mongoose";
import hashPassword from "../middlewares/hashPassword.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    countryCode: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: null,
    },
    school: {
      type: String,
      default: "",
    },
    college: {
      type: String,
      default: "",
    },
    university: {
      type: String,
      default: "",
    },
    workplace: {
      type: String,
      default: "",
    },
    contactNumber: {
      type: String,
      default: "",
    },
    relationshipStatus: {
      type: String,
      default: "",
    },
    profileStatus: {
      type: String,
      default: "Public",
    },
    reasonOfBeingHere: {
      type: String,
      default: "",
    },
    aboutYourself: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    friendRequestSend: {
      type: Array,
      default: [],
    },
    friendRequestReceived: {
      type: Array,
      default: [],
    },
    blockList: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: null,
    },
    profilePic: {
      type: String,
    },
  },
  {
    collection: "Users",
  }
);

userSchema.pre("save", hashPassword);

const User = mongoose.model("User", userSchema);
export default User;
