import {Router} from "express"
import {
  searchAvailableUsers,
  createOrGetAOneOnOneChat,
  createAGroupChat,
	getGroupChatDetails,
	renameGroupChat,
	addNewParticipantInGroupChat,
	removeParticipantFromGroupChat,
	leaveGroupChat,
	getAllChats,
  deleteGroupChat,
  deleteOneOnOneChat,
} from "../../controllers/app/chat.controller.js"
import {verifyJWT} from "../../middlewares/auth.middleware.js"
import {createAGroupChatValidator, updateGroupChatNameValidator} from "../../validators/app/chat.validator.js"
import {mongoIdPathVariableValidator, mongoIdRequestBodyValidator} from "../../validators/common/mongodb.validator.js"
import {validate} from "../../validators/validate.js"

const router = Router()

router.use(verifyJWT)

router.route('/').get(getAllChats)
router.route("/users").get(searchAvailableUsers)

router
  .route("/c/:receiverId")
  .post(
    mongoIdPathVariableValidator("receiverId"),
    validate,
    createOrGetAOneOnOneChat
)

router
  .route("/group")
  .post(
    createAGroupChatValidator(),
    validate,
    createAGroupChat
)

router
  .route("/group/:chatId")
  .get(
    mongoIdPathVariableValidator("chatId"), 
    validate,
    getGroupChatDetails
  )
  .patch(
    mongoIdPathVariableValidator("chatId"),
    updateGroupChatNameValidator(), 
    validate,
    renameGroupChat
  )
  .delete(
    mongoIdPathVariableValidator("chatId"), 
    validate,
    deleteGroupChat
  )

router
  .route("/group/:chatId/:participantId")
  .post(
    mongoIdPathVariableValidator("chatId"), 
    mongoIdPathVariableValidator("participantId"), 
    validate,
    addNewParticipantInGroupChat
  )
  .delete(
    mongoIdPathVariableValidator("chatId"), 
    mongoIdPathVariableValidator("participantId"), 
    validate,
    removeParticipantFromGroupChat
  )

router
  .route("/leave/group/:chatId")
  .delete(
    mongoIdPathVariableValidator("chatId"),
    validate,
    leaveGroupChat
  )

router
  .route("/remove/:chatId")
  .delete(
    mongoIdPathVariableValidator("chatId"),
    validate,
    deleteOneOnOneChat
  )

export default router