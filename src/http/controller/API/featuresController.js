const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const slider = require('../../../models/slider')
const jimp = require('jimp')
module.exports = new class features {

    async createSlide(req, res) {
        try {
            //Define Path Of Images
            const imagePath = req.file.path.replace(process.cwd(), '').replace('\\src\\public', '')
            const resizedImage = imagePath.replace('\\Slider', '\\Slider\\resized')
            //Resize Image
            const resize = await jimp.read(req.file.path)
            resize.resize(1400, 377).write('src/public/' + resizedImage)
            //Romeve Original Size Image
            const unlink = promisify(fs.unlink)
            unlink(req.file.path)
            //Save In DB
            const doc = await slider.create({ ...req.body, imagePath: resizedImage })

            res.status(200).json({
                status: 'success',
                msg: 'Doc Successfully Saved',
                data: doc
            })
        } catch (err) {
            console.log(err)
        }
    }

   async getSlides(req,res){
        try{
        const data = await slider.find()
        res.status(200).json({
            status : 'success',
            data 
        })
        }catch(err){
        console.log(err)    
        }
    }

}