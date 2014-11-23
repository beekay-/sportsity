var map;
function initialize() {
  var mapOptions = {
    zoom: 12,
	minZoom: 11,
    center: new google.maps.LatLng(51.0453246, -114.0581012),
	panControl: false,
	mapTypeControl: false,
    /*mapTypeControlOptions: {
		style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		position: google.maps.ControlPosition.BOTTOM_LEFT
    },*/
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
	  map.setZoom(10);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

function modalUI() {
	var options = { autoOpen: false, modal: true, width: '80%', height: 'auto', resizable: false, closeOnEscape: true };
    $('.open-about').click(function() { $('#about').dialog(options).dialog('open'); });
	$('.open-help').click(function() { $('#help').dialog(options).dialog('open'); });
}