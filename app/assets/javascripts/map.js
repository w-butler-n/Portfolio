var map;
var panel;
var initialize;
var calculate;
var direction;

initialize = function()
{
  var latLng = new google.maps.LatLng(48.8600000, 2.3411110);
  var myOptions = {
    zoom      : 14,
    center    : latLng,
    mapTypeId : google.maps.MapTypeId.TERRAIN,
    maxZoom   : 20
  };
  
  map      = new google.maps.Map(document.getElementById('full_screen_part'), myOptions);
  panel    = document.getElementById('panel');

  direction = new google.maps.DirectionsRenderer({
    map   : map,
    panel : panel 
  });

  google.maps.event.addListener(map, 'click', function(e) {
    placeMarker(e.latLng, map);
  });

  $('full_screen_part').click(function(){
      if ( screenfull ) {
     screenfull.toggle( this );
     }
    });
};

calculate = function()
{
  origin = document.getElementById('origin').value;
  destination = document.getElementById('destination').value;
  if(origin && destination)
  {
    var request = {
      origin      : origin,
      destination : destination,
      travelMode  : google.maps.DirectionsTravelMode.DRIVING
    }

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status){
        if(status == google.maps.DirectionsStatus.OK)
        {
          direction.setDirections(response);
        }
    });
  }
};

;

function enterFullscreen(element) 
{
  if(element.requestFullScreen) 
  {
    element.requestFullScreen();
  } 

  else if(element.webkitRequestFullScreen) 
  {
    element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  } 

  else if(element.mozRequestFullScreen)
  {
    element.mozRequestFullScreen();
  } 

  else 
  {
    alert('Votre navigateur ne supporte pas le mode plein écran');
  }
}


function placeMarker(position, map) 
{
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  map.panTo(position);
}

google.maps.event.addDomListener(window, 'load', initialize);

