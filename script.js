let socket2 = io("http://localhost:3000/");

let map = L.map('map').setView([48.866964576087014, 2.3514963324831593], 12);

let manIcon = L.icon({
    iconUrl: 'redstonetorch.gif',
    iconSize: [45, 75], // size of the icon
});

let restaurantIcon = L.icon({
    iconUrl: 'restos.jpg',
    iconSize: [45, 45], // size of the icon

});

/* create user */
let user1 = L.marker([48.866964576087014, 2.3514963324831593], {
    icon: manIcon,
    draggable: true,
    id: "testetes"


});

let user2 = L.marker([48.841235456968775, 2.40570516914324], {
    icon: manIcon,
    draggable: true

});

let user3 = L.marker([48.831235456968775, 2.40970516914324], {
    icon: manIcon,
    draggable: true

});

/* create restaurant */
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

/* create finishing line */
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
});

latlngs2.push(user2.getLatLng());
latlngs2.push(restaurant2.getLatLng());
var polylineUser2Resto2 = L.polyline(latlngs2, {
    color: 'blue'
});

latlngs3.push(user3.getLatLng());
latlngs3.push(restaurant3.getLatLng());
var polylineUser3Resto3 = L.polyline(latlngs3, {
    color: 'green'
});

/* Lignes entre restos et arrivée */

var latlngsarrivalUser1 = Array();
var latlngsarrivalUser2 = Array();
var latlngsarrivalUser3 = Array();

latlngsarrivalUser1.push(restaurant1.getLatLng());
latlngsarrivalUser1.push(arrivée.getLatLng());
var polylineResto1Arrivee = L.polyline(latlngsarrivalUser1, {
    color: 'red'
});

latlngsarrivalUser2.push(restaurant2.getLatLng());
latlngsarrivalUser2.push(arrivée.getLatLng());
var polylineResto2Arrivee = L.polyline(latlngsarrivalUser2, {
    color: 'blue'
});

