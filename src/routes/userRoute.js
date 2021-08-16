const router = require('express').Router()
const showRoutesController = require('../http/controller/frontEnd/showRoutesController')

router.get('/',showRoutesController.showIndex)

module.exports = router
