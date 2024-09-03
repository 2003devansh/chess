// setting up socket.io in the front-end
const socket = io();

socket.emit("can_be_anything")
// emitting something from front end to backend 

socket.on("churan papdi" , ()=>{
    console.log("data receive from the back-end");
    
})