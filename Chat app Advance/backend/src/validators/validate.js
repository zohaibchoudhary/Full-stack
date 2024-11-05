import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validate = (req, res, next) => {
	let errors = validationResult(req);

	if (errors.isEmpty()) {
		return next();
	}

	let extractedErrors = [];

	errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  throw new ApiError(422, "Received data is not valid", extractedErrors)
};
