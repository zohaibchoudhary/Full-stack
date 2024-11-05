import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";

export const verifyJWT = async (req, res, next) => {
	try {
		const token =
			(await req.cookies?.authToken) ||
			req.header("Authorization").replace("Bearer ", "");

		if (!token) {
			return res.status(401).json(new ApiResponse(401, "Unauthorized request"));
		}

		const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);

		const user = await User.findById(decodedToken._id).select("-password");

		if (!user) {
			return res.status(401).json(new ApiResponse(401, "Invalid token"));
		}

		req.user = user;
		next();
	} catch (error) {
		return res
			.status(500)
			.json(new ApiResponse(401, error.message || "Invalid token"));
	}
};
