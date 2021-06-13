//initialize express router
let router = require('express').Router();
//Import Bio Controller
const bioController = require('./controllers/bioController');
// Bio routes
router.route('/auth')
    .post(bioController.add);
router.route('/signin')
    .post(bioController.signIn);
//Export API routes
module.exports = router;