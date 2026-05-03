const socket = io();

// ─── Get username before doing anything ───────────────────
let username = "";
// Stores YOUR own current position
let myLocation = null;

// Stores my own socket id
let mySocketId = null;


const modal = document.getElementById("username-modal");
const input = document.getElementById("username-input");
const btn   = document.getElementById("username-btn");

// When user clicks "Join Map"
btn.addEventListener("click", () => {
    const val = input.value.trim();
    if (!val) {
        input.style.border = "2px solid red"; // highlight if empty
        return;
    }
    username = val;
    modal.style.display = "none"; // hide modal
    startTracking();              // start geolocation
});

// Also allow pressing Enter key
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btn.click();
});


 function startTracking(){
    
if(navigator.geolocation){
    navigator.geolocation.watchPosition( (position)=>{
        const {latitude , longitude  } = position.coords;
            //  save your own location locally 👇
            myLocation = { latitude, longitude };
        socket.emit("send-location" , { latitude , longitude , username});
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
 }


const map =L.map("map").setView([0 , 0] , 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Imdad Bhai"
}).addTo(map);


// ─── Haversine Formula ────────────────────────────────────────────
// Returns distance in kilometers between two GPS points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // rounded to 2 decimal places
}

const markers = { };
const paths = {};
const polylines = {}

socket.on("receive-location" , (data)=>{
    const{ id , latitude , longitude , username} = data;
    map.setView([latitude , longitude] , 15);

    if(markers[id]){
        markers[id].setLatLng([latitude , longitude])
    } else{
        markers[id] = L.marker([latitude , longitude])
        .addTo(map)
        .bindTooltip(username, {       // 👈 attach name label
                permanent: true,           // always visible (not just on hover)
                direction: "top",          // label appears above marker
                className: "user-label",   // our custom CSS class
                offset: [0, -10],          // push label up a bit
            });
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
        }).addTo(map)
 
    }

})


// ── Update Sidebar ──────────────────────────────────────────
const userListEl  = document.getElementById("user-list");
const userCountEl = document.getElementById("user-count");

socket.on("update-user-list", (users) => {
    // Update count badge
    userCountEl.textContent = users.length;

    // Clear and re-render list
    userListEl.innerHTML = "";

    users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="status-dot"></span>
            <span>${user.username}</span>
        `;
        userListEl.appendChild(li);
    });
});

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