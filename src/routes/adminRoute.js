const router = require('express').Router()
const adminRouteController = require('../http/controller/admin/adminRouteController')

router.get('/',adminRouteController.index)
router.get('/features',adminRouteController.features)

module.exports = router
