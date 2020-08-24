// Import express
const express = require('express')
// Import home controller
const rewardController = require('../controllers/reward-controller')
// Create express router
const router = express.Router()
// Create rout between homeControllers and '/' endpoint
// router.get('/', rewardController.rewardGet)
router.get('/list', rewardController.rewardGet)
router.get('/:detailId', rewardController.rewardDetail)
// Export router
module.exports = router