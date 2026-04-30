const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition( (position)=>{
        const {latitude , longitude  } = position.coords;
        socket.emit("send-location" , { latitude , longitude});
    } , 
 (error)=>{
    console.log("location error : " ,error);
 } ,
 {
    enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
}
) 
 
}


const map =L.map("map").setView([0 , 0] , 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Imdad Bhai"
}).addTo(map);

const marker = { };