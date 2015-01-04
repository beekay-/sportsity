// GLOBAL VARIABLES
var map;
var yyc = new google.maps.LatLng(51.0433246, -114.0581015);
var i = 0;
var currentID = 0;
var uniqueID = function () {
	return ++currentID;
}

// TENNIS
var tennisMarkersList = [
    {latLng: [51.104741, -113.972019]},
    {latLng: [51.099080, -113.928958]},
    {latLng: [51.062156, -114.023924]},
    {latLng: [51.076624, -114.137456]},
    {latLng: [51.081116, -114.110141]},
    {latLng: [51.074066, -114.123766]},
    {latLng: [51.096373, -114.137907]}
];
var tennisMarkers = [];
var tennisMarker;

// SOCCER
var soccerMarkersList = [
    {latLng: [51.073052, -114.016813]},
    {latLng: [51.062873, -114.024718]},
    {latLng: [51.061295, -113.969362]},
    {latLng: [51.041775, -113.962297]},
    {latLng: [51.041741, -113.966911]}
];
var soccerMarkers = [];
var soccerMarker;

// BASKETBALL
var basketballMarkersList = [
    {latLng: [51.073606, -114.017433]}
];
var basketballMarkers = [];
var basketballMarker;

// FOOTBALL
var footballMarkersList = [
    {latLng: [51.0453246, -114.0581012]},
    {latLng: [51.099080, -113.928958]}
];
var footballMarkers = [];
var footballMarker;

// BASEBALL
var baseballMarkersList = [
    {latLng: [51.078811, -113.976824]},
    {latLng: [51.047147, -113.963327]},
    {latLng: [51.032684, -113.988411]},
    {latLng: [50.992399, -114.012444]},
    {latLng: [50.982431, -114.057312]}
];
var baseballMarkers = [];
var baseballMarker;

// CRICKET
var cricketMarkersList = [
    {latLng: [51.098098, -113.98309]},
    {latLng: [51.098165, -113.97764]}
];
var cricketMarkers = [];
var cricketMarker;

// CUSTOM MARKERS
var tennisIcon = new google.maps.MarkerImage("img/markers/tennis-icon.png", null, null, null, new google.maps.Size(27,37));
var soccerIcon = new google.maps.MarkerImage("img/markers/soccer-icon.png", null, null, null, new google.maps.Size(27,37));
var footballIcon = new google.maps.MarkerImage("img/markers/football-icon.png", null, null, null, new google.maps.Size(27,37));
var basketballIcon = new google.maps.MarkerImage("img/markers/basketball-icon.png", null, null, null, new google.maps.Size(27,37));
var baseballIcon = new google.maps.MarkerImage("img/markers/baseball-icon.png", null, null, null, new google.maps.Size(27,37));
var cricketIcon = new google.maps.MarkerImage("img/markers/cricket-icon.png", null, null, null, new google.maps.Size(27,37));
var userIcon = new google.maps.MarkerImage("img/markers/user-icon.gif", null, null, null, new google.maps.Size(40,40));

// POP-UP 
var boxText = document.createElement("div");
boxText.innerHTML = 
    '<div class="location-mask">' +
        '<a class="location-route" href="comgooglemaps://?daddr=51.104741,-113.972019&zoom=17&views=satellite,traffic"><img src="img/ui/directions.png" width="32" height="32" alt="Directions"/></a>' +
        '<span class="location-name">Britannia Park</span>' + 
        '<span class="location-courts">4 Courts</span>' +
        '<div class="location-bg"><div class="shadow">' + '<img src="https://maps.googleapis.com/maps/api/staticmap?center=51.104741,-113.972019&zoom=18&size=295x295&maptype=satellite&format=png32" /></div></div>' +
    '</div>' +
    '<span class="likability">Likability</span>' + '<span class="feeling"><span class="happy"></span> <span class="meh"></span> <span class="sad"></span></span>';
var myOptions = {
    content: boxText,
    disableAutoPan: false,
    alignBottom: true,
    pixelOffset: new google.maps.Size(-126, -48),
    zIndex: null,
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane",
    enableEventPropagation: false
};
var infoBubble = new InfoBox(myOptions);

