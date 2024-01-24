import mongoose from "mongoose";

const inboxMessageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      default: "",
    },
    messageAttachments: {
      type: Array,
      default: [],
    },
    time: {
      type: Date,
      default: null,
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
    react: {
      type: String,
      default: "",
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "InboxMessage",
  }
);

const InboxMessage = mongoose.model("InboxMessage", inboxMessageSchema);
export default InboxMessage;
