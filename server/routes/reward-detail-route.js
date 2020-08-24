// Import express
const express = require('express')
// Import home controller
const rewardController = require('../controllers/reward-detail-controller')
// Create express router
const router = express.Router()
// Create rout between homeControllers and '/' endpoint
router.get('/', rewardController.rewardDetail)
// Export router
module.exports = router