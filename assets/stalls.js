
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.428, lng: -111.936 },
    zoom: 8,
  });
  console.log(map)
}


