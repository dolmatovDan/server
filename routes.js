//initialize express router
let router = require("express").Router();
//Import User Controller
const userController = require("./controllers/userController");
const dialogueController = require("./controllers/dialogueController");
// User routes
router.route("/auth").post(userController.add);
router.route("/signin").post(userController.signIn);

//Dialogue routes
router.route("/dialogue").post(dialogueController.add);
router.route("/dialogue/get-dialogues").post(dialogueController.get);
router.route("/dialogue/rename").post(dialogueController.rename);
router.route("/dialogue/delete-user").post(dialogueController.deleteUser);
router.route("/dialogue/add-user").post(dialogueController.addUser);
//Export API routes
module.exports = router;
