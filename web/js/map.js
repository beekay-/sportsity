// Global Variables
var map;
// Tennis
var tennisMarkersList = [
    {latLng: [51.104875, -113.972034]},
    {latLng: [51.099080, -113.928958]},
    {latLng: [51.062156, -114.023924]},
    {latLng: [51.076624, -114.137456]},
    {latLng: [51.081116, -114.110141]},
    {latLng: [51.074066, -114.123766]},
    {latLng: [51.096373, -114.137907]}
];
var tennisMarkers = [];
var tennisMarker;
// Soccer
var soccerMarkersList = [
    {latLng: [51.073052, -114.016813]},
    {latLng: [51.062873, -114.024718]},
    {latLng: [51.061295, -113.969362]},
    {latLng: [51.041775, -113.962297]},
    {latLng: [51.041741, -113.966911]},
];
var soccerMarkers = [];
var soccerMarker;
// Basketball
var basketballMarkersList = [
    {latLng: [51.073606, -114.017433]}
];
var basketballMarkers = [];
var basketballMarker;
// Football
var footballMarkersList = [
    {latLng: [51.0453246, -114.0581012]},
    {latLng: [51.099080, -113.928958]}
];
var footballMarkers = [];
var footballMarker;
// Baseball
var baseballMarkersList = [
    {latLng: [51.078811, -113.976824]},
    {latLng: [51.047147, -113.963327]},
    {latLng: [51.032684, -113.988411]},
    {latLng: [50.992399, -114.012444]},
    {latLng: [50.982431, -114.057312]}
];
var baseballMarkers = [];
var baseballMarker;
// Cricket
var cricketMarkersList = [
    {latLng: [51.098098, -113.98309]},
    {latLng: [51.098165, -113.97764]}
];
var cricketMarkers = [];
var cricketMarker;

// App Functionality
function initialize() {
    var mapOptions = {
    zoom: 11,
    minZoom: 10,
    center: new google.maps.LatLng(51.0453246, -114.0581015),
    panControl: false,
    mapTypeControl: false,
    zoomControl: false,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    streetViewControl: false
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var useragent = navigator.userAgent;
        if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
            map.setZoom(11);
        }
    google.maps.event.addDomListener(window, 'load', initialize);
}

function modalUIOpen() {
	var options = {show: {effect: "bounce", duration: 1000}, modal: true, width: 320, minHeight: 255, height: 'auto', resizable: false, closeOnEscape: true, hide: { effect: "fade", duration: 200 }, open: function() {jQuery('.ui-widget-overlay').bind('click', function() { jQuery('#about').dialog('close');})} };
    $('.open-about').click(function() { $('#about').dialog(options).dialog('open'); });
}

function modalUIClose() {
    $('#about').dialog('close');
}

function getUserLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            map.setZoom(14);
            map.setCenter(userLocation);
        }); 
    } else {
        alert("Sorry, geolocation not supported by your browser.");
    }
}

function getTennisLocations() {
    for (var i = 0 in tennisMarkersList) {
        var tennisMarkers = tennisMarkersList[i];
        var latLng = new google.maps.LatLng(tennisMarkers.latLng[0], tennisMarkers.latLng[1]);
        var tennisMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "Tennis Court",
            animation: google.maps.Animation.DROP
        });
    }
    tennisMarker.setMap(map);
}

function getSoccerLocations() {
    for (var i = 0 in soccerMarkersList) {
        var soccerMarkers = soccerMarkersList[i];
        var latLng = new google.maps.LatLng(soccerMarkers.latLng[0], soccerMarkers.latLng[1]);
        var soccerMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "Soccer Field",
            animation: google.maps.Animation.DROP
        });
    }
    soccerMarker.setMap(map);
}

function getBasketballLocations() {
    for (var i = 0 in basketballMarkersList) {
        var basketballMarkers = basketballMarkersList[i];
        var latLng = new google.maps.LatLng(basketballMarkers.latLng[0], basketballMarkers.latLng[1]);
        var basketballMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "Basketball Court",
            animation: google.maps.Animation.DROP
        });
    }
    basketballMarker.setMap(map);
}

function getFootballLocations() {
    for (var i = 0 in footballMarkersList) {
        var footballMarkers = footballMarkersList[i];
        var latLng = new google.maps.LatLng(footballMarkers.latLng[0], footballMarkers.latLng[1]);
        var footballMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "Football Field",
            animation: google.maps.Animation.DROP
        });
    }
    footballMarker.setMap(map);
}

function getBaseballLocations() {
    for (var i = 0 in baseballMarkersList) {
        var baseballMarkers = baseballMarkersList[i];
        var latLng = new google.maps.LatLng(baseballMarkers.latLng[0], baseballMarkers.latLng[1]);
        var baseballMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "baseball Field",
            animation: google.maps.Animation.DROP
        });
    }
    baseballMarker.setMap(map);
}

function getCricketLocations() {
    for (var i = 0 in cricketMarkersList) {
        var cricketMarkers = cricketMarkersList[i];
        var latLng = new google.maps.LatLng(cricketMarkers.latLng[0], cricketMarkers.latLng[1]);
        var cricketMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "cricket Field",
            animation: google.maps.Animation.DROP
        });
    }
    cricketMarker.setMap(map);
}