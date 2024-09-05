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


    // this whole part shows the if some-one get connected
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
    }else{
        uniqueSocket.emit("SpectatorRole") ;
        // if neither of this condition are true then the player will assingn to the spectator role
    }

    // And this part is for the person if person get disconnected 
    uniqueSocket.on("disconnect" , ()=>{
    // if unique.socket id is equal to the either if the player then disconnect the game
    if(uniqueSocket.id == players.white){
         delete players.white ;

    }else if(uniqueSocket.id == players.black ){
      delete players.black ; 
      
    }
    })
    // this functionality will check if the valid  player is making the valid move or not 

    uniqueSocket.on("move" , (move)=>{
        try{
            if(chess.turn() === 'w' && uniqueSocket.id != players.white){
                return  ; 
                // chess.turn is a function  in chess class
            }
            if(chess.turn() === 'b' && uniqueSocket.id != players.black){
                return  ; 
                // chess.turn is a function  in chess class
            }
            // even if the wrong player will make a move it will get back to its place 

            const result = chess.move(move) ;
            if(result){
                currentPlayer = chess.turn() ;
                io.emit("move",move) ; 
                io.emit("boardState",chess.fen()) ;
            // this thing will check if current palyer is valid then it can make a move
            // and will emit to all the player and spectator 
            // and it will also emit the current condition of the board
            // this can be done by the chess.fen() function 
            }
        }catch(err){
           console.log(err);
           uniqueSocket.emit("Invalid move ",move) ; 
           // io.emit is for all the player in front end 
           // and uniqueSocket.emit is for the particular player  
        }
    })
})




server.listen(3000,()=>{
    console.log("listing on port 3000");
    
}) ;

