const moongose = require('mongoose')
const sliderSchema = new moongose.Schema({
sliderTitle : {type : String},
sliderDescription : {type : String},
sliderLinkTitle : {type : String},
sliderLink : {type : String},
imagePath : {type : String}
})

const Slider = moongose.model('Slider' , sliderSchema)

module.exports = Slider