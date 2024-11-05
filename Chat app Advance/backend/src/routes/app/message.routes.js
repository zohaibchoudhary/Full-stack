import { Router } from "express";
import {
	sendMessage,
	getAllMessages,
} from "../../controllers/app/message.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import {upload} from "../../middlewares/multer.middleware.js"
import { sendMessageValidator } from "../../validators/app/message.validator.js";
import { mongoIdPathVariableValidator } from "../../validators/common/mongodb.validator.js";
import { validate } from "../../validators/validate.js";

const router = Router();

router.use(verifyJWT);

router
	.route("/:chatId")
	.get(mongoIdPathVariableValidator("chatId"), validate, getAllMessages)
	.post(
		upload.fields([
			{
				name: "attachments",
				maxCount: 5
			}
		]),
		// mongoIdPathVariableValidator("chatId"),
		// sendMessageValidator(),
		// validate,
		sendMessage
	);

export default router;