// APP FUNCTIONALITY
function initialize() {
    var mapOptions = {
    zoom: 11,
    minZoom: 11,
    maxZoom: 14,
    center: yyc,
    panControl: false,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var useragent = navigator.userAgent;
        if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
            map.setZoom(11);
        }
    var lineSymbol = {
        path: 'M 0,-2 0,2',
        strokeOpacity: 0.85,
        strokeWeight: 2,
        strokeColor: "#f70202",
        scale: 1
    };
    var lineCoordinates = [new google.maps.LatLng(51.182786,-114.233093),new google.maps.LatLng(51.182786,-113.911743),new google.maps.LatLng(50.950641,-113.911743),new google.maps.LatLng(50.950641,-113.888397),new google.maps.LatLng(50.950641,-113.887711),new google.maps.LatLng(50.928141,-113.887711),new google.maps.LatLng(50.928141,-113.911743),new google.maps.LatLng(50.855809,-113.911743),new google.maps.LatLng(50.855879,-113.997574),new google.maps.LatLng(50.878777,-113.997574),new google.maps.LatLng(50.878777,-114.093704),new google.maps.LatLng(50.890907,-114.093704),new google.maps.LatLng(50.890907,-114.213181),new google.maps.LatLng(50.920783,-114.213181),new google.maps.LatLng(50.920783,-114.139709),new google.maps.LatLng(50.981776,-114.139709),new google.maps.LatLng(50.981776,-114.165115),new google.maps.LatLng(50.996904,-114.165115),new google.maps.LatLng(50.996904,-114.140396),new google.maps.LatLng(51.008138,-114.140396),new google.maps.LatLng(51.008138,-114.236526),new google.maps.LatLng(51.081528,-114.236526),new google.maps.LatLng(51.081528,-114.275665),new google.maps.LatLng(51.104384,-114.275665),new google.maps.LatLng(51.104384,-114.257126),new google.maps.LatLng(51.154370,-114.257126),new google.maps.LatLng(51.154370,-114.233780),new google.maps.LatLng(51.182786,-114.234467)];
    var line = new google.maps.Polyline({
        path: lineCoordinates,
        strokeOpacity: 0,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '10px'
        }],
        map: map
    });
    var zoomControlDiv = document.createElement('div');
    var zoomControlButton = new zoomControl(zoomControlDiv, map);
    zoomControlDiv.index = 1;
    zoomControlDiv.className = "zoom-buttons animated bounceInUp";
    map.controls[google.maps.ControlPosition.BOTTOM].push(zoomControlDiv);
    
    (function($) {
        $('.sportsity').click(function () { $('#modal, .overlay').fadeIn(250); });
        $('.get-started,.overlay').click(function () { $('#modal, .overlay').fadeOut(250); });
        /*var obj = document.createElement("audio"); 
        obj.setAttribute("src", "audio/tap.mp3");
        //$.get(); 

        $(".sound").click(function() { 
            obj.play(); 
        });*/
    }(jQuery));
}

function zoomControl(controlDiv, map) {
    controlDiv.style.padding = '0 0 20px 0';
    var controlWrapper = document.createElement('div');
    controlWrapper.style.backgroundColor = 'white';
    controlWrapper.style.cursor = 'pointer';
    controlWrapper.style.textAlign = 'center';
    controlWrapper.style.width = '65px'; 
    controlWrapper.style.height = '34px';
    controlWrapper.style.boxShadow = "0 8px 12px rgba(0, 0, 1, .5), inset 0 -2px 0px rgba(0, 0, 1, .15)";
    controlWrapper.style.borderRadius = "3px";
    controlWrapper.style.zIndex = '99';
    controlDiv.appendChild(controlWrapper);

    var zoomInButton = document.createElement('div');
    zoomInButton.style.width = '32px'; 
    zoomInButton.style.height = '32px';
    zoomInButton.style.cssFloat = 'right';
    zoomInButton.style.backgroundSize = '32px 32px';
    zoomInButton.style.backgroundImage = 'url("img/ui/zoom-in.png")';
    zoomInButton.style.backgroundRepeat = 'no-repeat';
    zoomInButton.style.borderLeft = '1px';
    zoomInButton.style.borderLeftColor = '#dcdcdc';
    zoomInButton.style.borderLeftStyle = "solid";
    controlWrapper.appendChild(zoomInButton);

    var zoomOutButton = document.createElement('div');
    zoomOutButton.style.width = '32px'; 
    zoomOutButton.style.height = '32px';
    zoomOutButton.style.cssFloat = 'left';
    zoomOutButton.style.backgroundSize = '32px 32px';
    zoomOutButton.style.backgroundImage = 'url("img/ui/zoom-out.png")';
    zoomOutButton.style.backgroundRepeat = 'no-repeat';
    controlWrapper.appendChild(zoomOutButton);

    google.maps.event.addDomListener(zoomInButton, 'click', function() {
        map.setZoom(map.getZoom() + 1);
    });
    google.maps.event.addDomListener(zoomOutButton, 'click', function() {
        map.setZoom(map.getZoom() - 1);
    });  
}

