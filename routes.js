//initialize express router
let router = require("express").Router();
//Import User Controller
const userController = require("./controllers/userController");
const dialogueController = require("./controllers/dialogueController");
const messageController = require("./controllers/messageController");
// User routes
router.route("/user/auth").post(userController.add);
router.route("/user/signin").post(userController.signIn);
router.route("/user/get-dialogues").post(userController.getDialogues);

//Dialogue routes
router.route("/dialogue").post(dialogueController.add);
router.route("/dialogue/rename").post(dialogueController.rename);
router.route("/dialogue/delete-user").post(dialogueController.deleteUser);
router.route("/dialogue/add-user").post(dialogueController.addUser);

//Dialogue routes
router.route("/message/add-message").post(messageController.add);

//Export API routes
module.exports = router;
