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
    backgroundImage: {
      type: String,
    },
    backgroundColor: {
      type: String,
    },
    storyVisibility: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: null,
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
