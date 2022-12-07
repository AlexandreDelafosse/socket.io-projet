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

let userInfo = [{
        name: "theodore",
        user: user1,
        resto: restaurant1,
        distance: 0,
        polyline: polylineUser1Resto1,
        polylineArrivee: polylineResto1Arrivee,
        latlng: latlngs1,
        latlngArrivee: latlngsarrivalUser1,
        color: "red"
    },
    {
        name: "alex",
        user: user2,
        resto: restaurant2,
        distance: 0,

        polyline: polylineUser2Resto2,
        polylineArrivee: polylineResto2Arrivee,
        latlng: latlngs2,
        latlngArrivee: latlngsarrivalUser2,
        color: "blue"
    },
    {
        name: "jean",
        user: user3,
        resto: restaurant3,
        distance: 0,
        polyline: polylineUser3Resto3,
        polylineArrivee: polylineResto3Arrivee,
        latlng: latlngs3,
        latlngArrivee: latlngsarrivalUser3,
        color: "green"
    }
];

let restoList = [
    restaurant1,
    restaurant2,
    restaurant3
]

arrivée.on("dragstart", () => {
    console.log(userInfo.length);

    userInfo.forEach(theUser => {
        map.removeLayer(theUser.polylineArrivee);
    });

    console.log(arrivée.getLatLng());

})

arrivée.on("dragend", () => {
    updateArrive();
    console.log(arrivée.getLatLng());
})

function updateArrive() {

    userInfo.forEach(theUser => {

        theUser.latlngArrivee = [];

        theUser.latlngArrivee.push(theUser.resto.getLatLng());
        theUser.latlngArrivee.push(arrivée.getLatLng());
        theUser.polylineArrivee = L.polyline(theUser.latlngArrivee, {
            color: theUser.color
        }).addTo(map);

        console.log(theUser.name);
        console.log(theUser.latlngArrivee);
        theUser.distance =
            getDistanceFromLatLonInKm(theUser.latlng) +
            getDistanceFromLatLonInKm(theUser.latlngArrivee);

        console.log(
            "longueur user: ", theUser.distance
        );

    });

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

    userInfo[0].resto = restoList[params];

    map.removeLayer(userInfo[0].polyline);
    map.removeLayer(userInfo[0].polylineArrivee);

    userInfo[0].latlng = [];
    userInfo[0].latlngArrivee = [];
    userInfo[0].latlng.push(userInfo[0].user.getLatLng());
    userInfo[0].latlng.push(userInfo[0].resto.getLatLng());

    userInfo[0].latlngArrivee.push(userInfo[0].resto.getLatLng());
    userInfo[0].latlngArrivee.push(arrivée.getLatLng());

    userInfo[0].polyline = L.polyline(userInfo[0].latlng, {
        color: userInfo[0].color
    }).addTo(map);
    userInfo[0].polylineArrivee = L.polyline(userInfo[0].latlngArrivee, {
        color: userInfo[0].color
    }).addTo(map);
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function onDragUser() {
    userInfo.forEach(theUser => {
        console.log(userInfo.length);

        theUser.user.on("dragstart", () => {
            map.removeLayer(theUser.polyline);
        });

        theUser.user.on("dragend", () => {
            theUser.latlng = [];

            theUser.latlng.push(theUser.user.getLatLng());
            theUser.latlng.push(theUser.resto.getLatLng());
            theUser.polyline = L.polyline(theUser.latlng, {
                color: theUser.color
            }).addTo(map);


            theUser.distance = getDistanceFromLatLonInKm(theUser.latlng) +
                getDistanceFromLatLonInKm(theUser.latlngArrivee)
        })
    });
}
onDragUser();

function createUser() {

    newLat = Math.random() * (48.90196633008333 - 48.81748960529015) + 48.81748960529015;
    newLng = Math.random() * (2.4282922124201405 - 2.2858681569280086) + 2.2858681569280086;
    var newUserInfo = {
        name: "ophelia",
        user: L.marker([newLat, newLng], {
            icon: manIcon,
            draggable: true

        }).addTo(map),

        resto: restoList[0],
        distance: 0,
        polyline: null,
        latlng: null,
        latlngArrivee: null,
        polylineArrivee: null,
        color: "yellow"
    };

    var latlngsNew = Array();
    latlngsNew.push(newUserInfo.user.getLatLng());
    latlngsNew.push(newUserInfo.resto.getLatLng());
    var polylineNewUserResto = L.polyline(latlngsNew, {
        color: newUserInfo.color
    }).addTo(map);

    newUserInfo.polyline = polylineNewUserResto;

    var latlngArrivalNewUser = Array();
    latlngArrivalNewUser.push(newUserInfo.resto.getLatLng());
    
    console.log(arrivée.getLatLng());
    latlngArrivalNewUser.push(arrivée.getLatLng());
    var polylineRestoArrivee = L.polyline(latlngArrivalNewUser, {
        color: newUserInfo.color
    }).addTo(map);

    newUserInfo.latlng = latlngsNew;
    newUserInfo.latlngArrivee = latlngArrivalNewUser;
    newUserInfo.polylineArrivee = polylineRestoArrivee;

    userInfo.push(newUserInfo);

    console.log(userInfo.length);

    onDragUser();
}



// Get the modal
var modal = document.getElementById("myModal");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}