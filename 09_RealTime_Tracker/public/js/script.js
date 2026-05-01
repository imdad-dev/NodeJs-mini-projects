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
      timeout: 3000,
      maximumAge: 0,
}
) 
 
}


const map =L.map("map").setView([0 , 0] , 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Imdad Bhai"
}).addTo(map);

const markers = { };
const paths = {};
const polylines = {}

socket.on("receive-location" , (data)=>{
    const{ id , latitude , longitude} = data;
    map.setView([latitude , longitude] , 15);

    if(markers[id]){
        markers[id].setLatLng([latitude , longitude])
    } else{
        markers[id] = L.marker([latitude , longitude]).addTo(map);
    }

       //  Initialize path array for this user if first time
    if (!paths[id]) {
        paths[id] = [];
    }

    //  Push the new coordinate into their path history
    paths[id].push([latitude, longitude]);

        //  Draw or update the polyline on the map
    if (polylines[id]) {
        // Already has a line → just update it with new points
        polylines[id].setLatLngs(paths[id]);
    } else {
        // First time → create a new polyline and add to map
        polylines[id] = L.polyline(paths[id], {
            color: "blue",      // line color
            weight: 4,          // line thickness (px)
            opacity: 0.7,       // transparency
        }).addTo(map);
    }

})

socket.on("user-disconnected" , ()=>{
 if(markers[id]){
        map.removeLayer(markers[id]);
    delete markers[id];
 }

  //  Remove polyline and clean up path data
    if (polylines[id]) {
        map.removeLayer(polylines[id]);
        delete polylines[id];
    }
    delete paths[id];

})