function getUserLocation() {
    if (navigator.geolocation) {
        var userLocationMarker = null;
         navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                if (userLocationMarker) {
                    return;
                }
                map.setCenter(userLocation);
                userLocationMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    icon: userIcon,
                    optimized: false
                });
            },
            function(error) {
                alert("Sorry, something went wrong. Check to see if location services are enabled.", error);
            }, {
                timeout: (5 * 1000),
                maximumAge: (1000 * 60 * 15),
                enableHighAccuracy: false
            }); 
    } else {
        alert("Sorry, geolocation is not supported by your browser.");
    }
}

function getTennisLocations() {
    if (soccerMarkers.length > 0) {
        for (var i = 0; i < soccerMarkersList.length; i++) {
            soccerMarkers[i].setMap(null);
        }
    }
    if (basketballMarkers.length > 0) {
        for (var i = 0; i < basketballMarkersList.length; i++) {
            basketballMarkers[i].setMap(null);
        }
    }
    if (footballMarkers.length > 0) {
        for (var i = 0; i < footballMarkersList.length; i++) {
            footballMarkers[i].setMap(null);
        } 
    }
    if (baseballMarkers.length > 0) {
        for (var i = 0; i < baseballMarkersList.length; i++) {
            baseballMarkers[i].setMap(null);
        }
    }
    if (cricketMarkers.length > 0) {
        for (var i = 0; i < cricketMarkersList.length; i++) {
            cricketMarkers[i].setMap(null);
        }  
    }
    for (var i = 0; i < tennisMarkersList.length; i++) {
        setTimeout(addTennisMarkers.bind(this, i), i * 150);
    }
}

function addTennisMarkers(i) {
    var tennisID = uniqueID();
    var data = tennisMarkersList[i];
    var latLng = new google.maps.LatLng(data.latLng[0], data.latLng[1]);
    var tennisMarker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        icon: tennisIcon,
        title: "Tennis Court #" + tennisID,
        animation: google.maps.Animation.DROP
    });
    tennisMarkers.push(tennisMarker);
    
    var contentString = '<div>Tennis Court #' + tennisID + '</div>';
    
    google.maps.event.addListener(tennisMarker, 'click', function () {
        if (infoBubble) {
            infoBubble.close();   
        }
        //infoWindow.setContent(contentString);
        infoBubble.open(map,tennisMarker); 
    });
    google.maps.event.addListener(map, 'click', function () {
       infoBubble.close(); 
    });
}

function getSoccerLocations() {
    if (tennisMarkers.length > 0) {
        for (var i = 0; i < tennisMarkersList.length; i++) {
            tennisMarkers[i].setMap(null);
        }
    }
    if (basketballMarkers.length > 0) {
        for (var i = 0; i < basketballMarkersList.length; i++) {
            basketballMarkers[i].setMap(null);
        }
    }
    if (footballMarkers.length > 0) {
        for (var i = 0; i < footballMarkersList.length; i++) {
            footballMarkers[i].setMap(null);
        } 
    }
    if (baseballMarkers.length > 0) {
        for (var i = 0; i < baseballMarkersList.length; i++) {
            baseballMarkers[i].setMap(null);
        }
    }
    if (cricketMarkers.length > 0) {
        for (var i = 0; i < cricketMarkersList.length; i++) {
            cricketMarkers[i].setMap(null);
        }  
    }
    for (var i = 0; i < soccerMarkersList.length; i++) {
        setTimeout(addSoccerMarkers.bind(this, i), i * 150);
    }
}

function addSoccerMarkers(i) {
    var data = soccerMarkersList[i];
    var latLng = new google.maps.LatLng(data.latLng[0], data.latLng[1]);
    soccerMarkers.push(new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        icon: soccerIcon,
        title: "Soccer Field",
        animation: google.maps.Animation.DROP
    }));
}

function getBasketballLocations() {
    if (tennisMarkers.length > 0) {
        for (var i = 0; i < tennisMarkersList.length; i++) {
            tennisMarkers[i].setMap(null);
        }
    }
    if (soccerMarkers.length > 0) {
        for (var i = 0; i < soccerMarkersList.length; i++) {
            soccerMarkers[i].setMap(null);
        }  
    }
    if (footballMarkers.length > 0) {
        for (var i = 0; i < footballMarkersList.length; i++) {
            footballMarkers[i].setMap(null);
        } 
    }
    if (baseballMarkers.length > 0) {
        for (var i = 0; i < baseballMarkersList.length; i++) {
            baseballMarkers[i].setMap(null);
        }
    }
    if (cricketMarkers.length > 0) {
        for (var i = 0; i < cricketMarkersList.length; i++) {
            cricketMarkers[i].setMap(null);
        }  
    }
    for (var i = 0; i < basketballMarkersList.length; i++) {
        setTimeout(addBasketballMarkers.bind(this, i), i * 150);
    }
}

