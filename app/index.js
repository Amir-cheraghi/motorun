const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const layouts = require('express-ejs-layouts')
const dotenv = require('dotenv').config({path : path.join(__dirname,'config/config.env')})
const flash = require('connect-flash')
const chalk = require('chalk')


const frontRoutes = require('./routes/userRoute')
const adminRoutes = require('./routes/adminRoute')
const APIRoutes = require('./routes/apiRoutes')


module.exports =  class application {

    constructor(){
        this.setMongo()
        this.setConfig()
        this.setRoute()
        this.setExpress()
    }

   async setMongo(){
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(chalk.bgBlueBright.black.underline('CONNECTED TO DB'));
    }
    setConfig(){
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        app.use(session({
            secret : process.env.SESSION_SECRET,
            resave : true,
            saveUninitialized : true,
            cookie : {httpOnly : true , secure : true , maxAge : process.env.COOKIE_EXPIRE},
            store : mongoStore.create({mongoUrl : process.env.DB_URL})
        }))
        app.use(flash())
        app.use(express.static(path.join(process.cwd(),'/src/public/')))
        app.set('views' , path.join(process.cwd(),'/src/views'))
        app.set('view engine' , 'ejs')
        app.use(layouts)
        app.set('layout',path.join(process.cwd(),'/src/views/users/master'));
        app.set("layout extractScripts", true)
        app.set("layout extractStyles", true)
    }

    setRoute(){
        app.use('/',frontRoutes)
        app.use('/api',APIRoutes)
        app.use('/admin',adminRoutes)
    }

    setExpress(){   
        app.listen(process.env.APP_PORT , ()=>console.log(chalk.bgBlueBright.black.underline(`SERVER IS RUNNING IN PORT : ${process.env.APP_PORT}`)))
    }
}