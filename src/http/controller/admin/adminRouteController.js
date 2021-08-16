const path = require('path')
const layout = {layout:path.join(process.cwd(),'/src/views/admin/master')}
module.exports = new class adminRouteController{

    index(req,res){
        res.render('admin/index' ,{...layout} )
    }

    features(req,res){
        res.render('admin/pages/features' , {...layout})
    }

}