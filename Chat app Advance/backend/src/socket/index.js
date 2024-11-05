import cookie from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../models/auth/user.model.js";
import { ChatEventEnum } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";

const mountJoinChatEvent = (socket) => {
	socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId) => {
		console.log("User joined 🤝 chat: ", chatId);
		socket.join(chatId);
	});
};

const mountParticipantTypingEvent = (socket) => {
	socket.on(ChatEventEnum.TYPING_EVENT, (chatId) => {
		socket.in(chatId).emit(ChatEventEnum.TYPING_EVENT, chatId);
	});
};

const mountParticipantStoppedTypingEvent = (socket) => {
	socket.on(ChatEventEnum.STOP_TYPING_EVENT, (chatId) => {
		socket.in(chatId).emit(ChatEventEnum.STOP_TYPING_EVENT, chatId);
	});
};

const initializeSocketIO = (io) => {
	return io.on("connection", async (socket) => {
		try {
			// parse the cookies from the handshake headers (This is only possible if client has `withCredentials: true`)
			const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

			let token = cookies?.accessToken;

			if (!token) {
				token = socket.handshake.auth?.token;
			}

			if (!token) {
				throw new ApiError(401, "Un-authorized handshake. Token is missing");
			}
			const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

			const user = await User.findById(decodedToken?._id).select(
				"-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
			);

			if (!user) {
				throw new ApiError(401, "Un-authorized handshake. Token is invalid");
			}

			socket.user = user;

			socket.join(user._id.toString());
			socket.emit(ChatEventEnum.CONNECTED_EVENT);
			console.log("User connected 🗼 userId: ", user._id.toString());

			console.log(socket);
			mountJoinChatEvent(socket);
			mountParticipantTypingEvent(socket);
			mountParticipantStoppedTypingEvent(socket);

			socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
				console.log("User disconnected 🚫 userId: ", socket.user?._id);

				if (socket.user?._id) {
					socket.leave(socket.user._id);
				}
			});
		} catch (error) {
			socket.emit(
				ChatEventEnum.SOCKET_ERROR_EVENT,
				error?.message || "Something went wrong while connecting to the socket"
			);
		}
	});
};

const emitSocketEvent = (req, roomId, event, payload) => {
	req.app.get("io").in(roomId).emit(event, payload);
};

export { initializeSocketIO, emitSocketEvent };
