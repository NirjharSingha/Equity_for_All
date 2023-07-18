import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    postDescription: {
      type: String,
    },
    postAttachments: {
      type: Array,
      default: [],
    },
    postCategory: {
      type: String,
      default: "public",
    },
    like: {
      type: Array,
      default: [],
    },
    dislike: {
      type: Array,
      default: [],
    },
    laugh: {
      type: Array,
      default: [],
    },
    angry: {
      type: Array,
      default: [],
    },
    sad: {
      type: Array,
      default: [],
    },
    love: {
      type: Array,
      default: [],
    },
    share: {
      type: Array,
      default: [],
    },
    comment: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    collection: "Posts",
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
