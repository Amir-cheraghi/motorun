const axios = require('axios').default
module.exports = new class showRoutes{

    async showIndex(req,res){
        const getSlider =await axios.get(`${req.protocol}://${req.hostname}:3000/api/features/slider`)
        res.render('users/index', {
            sliderData : getSlider.data.data
        })
    }

}