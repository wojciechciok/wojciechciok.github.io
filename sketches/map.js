let map = function (p) {
    // Create a variable to hold our map
    let myMap;
    // Create a variable to hold our canvas
    let canvas;
    // Create a new Mappa instance using Leaflet.
    const mappa = new Mappa('Leaflet');
  
    // Lets put all our map options in a single object
    const options = {
      lat: 0, 
      lng: 0,
      zoom: 1,
      style: "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      attributionControl: false,
      zoomControl: false
    }
  
    p.setup =  function() {
      let size = $("#map").parent().width();
      canvas = p.createCanvas(size, size);
  
      // Create a tile map with lat 0, lng 0, zoom 4
      myMap = mappa.tileMap(options);
      // // Overlay the canvas over the tile map
      myMap.overlay(canvas, () => {
        $("#mappa").detach().appendTo("#map");
        $(window).bind('scroll', function() {
          myFly(myMap);
        });
      });
    }
    
    p.draw = function() {
      p.clear();
      const warsaw = myMap.latLngToPixel(52.229676, 21.012229);
      p.noStroke();
      p.fill(255, 255, 255, 100);
      p.circle(warsaw.x, warsaw.y, 30);
    }
  }
  
  function myFly(map) {
    if($('#map-card').css('opacity') > 0.3) {
      $(window).unbind('scroll');
      map.map.flyTo([52, 19], 5.5);
      initializeFadeIn();
    }
  }
  
  let mapP5 = new p5(map, 'map');