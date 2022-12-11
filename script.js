let socket2 = io("http://localhost:3000/");

let map = L.map('map').setView([48.866964576087014, 2.3514963324831593], 12);

let manIcon = L.icon({
    iconUrl: 'userIcon.png',
    iconSize: [30, 30], // size of the icon
});

let mcdoIcon = L.icon({
    iconUrl: 'mcdo.png',
    iconSize: [30, 30], // size of the icon
});
let kfcIcon = L.icon({
    iconUrl: 'kfc.png',
    iconSize: [30, 30], // size of the icon
});
let bkIcon = L.icon({
    iconUrl: 'bk.png',
    iconSize: [30, 30], // size of the icon
});

/* create restaurant */
let restaurant1 = L.marker([48.84901822720585, 2.312037311292086], {
    icon: mcdoIcon,
    draggable: false
}).addTo(map);

let restaurant2 = L.marker([48.88221774694522, 2.3020809523222576], {
    icon: kfcIcon,
    draggable: false
}).addTo(map);

let restaurant3 = L.marker([48.85901822720584, 2.42037311292085], {
    icon: bkIcon,
    draggable: false
}).addTo(map);

/* create finishing line */
let arrivée = L.marker([48.8232403909458, 2.339669183884956], {
    draggable: true
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(latLan[1].lat - latLan[0].lat); // deg2rad below
    let dLon = deg2rad(latLan[1].lng - latLan[0].lng);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(latLan[0].lat)) * Math.cos(deg2rad(latLan[1].lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
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

function timeConvert(n, magasin, username) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);

    console.log(magasin);
    let heurededepartelement = document.getElementById('heurededepart');
    let spanHeure = document.createElement("span")
    spanHeure.style.fontWeight = "bold";
    spanHeure.innerHTML = magasin.split('.')[0];
    let spanMinutes = document.createElement("span")
    spanMinutes.style.fontWeight = "bold";
    spanMinutes.innerHTML = (60 - rminutes);

    heurededepartelement.innerHTML = "Pour arriver à 13 h, " + username + " doit partir à : " 
    heurededepartelement.append(spanHeure);
    heurededepartelement.innerHTML = heurededepartelement.innerHTML + " heure et ";
    heurededepartelement.append(spanMinutes);
    heurededepartelement.innerHTML = heurededepartelement.innerHTML + " minute(s).";
}

function createUser(newInfo) {

    newLat = Math.random() * (48.90196633008333 - 48.81748960529015) + 48.81748960529015;
    newLng = Math.random() * (2.4282922124201405 - 2.2858681569280086) + 2.2858681569280086;
    let r = Math.floor(Math.random() * 200);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let newUserInfo = {
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

    let latlngsNew = Array();
    latlngsNew.push(newUserInfo.user.getLatLng());
    latlngsNew.push(newUserInfo.resto.getLatLng());

    // newUserInfo.polyline = polylineNewUserResto;

    let latlngArrivalNewUser = Array();
    latlngArrivalNewUser.push(newUserInfo.resto.getLatLng());
    latlngArrivalNewUser.push(arrivée.getLatLng());


    newUserInfo.latlng = latlngsNew;
    newUserInfo.latlngArrivee = latlngArrivalNewUser;

    newUserInfo.distance = getDistanceFromLatLonInKm(newUserInfo.latlng) +
        getDistanceFromLatLonInKm(newUserInfo.latlngArrivee);


    let stringInfo = {
        name: newUserInfo.name,
        resto: restoList.find(resto => resto.name == newInfo.resto).name,
        distance: newUserInfo.distance,
        latlng: newUserInfo.latlng,
        latlngArrivee: newUserInfo.latlngArrivee,
        color: newUserInfo.color,
    }

    let userdistance = newUserInfo.distance

    userdistance = userdistance.toFixed(1)

    let speed = 5;

    let time = (userdistance / speed) * 60;

    let heurededepart = (780 - time) / 60;

    let heurededepart2 = '' + heurededepart;
    heurededepart2.split('.')


    let minutes = (heurededepart2[1] / 100) * 60;

    let debutmsg = document.getElementById('test')
    let suitemsg = document.createElement('span')
    suitemsg.id = 'heurededepart';
    debutmsg.append(suitemsg);

    timeConvert(time, heurededepart2, newUserInfo.name);

    return stringInfo;
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

        let userdistance = user.distance

        userdistance = userdistance.toFixed(1)

        let speed = 5;

        let time = (userdistance / speed) * 60;

        let heurededepart = (780 - time) / 60;

        let heurededepart2 = '' + heurededepart;
        heurededepart2.split('.')


        let minutes = (heurededepart2[1] / 100) * 60;

        timeConvert(time, heurededepart2, user.name);

    });



}

function onDragUser() {
    for (let index = 0; index < userInfo.length; index++) {
        onDragOneUser(userInfo[index], index)
    }

}
onDragUser();

function addUserToMap(user) {

    // userInfo.forEach(theUser => {
    if (userInfo.findIndex(theUser => theUser.name === user.name) !== -1) {
        let idFound = userInfo.findIndex(theUser => theUser.name === user.name);
        map.removeLayer(userInfo[idFound].polyline);
        map.removeLayer(userInfo[idFound].polylineArrivee);
        map.removeLayer(userInfo[idFound].user);

    }

    let newUserInfo = {
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

    let polylineNewUserResto = L.polyline(user.latlng, {
        color: user.color
    }).addTo(map);

    let polylineRestoArrivee = L.polyline(user.latlngArrivee, {
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