function addBasketballMarkers(i) {
    var data = basketballMarkersList[i];
    var latLng = new google.maps.LatLng(data.latLng[0], data.latLng[1]);
    basketballMarkers.push(new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        icon: basketballIcon,
        title: "Basketball Court",
        animation: google.maps.Animation.DROP
    }));
}

function getFootballLocations() {
    if (tennisMarkers.length > 0) {
        for (var i = 0; i < tennisMarkersList.length; i++) {
            tennisMarkers[i].setMap(null);
        }
    }
    if (soccerMarkers.length > 0) {
        for (var i = 0; i < soccerMarkersList.length; i++) {
            soccerMarkers[i].setMap(null);
        }   
    }
    if (basketballMarkers.length > 0) {
        for (var i = 0; i < basketballMarkersList.length; i++) {
            basketballMarkers[i].setMap(null);
        }
    }
    if (baseballMarkers.length > 0) {
        for (var i = 0; i < baseballMarkersList.length; i++) {
            baseballMarkers[i].setMap(null);
        }
    }
    if (cricketMarkers.length > 0) {
        for (var i = 0; i < cricketMarkersList.length; i++) {
            cricketMarkers[i].setMap(null);
        }  
    }
    for (var i = 0; i < footballMarkersList.length; i++) {
        setTimeout(addFootballMarkers.bind(this, i), i * 150);
    }
}

function addFootballMarkers(i) {
    var data = footballMarkersList[i];
    var latLng = new google.maps.LatLng(data.latLng[0], data.latLng[1]);
    footballMarkers.push(new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        icon: footballIcon,
        title: "Football Field",
        animation: google.maps.Animation.DROP
    }));
}

function getBaseballLocations() {
    if (tennisMarkers.length > 0) {
        for (var i = 0; i < tennisMarkersList.length; i++) {
            tennisMarkers[i].setMap(null);
        }
    }
    if (soccerMarkers.length > 0) {
        for (var i = 0; i < soccerMarkersList.length; i++) {
            soccerMarkers[i].setMap(null);
        }   
    }
    if (basketballMarkers.length > 0) {
        for (var i = 0; i < basketballMarkersList.length; i++) {
            basketballMarkers[i].setMap(null);
        }
    }
    if (footballMarkers.length > 0) {
        for (var i = 0; i < footballMarkersList.length; i++) {
            footballMarkers[i].setMap(null);
        }
    }
    if (cricketMarkers.length > 0) {
        for (var i = 0; i < cricketMarkersList.length; i++) {
            cricketMarkers[i].setMap(null);
        }
    }
    for (var i = 0; i < baseballMarkersList.length; i++) {
        setTimeout(addBaseballMarkers.bind(this, i), i * 150);
    }
}

function addBaseballMarkers(i) {
    var data = baseballMarkersList[i];
    var latLng = new google.maps.LatLng(data.latLng[0], data.latLng[1]);
    baseballMarkers.push(new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        icon: baseballIcon,
        title: "Basketball Court",
        animation: google.maps.Animation.DROP
    }));
}

function getCricketLocations() {
    if (tennisMarkers.length > 0) {
        for (var i = 0; i < tennisMarkersList.length; i++) {
            tennisMarkers[i].setMap(null);
        }
    }
    if (soccerMarkers.length > 0) {
        for (var i = 0; i < soccerMarkersList.length; i++) {
            soccerMarkers[i].setMap(null);
        }   
    }
    if (basketballMarkers.length > 0) {
        for (var i = 0; i < basketballMarkersList.length; i++) {
            basketballMarkers[i].setMap(null);
        }
    }
    if (footballMarkers.length > 0) {
        for (var i = 0; i < footballMarkersList.length; i++) {
            footballMarkers[i].setMap(null);
        }
    }
    if (baseballMarkers.length > 0) {
        for (var i = 0; i < baseballMarkersList.length; i++) {
            baseballMarkers[i].setMap(null);
        }
    }
    for (var i = 0; i < cricketMarkersList.length; i++) {
        setTimeout(addCricketMarkers.bind(this, i), i * 150);
    }
}

function addCricketMarkers(i) {
    var data = cricketMarkersList[i];
    var latLng = new google.maps.LatLng(data.latLng[0], data.latLng[1]);
    cricketMarkers.push(new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        icon: cricketIcon,
        title: "Cricket Field",
        animation: google.maps.Animation.DROP
    }));
} 

google.maps.event.addDomListener(window, 'load', initialize);