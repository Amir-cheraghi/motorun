const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mongoStore = require('mongo-connect')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const layouts = require('express-ejs-layouts')
const dotenv = require('dotenv').config({path : path.join(__dirname,'config/config.env')})
const flash = require('connect-flash')

const viewRotes = require('./routes/routes')


module.exports = new class application {

    constructor(){
        this.setMongo()
        this.setConfig()
        this.setRoute()
        this.setExpress()
    }

    setMongo(){
        mongoose.connect(process.env.DB_URL,{
            
        })
    }
    setConfig(){
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        app.use(cookieParser)
        app.use(session({
            secret : process.env.SESSION_SECRET,
            resave : true,
            saveUninitialized : true,
            cookie : {httpOnly : true , secure : true , maxAge : process.env.COOKIE_EXPIRE},
            store : new mongoStore({url : process.env.DB_URL})
        }))
        app.set('view engine' , 'ejs')
        app.set('views' , path.join(__dirname,process.env.VIEW_PATH))
        app.set('layout',path.join(__dirname,process.env.USERS_LAYOUTS));
        app.use(express.static(path.join(__dirname,process.env.PUBLIC_PATH)))
        app.set("layout extractScripts", true)
        app.set("layout extractStyles", true)
        app.use(flash())
        app.use(layouts)
    }

    setRoute(){
        app.use(viewRotes)
    }

    setExpress(){   
        app.listen(process.env.APP_PORT , '127.0.0.1' , ()=>console.log(`SERVER IS RUNNING IN PORT : ${process.env.APP_PORT}`))
    }
}