const router = require("express").Router();
const usersRoute = require('./users/userRoute')
const adminRoute = require('./admin/adminRoute')


router.use('/',usersRoute)
router.use('/admin',adminRoute)


module.exports = router