import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		const token = user.generateToken(userId);

		user.save({ validateBeforeSave: false });
		return token;
	} catch (error) {
		console.log("Something went wrong while generating token", error);
	}
};

const registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		if ([username, email, password].some((field) => field.trim() == "")) {
			return res
				.status(404)
				.json(new ApiResponse(400, "All fields are required"));
		}

		const isExistingUser = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (isExistingUser) {
			return res
			.status(400)
			.json(
				new ApiResponse(400, "User with same username or email already exists")
			);
		}

		const user = await User.create({
			username,
			email,
			password
		})

		const createdUser = await User.findById(user._id).select("-password")

		if (!createdUser) {
			return res
			.status(400)
			.json(
				new ApiResponse(400, "Failed to register user")
			)
		}

		return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				"User registered successfully. Go and login now",
				createdUser
			)
		)
	} catch (error) {
		return res
			.status(500)
			.json(new ApiResponse(500, "Failed to register user. Try again"));
	}
};

const loginUser = async (req, res) => {
	const {email, password} = req.body;

	try {
		if (!email || !password) {
			return res
			.status(400)
			.json(new ApiResponse(400, "Username or email is missing"));
		}

		const foundedUser = await User.findOne({email})

		if (!foundedUser) {
			return res
			.status(404)
			.json(new ApiResponse(404, "User does not exist"));
		}

		const isPasswordvalid = await foundedUser.isPasswordCorrect(password)

		if (!isPasswordvalid) {
			return res
			.status(400)
			.json(
				new ApiResponse(400, "Incorrect Password")
			)
		}

		const token = await generateToken(foundedUser._id)

		const loggedInUser = await User.findById(foundedUser._id).select("-password")

		const options = {
			httpOnly: true,
			secure: true
		}

		return res
		.status(200)
		.cookie("authToken", token, options)
		.json(
			new ApiResponse(
				200, "User logged in successfully", loggedInUser
			)
		)
	} catch (error) {
		return res
			.status(500)
			.json(new ApiResponse(500, "Failed to login user. Try again"));
	}
}

const logoutUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id)

		if (!user) {
			return res
			.status(404)
			.json(new ApiResponse(404, "User not found"));
		}

		
	} catch (error) {
		return res
			.status(500)
			.json(new ApiResponse(500, "Failed to logout user"));
	}
}


