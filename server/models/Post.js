import mongoose from "mongoose";

const replySchema = mongoose.Schema({
  commentID: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  commentDesc: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
  parentID: {
    type: String,
    default: "",
  },
  level: {
    type: Number,
    default: 0,
  },
  levelParent: {
    type: String,
    default: "",
  },
  higherParent: {
    type: String,
    default: "",
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
  love: {
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
  editedAt: {
    type: String,
    default: "",
  },
  deletedAt: {
    type: String,
    default: "",
  },
  reply: {
    type: Array, // Nesting the reply schema within the comment schema
    default: [],
  },
});

const commentSchema = mongoose.Schema({
  commentID: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  commentDesc: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
  parentID: {
    type: String,
    default: "",
  },
  level: {
    type: Number,
    default: 0,
  },
  levelParent: {
    type: String,
    default: "",
  },
  higherParent: {
    type: String,
    default: "",
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
  love: {
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
  editedAt: {
    type: String,
    default: "",
  },
  deletedAt: {
    type: String,
    default: "",
  },
  reply: {
    type: [replySchema], // Nesting the reply schema within the comment schema
    default: [],
  },
});

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
      type: [commentSchema],
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
