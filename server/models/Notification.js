import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    createdAt: {
      time: String,
      default: "",
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "Notification",
  }
);

const Notification = mongoose.model("Group", notificationSchema);
export default Notification;
