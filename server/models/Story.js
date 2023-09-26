import mongoose from "mongoose";

const storySchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    storyDescription: {
      type: String,
    },
    fontColor: {
      type: String,
    },
    fontStyle: {
      type: String,
    },
    backgroundImg: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    visibility: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "Story",
  }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
