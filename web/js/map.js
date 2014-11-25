var map;

function initialize() {
    var mapOptions = {
    zoom: 12,
    minZoom: 11,
    center: new google.maps.LatLng(51.0453246, -114.0581012),
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
    var options = {show: {effect: "bounce", duration: 1000}, modal: true, width: 275, minHeight: 255, height: 'auto', resizable: false, closeOnEscape: true, hide: { effect: "fade", duration: 200 }, open: function() {jQuery('.ui-widget-overlay').bind('click', function() { jQuery('#about').dialog('close');})} };
    var optionsHelp = {show: {effect: "bounce", duration: 1000}, modal: true, width: '275', height: '275', resizable: false, closeOnEscape: true, open: function() {jQuery('.ui-widget-overlay').bind('click', function() { jQuery('#help').dialog('close');})} };
    $('.open-about').click(function() { $('#about').dialog(options).dialog('open'); });
    $('.open-help').click(function() { $('#help').dialog(optionsHelp).dialog('open'); });
}

function modalUIClose() {
    $('#about').dialog('close');   
}