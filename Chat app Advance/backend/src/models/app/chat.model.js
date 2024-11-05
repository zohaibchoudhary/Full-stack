import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    isGroupChat: {
      type: Boolean,
      default: false
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "ChatMessage"
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }, 
  { timestamps: true });

export const Chat = mongoose.model("Chat", chatSchema);
