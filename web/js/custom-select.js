var venues = [];
var venueCluster;
// Iterate over each select element
$('select').each(function () {

    // Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    // Hides the select element
    $this.addClass('s-hidden');

    // Wrap the select element in a div
    $this.wrap('<div class="select"></div>');

    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');

    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');

    // Show the first select option in the styled div
    $styledSelect.text($this.children('option').eq(0).text());

    // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);

    // Insert a list item into the unordered list for each select option
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    // Cache the list items
    var $listItems = $list.children('li');
    //$listItems.addClass("sound");

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.styledSelect.active').each(function () {
            $(this).removeClass('active').next('ul.options').hide();
        });
        $(this).addClass('active').next('ul.options').show();
    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        
        if (typeof venueCluster != "undefined") {
            deleteVenues();
        }    
        
        if (typeof infoBubble !== "undefined" && infoBubble) {
            infoBubble.close();
        }
        
        map.setCenter(yyc);
        map.setZoom(10);
        
        var JSONResponse = $.ajax({  
                type: "GET",  
                url: "GetVenues",  
                data: "sportValue=" + $this.val(),  
                async: false
        }).responseText;  
        
        var parsedVenueSet = parseJSONObject(JSONResponse);
               
        if (parsedVenueSet == null) {
            alert("No venues for that sport");
        }
        else {
            var type;
            
            $.each(parsedVenueSet.venues, function(key, value) {
                var myLat = value.latitude;
                var myLong = value.longitude;
                type = value.venueType;
                addVenue(myLat, myLong, type);
            });
            var temp;
            
            /*alert(typeof temp);
            var clusterStyle  = [{
                //url: "img/markers/soccer-icon.png",
                url: temp,
                //url: 'http://icons.iconarchive.com/icons/icons-land/vista-halloween/256/Cool-icon.png',
                height: 80,
                width: 80
            }];
        */
            var a = getArray();
            //alert(a);
            
            var clusterStyle = [
                {
                  textColor: 'blue',
                  url: 'img/markers/basketball-icon.png',
                  height: 50,
                  width: 50
                },
               {
                  textColor: 'blue',
                  url: 'img/markers/cricket-icon.png',
                  height: 50,
                  width: 50
                },
               {
                  textColor: 'blue',
                  url: 'img/markers/user-icon.gif',
                  height: 50,
                  width: 50
                }
            ]    
            
            venueCluster = new MarkerClusterer(map, venues, {"styles": clusterStyle}); 
            venueCluster.setStyles(clusterStyle);
        }
    });

    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });
});


function parseJSONObject(rawJSONResponse) {
    var parsedModuleObjectResponse = jQuery.parseJSON(rawJSONResponse);                
    return parsedModuleObjectResponse;
}

var infoBubble;
// var boxText;
function addVenue(lat, lng, venueType){
    var location = new google.maps.LatLng(lat, lng);
    var iconPath = getIconPath(venueType);
    //alert(iconPath);
    var venueMarker = new google.maps.Marker({
        icon: 'img/markers/tennis-icon.png',
        //icon: iconPath,
        position: location
    });
    
    google.maps.event.addListener(venueMarker, 'click', function () {
        if (infoBubble) {
            infoBubble.close();   
        }
        //infoWindow.setContent(contentString);
        
        var boxText = document.createElement("div");
        
        var onMobile = window.matchMedia("only screen and (max-width: 768px)");
        
        if (onMobile.matches) {
             boxText.innerHTML = 
            '<div class="location-mask">' +
                '<a class="location-route" href="comgooglemaps://?daddr=' + lat + ',' + lng + '&zoom=18&views=satellite,traffic"><img src="img/ui/directions.png" width="32" height="32" alt="Directions"/></a>' +
                '<span class="location-name">Britannia Park</span>' + 
                '<span class="location-ownership">City of Calgary</span>' +
                '<span class="location-courts">4 Courts</span>' +
                '<div class="location-bg"><div class="shadow">' + 
                '<img src="https://maps.googleapis.com/maps/api/staticmap?center='+ lat + ',' + lng + '&zoom=18&size=285x245&maptype=satellite&format=png32&key=AIzaSyCuQopAhAbQ4In9h73Y8g_yKlhliDifRyI" /></div></div>' +
            '</div>' +
            '<span class="likability">Likability</span>' + '<span class="feeling"><span class="happy"></span> <span class="meh"></span> <span class="sad"></span></span>';
        } else {
            boxText.innerHTML = 
            '<div class="location-mask">' +
                '<a class="location-route" target="_blank" href="https://www.google.ca/maps/dir//' + lat + ',' + lng + '/@' + lat + ',' + lng + ',239m/data=!3m1!1e3"><img src="img/ui/directions.png" width="32" height="32" alt="Directions"/></a>' +
                '<span class="location-name">Britannia Park</span>' + 
                '<span class="location-ownership">City of Calgary</span>' +
                '<span class="location-courts">4 Courts</span>' +
                '<div class="location-bg"><div class="shadow">' + 
                '<img src="https://maps.googleapis.com/maps/api/staticmap?center='+ lat + ',' + lng + '&zoom=18&size=285x245&maptype=satellite&format=png32&key=AIzaSyCuQopAhAbQ4In9h73Y8g_yKlhliDifRyI" /></div></div>' +
            '</div>' +
            '<span class="likability">Likability</span>' + '<span class="feeling"><span class="happy"></span> <span class="meh"></span> <span class="sad"></span></span>';
        }

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
        
        infoBubble = new InfoBox(myOptions);
        
        infoBubble.open(map,venueMarker);
        map.panTo(venueMarker.getPosition());
        map.panBy(0,-60);
    });
    
    google.maps.event.addListener(map, 'click', function () {
       if (infoBubble) {
           infoBubble.close();
       } 
    });
    
    
    venues.push(venueMarker);
}

function clearMap() {
    venueCluster.clearMarkers();
}

function clearVenues(){
    venues = [];
}

function deleteVenues(){
    clearMap();
    clearVenues();
}