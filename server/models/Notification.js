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
    time: {
      type: String,
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

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
