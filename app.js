require("dotenv").config({path: "./.env"});
const hbs = require("hbs");
const path = require("path");
const express = require("express");
const cookie = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
 
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const publicDirectory = path.join(__dirname,"./public")
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

app.use(session({
    secret: "weblesson",
    resave:true,
    saveUninitialized:true
}));

app.use((req,res,next)=>{
    res.locals.session = req.session;
    next();
})

hbs.registerHelper("eq",(a,b)=>{
    return a === b;
})

hbs.registerHelper("divide",(a,b)=>{
    if(b === 0) return 0
    return (a/b).toFixed(0)
})

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.use(logger("dev"));
app.use(cookie());
app.use("/login",require("./routes/pages"))
app.use("/auth",require("./routes/auth"))

app.use((req, res) => {
    res.status(404).send("Route not found");
});

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
});
