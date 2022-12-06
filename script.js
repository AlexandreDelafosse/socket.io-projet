let map = L.map('map').setView([48.866964576087014, 2.3514963324831593], 12);

let manIcon = L.icon({
    iconUrl: 'redstonetorch.gif',
    iconSize: [45, 75], // size of the icon
});

let restaurantIcon = L.icon({
    iconUrl: 'restos.jpg',
    iconSize: [45, 45], // size of the icon

});

let user1 = L.marker([48.866964576087014, 2.3514963324831593], {
    icon: manIcon,
    draggable: true,
    id: "testetes"


}).addTo(map);


let user2 = L.marker([48.841235456968775, 2.40570516914324], {
    icon: manIcon,
    draggable: true

}).addTo(map);


let restaurant1 = L.marker([48.84901822720585, 2.312037311292086], {
    icon: restaurantIcon,
    draggable: false
}).addTo(map);

let restaurant2 = L.marker([48.88221774694522, 2.3020809523222576], {
    icon: restaurantIcon,
    draggable: false
}).addTo(map);


let arrivée = L.marker([48.8232403909458, 2.339669183884956], {
    draggable: true
}).addTo(map);


/* Lignes entre users et restaurants */

var latlngs1 = Array();
var latlngs2 = Array();

latlngs1.push(user1.getLatLng());
latlngs1.push(restaurant1.getLatLng());
var polylineUser1Resto1 = L.polyline(latlngs1, {
    color: 'red'
}).addTo(map);

latlngs2.push(user2.getLatLng());
latlngs2.push(restaurant2.getLatLng());
var polylineUser2Resto2 = L.polyline(latlngs2, {
    color: 'blue'
}).addTo(map);

/* Lignes entre restos et arrivée */

var latlngsarrivalUser1 = Array();
var latlngsarrivalUser2 = Array();

latlngsarrivalUser1.push(restaurant1.getLatLng());
latlngsarrivalUser1.push(arrivée.getLatLng());
var polylineResto1Arrivee = L.polyline(latlngsarrivalUser1, {
    color: 'red'
}).addTo(map);

latlngsarrivalUser2.push(restaurant2.getLatLng());
latlngsarrivalUser2.push(arrivée.getLatLng());
var polylineResto2Arrivee = L.polyline(latlngsarrivalUser2, {
    color: 'blue'
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

user1.on("dragstart", () => {

    map.removeLayer(polylineUser1Resto1);

})

user1.on("dragend", () => {
    latlngs1 = [];
    latlngs1.push(user1.getLatLng());
    latlngs1.push(restaurant1.getLatLng());
    polylineUser1Resto1 = L.polyline(latlngs1, {
        color: 'red'
    }).addTo(map);
})

user2.on("dragstart", () => {

    map.removeLayer(polylineUser2Resto2);

})

user2.on("dragend", () => {
    latlngs2 = [];
    latlngs2.push(user2.getLatLng());
    latlngs2.push(restaurant2.getLatLng());
    polylineUser2Resto2 = L.polyline(latlngs2, {
        color: 'blue'
    }).addTo(map);
})

arrivée.on("dragstart", () => {

    map.removeLayer(polylineResto1Arrivee);
    map.removeLayer(polylineResto2Arrivee);

})

arrivée.on("dragend", () => {
    latlngsarrivalUser1 = [];
    latlngsarrivalUser2 = [];

    latlngsarrivalUser1.push(restaurant1.getLatLng());
    latlngsarrivalUser1.push(arrivée.getLatLng());
    polylineResto1Arrivee = L.polyline(latlngsarrivalUser1, {
        color: 'red'
    }).addTo(map);

    latlngsarrivalUser2.push(restaurant2.getLatLng());
    latlngsarrivalUser2.push(arrivée.getLatLng());
    polylineResto2Arrivee = L.polyline(latlngsarrivalUser2, {
        color: 'blue'
    }).addTo(map);
})

// wrap map.locate in a function    
function locate() {
    console.log(user1._latlng.lng);
    // console.log(user1._latlng.lat);
}

// call locate every 3 seconds... forever
// setInterval(locate, 5000);