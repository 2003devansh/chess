

// setting up socket.io in the front-end
const socket = io();
const chess = new Chess() ;
const boardElement = document.querySelector("#chessboard") ;

let draggedPiece = null ;
let sourceSquare  = null ; 
let player = null ;


const renderBoard = () => {
  const board  = chess.board();
  boardElement.innerHTML = "" ; // making the board empty before  use
  board.forEach((row,rowindex) => {
    row.forEach((square,squareindex) =>{
      const squareElement = document.createElement("div") ;
      squareElement.classList.add(
        "square",
        (rowindex + squareindex) % 2 === 0 ? "light" : "dark" 
      )
      squareElement.dataset.row = rowindex ; 
      squareElement.dataset.col = squareindex ;

      if(square){
        const pieceElement = document.createElement("div") ;
        pieceElement.classList.add(
            "piece" ,
            square.color === "w" ? "white" : "black"
        ); 
        pieceElement.innerText = "" ; 

      }
       
    })
    
  });
}

const handleMove = () => {

}

const getPieceUnicode = () => {

}

renderBoard() ;
