const router = require('express').Router()
const featuresController = require('./../http/controller/API/featuresController')
const upload = require('./../util/multer')('/Slider')

router
.route('/features/slider')
.get(featuresController.getSlides)
.post(upload.single('sliderImage'),featuresController.createSlide)

module.exports = router