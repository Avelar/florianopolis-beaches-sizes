var map = L.map("map").setView([-20.22, -42.55], 11);
// https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXZlbGFyIiwiYSI6ImNpZzVxd29hbjRkdXB1dm0zNWdoeDVrYjQifQ.NswKzz5O8mJ7yZunhaGTag

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    minZoom: 10,
    attribution: 'Map data by <a href="http://www.avelarfortunato.com">Avelar Fortunato</a> contributors, <a href="http://openstreetmap.org">openstreetmap</a>',
    // id: 'avelar.o00bh9gb'
}).addTo(map);

map.doubleClickZoom.disable();
L.control.scale().addTo(map);

var beachs = [];
$.getJSON('data.json', function(json) {
  beachs = json;
  getBeachs(beachs);
});

getBeachs(beachs);

function getBeachs(array) {
  html = "";
  var i;
  for (i = 0; i < array.length; i++) {
    marker = new L.marker([array[i].lat,array[i].lng])
        .bindPopup('<p class=beachName>' + array[i].beachName + '</p> <p class=lengthBeach>Extensão da praia: '+ array[i].lengthBeach +'(m)</p>')
        .addTo(map)
        .openPopup();
        $(".number-of-beachs").text(array.length);
  }
  for(i = 0; i < array.length; i++) {
    $("#beachOptions").append("<option value=" + array[i].id + ">"+ array[i].beachName + "</option>");

    // Table beach list
    $('#detail-list-container .tbody').append("<tr><td>" + array[i].beachName + "</td><td>" + array[i].lengthBeach + "</td><td>"  + array[i].region + "</td></tr>");
  }
}

$("#beachOptions").on("change", function(){
  var coordinatesList = $("#beachOptions").val();
  for (i = 0; i < beachs.length; i++) {
    var beach = beachs[i];
    if (beach.id == coordinatesList) {
      map.setView([beach.lat, beach.lng], 13, {animation: true})

      function nameExtension() {
        var popupLocation1 = new L.LatLng(beach.lat, beach.lng);
        var popupContent1 = '<p class=beachName>' + beach.beachName + '</p> <p class=lengthBeach>Extensão da praia: '+ beach.lengthBeach +'(m)</p>', popup1 = new L.Popup({offset: new L.Point(1, -28)});
        popup1.setLatLng(popupLocation1);
        popup1.setContent(popupContent1);
        map.addLayer(popup1);
      }
      nameExtension();
    }
  }
});

$(".nav-pin").on("click", function(){
  var mip = $(".map-info-pin");
      mip.addClass("map-info-colapsed");
      mip.removeClass("map-info");
});
