// GLOBAL VARIABLES
var map;
var yyc = new google.maps.LatLng(51.0333246, -114.0581015);
var geocoder;
var likes = 1;
var useragent = navigator.userAgent;
var userLocationMarker;
var userLocation;
var directionsDisplay;
directionsService = new google.maps.DirectionsService();
var allowedBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(50.83108908325788, -114.49755462500002),
    new google.maps.LatLng(51.33533507082708, -113.61864837500002)
);
var likabilityNumber;

// CUSTOM MARKERS
var tennisIcon = new google.maps.MarkerImage("img/markers/tennis.png", null, null, null, new google.maps.Size(27,37));
var soccerIcon = new google.maps.MarkerImage("img/markers/soccer.png", null, null, null, new google.maps.Size(27,37));
var footballIcon = new google.maps.MarkerImage("img/markers/football.png", null, null, null, new google.maps.Size(27,37));
var basketballIcon = new google.maps.MarkerImage("img/markers/basketball.png", null, null, null, new google.maps.Size(27,37));
var baseballIcon = new google.maps.MarkerImage("img/markers/baseball.png", null, null, null, new google.maps.Size(27,37));
var cricketIcon = new google.maps.MarkerImage("img/markers/cricket.png", null, null, null, new google.maps.Size(27,37));
var rugbyIcon = new google.maps.MarkerImage("img/markers/rugby.png", null, null, null, new google.maps.Size(27,37));
var volleyballIcon = new google.maps.MarkerImage("img/markers/volleyball.png", null, null, null, new google.maps.Size(27,37));
var fieldHockeyIcon = new google.maps.MarkerImage("img/markers/field-hockey.png", null, null, null, new google.maps.Size(27,37));
var userIcon = new google.maps.MarkerImage("img/markers/user-location.svg", null, null, null, new google.maps.Size(52,52));

function getIconPath(venueType) {
    var icon;
    if (venueType === "soccer") {
        return soccerIcon;
    } else if (venueType === "football") {
        return footballIcon;
    } else if (venueType === "basketball") {
        return basketballIcon;
    } else if (venueType === "baseball") {
        return baseballIcon;
    } else if (venueType === "cricket") {
        return cricketIcon;
    } else if (venueType === "tennis") {
        return tennisIcon;
    } else if (venueType === "volleyball") {
        return volleyballIcon;
    } else if (venueType === "rugby") {
        return rugbyIcon;
    } else if (venueType === "fieldhockey") {
        return fieldHockeyIcon;
    }
}

function getIcon(user){
    if (user == 'user') {
        return new google.maps.MarkerImage("img/markers/user-location.svg", null, null, null, new google.maps.Size(64,64));
    }
}    

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        hideRouteList: true,
        preserveViewport: true,
        polylineOptions: {
            strokeColor: '#e8392f',
            strokeOpacity: 0.75,
            strokeWeight: 3.5
        }
    });
    
    var mapOptions = {
        zoom: 11,
        minZoom: 10,
        maxZoom: 16,
        center: yyc,
        overviewMapControl: true,
        disableDefaultUI: true,
        styles: [{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"saturation":-100},{"lightness":99}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#919191"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ede9dc"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#D2E4C8"}]},{"featureType":"poi","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#f0ede5"}]},{"featureType":"poi.attraction","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon"},{"featureType":"poi.sports_complex", "elementType":"labels.icon", "stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#D2E2C7"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"weight":0.6},{"color":"#f29b05"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f2c805"}]}]
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    
    var zoomControlDiv = document.createElement('div');
    var zoomControlButton = new zoomControl(zoomControlDiv, map);
    zoomControlDiv.index = 1;
    zoomControlDiv.className = "zoom-buttons animated bounceInUp";
    map.controls[google.maps.ControlPosition.BOTTOM].push(zoomControlDiv);
    
    geocoder = new google.maps.Geocoder();
    
    var lastValidCenter = map.getCenter();
    google.maps.event.addListener(map, 'center_changed', function() {
        if (allowedBounds.contains(map.getCenter())) {
            lastValidCenter = map.getCenter();
            return;
        }
        map.panTo(lastValidCenter);
    });
}

function zoomControl(controlDiv, map) {
    controlDiv.style.padding = '0 0 18px 0';
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
                    icon: getIcon('user'),
                    optimized: false
                });
                google.maps.event.addListener(userLocationMarker, 'click', function() {
                    map.setZoom(15);
                });
            },
            function(error) {
                alert("Sorry, something went wrong. Check to see if location services are enabled.", error);
            }, {
                timeout: 10000,
                maximumAge: 600000,
                enableHighAccuracy: true
            }); 
    } else {
        alert("Sorry, geolocation is not supported by your browser.");
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, 'resize', function() {
    google.maps.event.trigger(map, 'resize');
    map.setCenter(yyc); 
});

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

(function($) {
    $('.sportsity').click(function () { $('#modal, .overlay').fadeIn(200); $('#modal').addClass('animated bounceIn'); });
    $('.get-started,.overlay').click(function () { $('#modal, .overlay').fadeOut(200); $('#modal').removeClass('animated bounceIn'); });
    document.body.addEventListener('touchmove',function(e){
        e.preventDefault();
    });
}(jQuery));