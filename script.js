let map = L.map('map').setView([48.866964576087014, 2.3514963324831593], 12);

let manIcon = L.icon({
    iconUrl: 'redstonetorch.gif',
    iconSize: [45, 75], // size of the icon
});

let restaurantIcon = L.icon({
    iconUrl: 'restos.jpg',
    iconSize: [45, 45], // size of the icon
});

let users = [{
    name: "Theodore",
    position: [48.866964576087014, 2.3514963324831593],
    heureDepart: 11

}, {
    name: "Alex",
    position: [48.841235456968775, 2.40570516914324],
    heureDepart: 11
}]

// let user1 = L.marker([users[0].position[0], users[0].position[0]], {
let user1 = L.marker([48.866964576087014, 2.3514963324831593], {
    icon: manIcon,
    draggable: true


}).addTo(map);
user1.on("dragend", () => {
    console.log("hello");
})

console.log(user1);

let user2 = L.marker([48.841235456968775, 2.40570516914324], {
    icon: manIcon,
    draggable: true

}).addTo(map);


let restaurant1 = L.marker([48.84901822720585, 2.312037311292086], {
    icon: restaurantIcon,
    draggable: true
}).addTo(map);

let restaurant2 = L.marker([48.88221774694522, 2.3020809523222576], {
    icon: restaurantIcon,
    draggable: true
}).addTo(map);


let arrivée = L.marker([48.8232403909458, 2.339669183884956], {
    draggable: true
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



var current_position, current_accuracy;

function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    if (current_position) {
        map.removeLayer(current_position);
        map.removeLayer(current_accuracy);
    }

    var radius = e.accuracy / 2;

    current_position = L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    current_accuracy = L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// wrap map.locate in a function    
function locate() {
    console.log(user1._latlng.lng);
    // console.log(user1._latlng.lat);
}

// call locate every 3 seconds... forever
setInterval(locate, 5000);