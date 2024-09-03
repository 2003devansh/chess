const express  = require("express") ;
const socket = require("socket.io") ;
const http  = require("http") ; 
const path  = require("path") ;


const {Chess}  = require("chess.js") ;
const { log } = require("console");
const { title } = require("process");
// requiring chess class from chess.js 


const app  = express() ;


const server = http.createServer(app) ;
// intializing http server with express
const io  = socket(server) ;
// instantiasing socket.io on http server

const chess = new Chess() ; 

let players = {} ; 
let currentPlayer  = 'W' ;


app.set('view engine' , 'ejs') ; // used to help ejs {similar to html}
app.use(express.static(path.join(__dirname,"public")));  // used to static file  images , js

app.get("/" , (req,res)=>{
  res.render("index",{title:"chess game"}) ;
})


io.on("connection" ,(uniqueSocket)=>{
    console.log("connected");

    uniqueSocket.on("can_be_anything",()=>{
        console.log("heyy its responding");
        io.emit("churan papdi")
        // if data is receive from the fronend then emit the data from the backend to front-end        
    }) ; 
    // receive from the front-end 

    
})

server.listen(3000,()=>{
    console.log("listing on port 3000");
    
}) ;

