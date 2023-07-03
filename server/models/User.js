import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 24,
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  dateOfBirth: Date,
  school: String,
  college: String,
  university: String,
  workplace: String,
  contactNumber: String,
  relationshipStatus: String,
  reasonForComing: String,
  opinionOnEquity: String,
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
  posts: {
    type: Array,
    default: [],
  },
  yourGroups: {
    type: Array,
    default: [],
  },
  otherGroups: {
    type: Array,
    default: [],
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  profilePicture: {
    type: Buffer,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
