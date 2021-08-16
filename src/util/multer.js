const multer = require('multer')
module.exports = (route) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, process.cwd() + '/src/public/images/' + route)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    })
    const upload = multer({storage})
    return upload
}