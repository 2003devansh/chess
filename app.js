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

    if(!players.white){
        players.white  = uniqueSocket.id; 
        uniqueSocket.emit("playerRole","w") ;
    //  if there is none white player then create a white player 
    // and give its unique id name :- uniqueSocket.id 
    // and make a call to the front end that the player is been created
    // and assingining the player role to the white 
    }else if(!players.black){
        players.black = uniqueSocket.id ;
        uniqueSocket.emit("playerRole","b") ;
    // if there is none black player then create a black player 
    // and give its unique id name :- uniqueSocket.id 
    // and make a call to the front-end that the player is been created
    // and assinging its player  role to black .
    }
})

server.listen(3000,()=>{
    console.log("listing on port 3000");
    
}) ;

