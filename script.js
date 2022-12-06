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
    id:"testetes"
    

}).addTo(map);

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


/* Lignes entre users et restaurants */

var latlngs1 = Array();
var latlngs2 = Array();


latlngs1.push(user1.getLatLng());
latlngs1.push(restaurant1.getLatLng());
var polyline = L.polyline(latlngs1, {color: 'red'}).addTo(map);

latlngs2.push(user2.getLatLng());
latlngs2.push(restaurant2.getLatLng());
var polyline = L.polyline(latlngs2, {color: 'blue'}).addTo(map);

/* Lignes entre restos et arrivée */

var latlngsarrival = Array();

latlngsarrival.push(restaurant1.getLatLng());
latlngsarrival.push(arrivée.getLatLng());
var polyline = L.polyline(latlngsarrival, {color: 'green'}).addTo(map);

latlngsarrival.push(restaurant2.getLatLng());
latlngsarrival.push(arrivée.getLatLng());
var polyline = L.polyline(latlngsarrival, {color: 'green'}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

