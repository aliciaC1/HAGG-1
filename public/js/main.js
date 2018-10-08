AOS.init();

$('.ui.sidebar')
.sidebar('toggle')
;

$('.search-select')
.dropdown()
;

$('.cover-img')
// fade up out is used if available
.transition({
    animation: 'fade up', 
    duration   : '2s',
})
// this is now fade up in
.transition({
    animation: 'fade up', 
    duration   : '2s',
})
;

setTimeout(() => {
  $('.shape').shape('flip right');
}, 2000);

setTimeout(() => {
  $('.shape').shape('flip right');
}, 4000);

  $('.ui .item').on('click', function() {
      $('.ui .item').removeClass('active');
      $(this).addClass('active');
  });             


  $('.newPrice.button')
  .popup({
    popup : $('.basic.popup'),
    on    : 'click'
  })
;


$('#submitPrice').on('click', function(){
  $('.ui.block.header').transition('vertical flip', '1000ms')
  .transition('vertical flip', '1000ms'); 
});


// index # counter 
(function ($) {
  $.fn.countTo = function (options) {
      options = options || {};
      
      return $(this).each(function () {
          // set options for current element
          var settings = $.extend({}, $.fn.countTo.defaults, {
              from:            $(this).data('from'),
              to:              $(this).data('to'),
              speed:           $(this).data('speed'),
              refreshInterval: $(this).data('refresh-interval'),
              decimals:        $(this).data('decimals')
          }, options);
          
          // how many times to update the value, and how much to increment the value on each update
          var loops = Math.ceil(settings.speed / settings.refreshInterval),
              increment = (settings.to - settings.from) / loops;
          
          // references & variables that will change with each update
          var self = this,
              $self = $(this),
              loopCount = 0,
              value = settings.from,
              data = $self.data('countTo') || {};
          
          $self.data('countTo', data);
          
          // if an existing interval can be found, clear it first
          if (data.interval) {
              clearInterval(data.interval);
          }
          data.interval = setInterval(updateTimer, settings.refreshInterval);
          
          // initialize the element with the starting value
          render(value);
          
          function updateTimer() {
              value += increment;
              loopCount++;
              
              render(value);
              
              if (typeof(settings.onUpdate) == 'function') {
                  settings.onUpdate.call(self, value);
              }
              
              if (loopCount >= loops) {
                  // remove the interval
                  $self.removeData('countTo');
                  clearInterval(data.interval);
                  value = settings.to;
                  
                  if (typeof(settings.onComplete) == 'function') {
                      settings.onComplete.call(self, value);
                  }
              }
          }
          
          function render(value) {
              var formattedValue = settings.formatter.call(self, value, settings);
              $self.html(formattedValue);
          }
      });
  };
  
  $.fn.countTo.defaults = {
      from: 0,               // the number the element should start at
      to: 0,                 // the number the element should end at
      speed: 1000,           // how long it should take to count between the target numbers
      refreshInterval: 100,  // how often the element should be updated
      decimals: 0,           // the number of decimal places to show
      formatter: formatter,  // handler for formatting the value before rendering
      onUpdate: null,        // callback method for every time the element is updated
      onComplete: null       // callback method for when the element finishes updating
  };
  
  function formatter(value, settings) {
      return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
// custom formatting example
$('.count-number').data('countToOptions', {
  formatter: function (value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
});

// start all the timers
$('.timer').each(count);  

function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
}
});

// search dynamically re-direct you to search result product page
$("#searchResult").on("click", function(event) {
  event.preventDefault();
  var userInput = {
  location: $("#location-select").dropdown("get value"), 
  product:$("#product-select").dropdown("get value")
  };
  var newURL = "/example/"+ userInput.location + "/" + userInput.product;
  // alert(newURL);
  $("#searchResult").attr("href");
  window.location.replace( newURL );  
  }); 

// google maps API 
 // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
      var map;
      var infowindow;
      function initMap() {
          
        var ny = { lat: 40.8095344, lng: -73.96039549999999};
        map = new google.maps.Map(document.getElementById('map'), {
          center: ny,
          zoom: 15, 
          styles: [
            {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ff0000"
                },
                {
                  "saturation": 90
                },
                {
                  "lightness": 100
                },
                {
                  "visibility": "on"
                },
                {
                  "weight": 8
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "visibility": "on"
                },
                {
                  "weight": 4
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#b98cef"
                }
              ]
            },
            {
              "featureType": "administrative.province",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#fbfbff"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "labels.text",
              "stylers": [
                {
                  "color": "#b6feaa"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#fbfbff"
                }
              ]
            },
            {
              "featureType": "landscape.natural.landcover",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "landscape.natural.terrain",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "poi.attraction",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "lightness": 100
                },
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.attraction",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#f1fffc"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#b3ffa2"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#76d1bd"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#e9effd"
                },
                {
                  "saturation": 100
                },
                {
                  "lightness": 20
                },
                {
                  "weight": 6
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]
        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: ny,
          radius: 2000,
          type: ['clothing_store']
        }, callback);
      }
    
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

