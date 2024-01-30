import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
  {
    admin: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
    },
    groupImage: {
      type: String,
    },
    groupVisibility: {
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
    allMembers: {
      type: Array,
      default: [],
    },
    invitationSent: {
      type: Array,
      default: [],
    },
    reqReceived: {
      type: Array,
      default: [],
    },
  },
  {
    collection: "Group",
  }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
