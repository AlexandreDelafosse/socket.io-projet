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

let user3 = L.marker([48.831235456968775, 2.40970516914324], {
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

let restaurant3 = L.marker([48.85901822720584, 2.42037311292085], {
    icon: restaurantIcon,
    draggable: false
}).addTo(map);


let arrivée = L.marker([48.8232403909458, 2.339669183884956], {
    draggable: true
}).addTo(map);


let userInfo = [{
        user: user1,
        resto: restaurant1,
        distance: 0
    },
    {
        user: user2,
        resto: restaurant2,
        distance: 0
    },
    {
        user: user3,
        resto: restaurant3,
        distance: 0
    }
];

let restoList = [
    restaurant1,
    restaurant2,
    restaurant3
]


/* Lignes entre users et restaurants */

var latlngs1 = Array();
var latlngs2 = Array();
var latlngs3 = Array();

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

latlngs3.push(user3.getLatLng());
latlngs3.push(restaurant3.getLatLng());
var polylineUser3Resto3 = L.polyline(latlngs3, {
    color: 'green'
}).addTo(map);

/* Lignes entre restos et arrivée */

var latlngsarrivalUser1 = Array();
var latlngsarrivalUser2 = Array();
var latlngsarrivalUser3 = Array();

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

latlngsarrivalUser3.push(restaurant3.getLatLng());
latlngsarrivalUser3.push(arrivée.getLatLng());
var polylineResto3Arrivee = L.polyline(latlngsarrivalUser3, {
    color: 'green'
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


console.log(
    "longueur user1: ",
    getDistanceFromLatLonInKm(latlngs1) +
    getDistanceFromLatLonInKm(latlngsarrivalUser1)
);
console.log(
    "longueur user 2: ",
    getDistanceFromLatLonInKm(latlngs2) +
    getDistanceFromLatLonInKm(latlngsarrivalUser2)
);



user1.on("dragstart", () => {

    map.removeLayer(polylineUser1Resto1);

})

user1.on("dragend", () => {
    latlngs1 = [];
    latlngs1.push(user1.getLatLng());
    latlngs1.push(userInfo[0].resto.getLatLng());
    polylineUser1Resto1 = L.polyline(latlngs1, {
        color: 'red'
    }).addTo(map);


    userInfo[0].distance = getDistanceFromLatLonInKm(latlngs1) +
        getDistanceFromLatLonInKm(latlngsarrivalUser1)
    console.log(
        "longueur user1: ", latlngs1
    );
})

user2.on("dragstart", () => {

    map.removeLayer(polylineUser2Resto2);

})

user2.on("dragend", () => {
    latlngs2 = [];
    latlngs2.push(user2.getLatLng());
    latlngs2.push(userInfo[1].resto.getLatLng());
    polylineUser2Resto2 = L.polyline(latlngs2, {
        color: 'blue'
    }).addTo(map);

    userInfo[1].distance =
        getDistanceFromLatLonInKm(latlngs2) +
        getDistanceFromLatLonInKm(latlngsarrivalUser2)
    console.log(
        "longueur user 2: ", userInfo[1].distance
    );
})


user3.on("dragstart", () => {

    map.removeLayer(polylineUser3Resto3);

})

user3.on("dragend", () => {
    latlngs3 = [];
    latlngs3.push(user3.getLatLng());
    latlngs3.push(userInfo[2].resto.getLatLng());
    polylineUser3Resto3 = L.polyline(latlngs3, {
        color: 'green'
    }).addTo(map);

    userInfo[2].distance =
        getDistanceFromLatLonInKm(latlngs3) +
        getDistanceFromLatLonInKm(latlngsarrivalUser3)
    console.log(
        "longueur user 3: ", userInfo[1].distance
    );
})

arrivée.on("dragstart", () => {

    map.removeLayer(polylineResto1Arrivee);
    map.removeLayer(polylineResto2Arrivee);
    map.removeLayer(polylineResto3Arrivee);

})

arrivée.on("dragend", () => {
    updateArrive();
})

function updateArrive() {
    latlngsarrivalUser1 = [];
    latlngsarrivalUser2 = [];
    latlngsarrivalUser3 = [];

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

    latlngsarrivalUser3.push(restaurant3.getLatLng());
    latlngsarrivalUser3.push(arrivée.getLatLng());
    polylineResto3Arrivee = L.polyline(latlngsarrivalUser3, {
        color: 'green'
    }).addTo(map);


    userInfo[0].distance =
        getDistanceFromLatLonInKm(latlngs1) +
        getDistanceFromLatLonInKm(latlngsarrivalUser1)
    userInfo[1].distance =
        getDistanceFromLatLonInKm(latlngs2) +
        getDistanceFromLatLonInKm(latlngsarrivalUser2)

    userInfo[2].distance =
        getDistanceFromLatLonInKm(latlngs3) +
        getDistanceFromLatLonInKm(latlngsarrivalUser3)


    console.log(
        "longueur user1: ", userInfo[0].distance
    );
    console.log(
        "longueur user 2: ", userInfo[1].distance
    );
    console.log(
        "longueur user 3: ", userInfo[2].distance
    );
}

// wrap map.locate in a function    
function getDistanceFromLatLonInKm(latLan) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(latLan[1].lat - latLan[0].lat); // deg2rad below
    var dLon = deg2rad(latLan[1].lng - latLan[0].lng);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(latLan[0].lat)) * Math.cos(deg2rad(latLan[1].lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function changeResto(params) {
    switch (params) {
        case 0:
            userInfo[0].resto = restaurant1;
            updateArrive();
            break;
        case 1:
            userInfo[0].resto = restaurant2;
            updateArrive();
            break;
        case 2:
            userInfo[0].resto = restaurant3;
            updateArrive();
            break;

        default:
            userInfo[0].resto = userInfo[0].resto;
            break;
    }
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

// call locate every 3 seconds... forever
// setInterval(locate, 5000);