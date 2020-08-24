// Import express
const express = require('express')
// Import home controller
const regisCodeController = require('../controllers/register-code-controller')
// Create express router
const router = express.Router()
// Create route between homeControllers and '/' endpoint
router.post('/register-code', regisCodeController.regis)
// Export router
module.exports = router