latlngsarrivalUser3.push(restaurant3.getLatLng());
latlngsarrivalUser3.push(arrivée.getLatLng());
var polylineResto3Arrivee = L.polyline(latlngsarrivalUser3, {
    color: 'green'
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// let userInfo = [{
//         name: "theodore",
//         user: user1,
//         resto: restaurant1,
//         distance: 0,
//         polyline: polylineUser1Resto1,
//         polylineArrivee: polylineResto1Arrivee,
//         latlng: latlngs1,
//         latlngArrivee: latlngsarrivalUser1,
//         color: "red"
//     },
//     {
//         name: "alex",
//         user: user2,
//         resto: restaurant2,
//         distance: 0,

//         polyline: polylineUser2Resto2,
//         polylineArrivee: polylineResto2Arrivee,
//         latlng: latlngs2,
//         latlngArrivee: latlngsarrivalUser2,
//         color: "blue"
//     },
//     {
//         name: "jean",
//         user: user3,
//         resto: restaurant3,
//         distance: 0,
//         polyline: polylineUser3Resto3,
//         polylineArrivee: polylineResto3Arrivee,
//         latlng: latlngs3,
//         latlngArrivee: latlngsarrivalUser3,
//         color: "green"
//     }
// ];

let userInfo = [];

let restoList = [{
        name: "MCdo",
        resto: restaurant1
    },
    {
        name: "KFC",
        resto: restaurant2
    },
    {
        name: "BK",
        resto: restaurant3
    },
]

// let test = {
//     "lat": 48.86448891012799,
//     "lng": 2.3445476751280174
// }

// while (test.lat < 48.87) {
//     test.lat+= 0.000000000001;
//     arrivée._latlng.lat = test.lat;
// }

arrivée.on("dragstart", () => {
    userInfo.forEach(theUser => {
        map.removeLayer(theUser.polylineArrivee);
    });


})

arrivée.on("dragend", () => {
    updateArrive();
    botMsg = "Quelqu'un a bougé l'arrivé!"
    socket.emit('chatBot', botMsg);
})

function updateArrive() {

    userInfo.forEach((theUser, theIndex) => {

        theUser.latlngArrivee = [];

        theUser.latlngArrivee.push(theUser.resto.getLatLng());
        theUser.latlngArrivee.push(arrivée.getLatLng());
        theUser.polylineArrivee = L.polyline(theUser.latlngArrivee, {
            color: theUser.color
        });

        theUser.distance =
            getDistanceFromLatLonInKm(theUser.latlng) +
            getDistanceFromLatLonInKm(theUser.latlngArrivee);

        console.log(
            "longueur user: ", theUser.distance
        );

        let stringInfo = [{
            name: theUser.name,
            // resto: user.resto,
            distance: theUser.distance,
            latlng: theUser.latlng,
            latlngArrivee: theUser.latlngArrivee,
            color: theUser.color,
        }, theIndex];

        socket2.emit("changeInfoArrivee", stringInfo);
        socket2.emit("changeInfoUser", stringInfo);
    });


}

socket2.on("showArrivee", (pointArrivee) => {
    map.removeLayer(arrivée);
    arrivée._latlng.lat = pointArrivee.latlngArrivee.lat;
    arrivée._latlng.lng = pointArrivee.latlngArrivee.lng;
    arrivée.addTo(map);

    userInfo.forEach(theUser => {
        map.removeLayer(theUser.polylineArrivee)
        theUser.polylineArrivee.addTo(map);
    })
})

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

function onDragOneUser(user, theId) {

    user.user.on("dragstart", () => {

        console.log(map.removeLayer(user.polyline));
        map.removeLayer(user.polyline);

    });

    user.user.on("dragend", () => {
        user.latlng = [];

        user.latlng.push(user.user.getLatLng());
        user.latlng.push(user.resto.getLatLng());
        user.polyline = L.polyline(user.latlng, {
            color: user.color
        });

        user.distance = getDistanceFromLatLonInKm(user.latlng) +
            getDistanceFromLatLonInKm(user.latlngArrivee);


        let stringInfo = [{
            name: user.name,
            // resto: user.resto,
            distance: user.distance,
            latlng: user.latlng,
            latlngArrivee: user.latlngArrivee,
            color: user.color,
        }, theId];

        socket2.emit("changeInfoUser", stringInfo)
    });
}

function onDragUser() {
    for (let index = 0; index < userInfo.length; index++) {
        onDragOneUser(userInfo[index], index)
    }

}
onDragUser();


function createUser(newInfo) {

    newLat = Math.random() * (48.90196633008333 - 48.81748960529015) + 48.81748960529015;
    newLng = Math.random() * (2.4282922124201405 - 2.2858681569280086) + 2.2858681569280086;


    var r = Math.floor(Math.random() * 200);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);

    // // test
    // let rnd = Math.floor(Math.random() * 2);
    // switch (rnd) {
    //     case 0:
    //         r = 255;
    //         g = 0;
    //         b = 0
    //         break;
    //     case 1:
    //         r = 0;
    //         g = 0;
    //         b = 255;
    //         break;
    //     case 1:
    //         r = 0;
    //         g = 255;
    //         b = 0;
    //         break;

    //     default:
    //         r = 255;
    //         g = 0;
    //         b = 0
    //         break;
    // }
    // // fin test 


    var newUserInfo = {
        name: newInfo.name,
        user: L.marker([newLat, newLng], {
            icon: manIcon,
            draggable: true

        }),

        resto: restoList.find(resto => resto.name == newInfo.resto).resto,
        distance: 0,
        polyline: null,
        latlng: null,
        latlngArrivee: null,
        polylineArrivee: null,
        color: "rgb(" + r + " ," + g + "," + b + ")"
    };

    var latlngsNew = Array();
    latlngsNew.push(newUserInfo.user.getLatLng());
    latlngsNew.push(newUserInfo.resto.getLatLng());

    // newUserInfo.polyline = polylineNewUserResto;

    var latlngArrivalNewUser = Array();
    latlngArrivalNewUser.push(newUserInfo.resto.getLatLng());
    latlngArrivalNewUser.push(arrivée.getLatLng());


    newUserInfo.latlng = latlngsNew;
    newUserInfo.latlngArrivee = latlngArrivalNewUser;

    let stringInfo = {
        name: newUserInfo.name,
        resto: restoList.find(resto => resto.name == newInfo.resto).name,
        distance: newUserInfo.distance,
        latlng: newUserInfo.latlng,
        latlngArrivee: newUserInfo.latlngArrivee,
        color: newUserInfo.color,
    }
    return stringInfo;
}


function addUserToMap(user) {

    // userInfo.forEach(theUser => {
    if (userInfo.findIndex(theUser => theUser.name === user.name) !== -1) {
        let idFound = userInfo.findIndex(theUser => theUser.name === user.name);
        map.removeLayer(userInfo[idFound].polyline);
        map.removeLayer(userInfo[idFound].polylineArrivee);
        map.removeLayer(userInfo[idFound].user);

    }

    var newUserInfo = {
        name: user.name,
        user: L.marker([user.latlng[0].lat, user.latlng[0].lng], {
            icon: manIcon,
            draggable: true

        }).addTo(map),

        resto: restoList.find(resto => resto.name == user.resto).resto,
        distance: user.distance,
        polyline: null,
        latlng: user.latlng,
        latlngArrivee: user.latlngArrivee,
        polylineArrivee: null,
        color: user.color
    };

    var polylineNewUserResto = L.polyline(user.latlng, {
        color: user.color
    }).addTo(map);

    var polylineRestoArrivee = L.polyline(user.latlngArrivee, {
        color: user.color
    }).addTo(map);

    newUserInfo.polyline = polylineNewUserResto;
    newUserInfo.polylineArrivee = polylineRestoArrivee;


    if (userInfo.findIndex(theUser => theUser.name == user.name) < 0) {
        userInfo.push(newUserInfo);

    } else {
        let idFound = userInfo.findIndex(theUser => theUser.name == user.name);
        userInfo[idFound] = newUserInfo;
    }

    onDragUser();
}

// ////////




socket2.on("moveUser", () => {

})

socket2.on("showUsers", (allServerUsers) => {
    // console.log("allServerUsers", allServerUsers);

    allServerUsers.forEach(theUser => {
        addUserToMap(theUser);

    });
});

