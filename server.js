const express = require("express")
const cors = require("cors")
const session = require("express-session")
const mongo = require("connect-mongodb-session")(session)
require('dotenv').config()
// const store = new mongo ({
//     uri: process.env.MONGODB,
//     collection: "sessions"
// })
const router = require("./routes/index")
require("./config/database")
const app = express()
//va a buscar las vistas en la carpeta views, y va a buscar arch de js
app.use(cors()) 
app.set("view engine","ejs") //motor de plantilla (view engine)
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(session ({
    secret: process.env.SECRETPHRASE,
    resave: false,
    saveUninitialized: false
    // store: store
}))
app.use("/", router)
app.listen(4000, () => console.log("server listening"))