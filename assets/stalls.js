//map stuff 
var map;

// this is what calls the map to existance 
function initMap() {

  //map options 
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.428, lng: -111.936 },
    zoom: 8,
  });

  //listen for click 
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
 });
 
 //function to place the marker
 function placeMarker(location) {
      var marker = new google.maps.Marker({
         position: location, 
         map: map
      });
      // this is the listener  for a click to open the map marker aslo no work 
      marker.addListener("click",() => {
        infowindow.open(map, marker);
      });
 }

 // This is the string that SHOULD add content but it does not 
 var contentString = 
 '<div id= "content">' +
 '<div id="siteNotice">' +
 "</div>" +
 '<h1 id="firstHeading" class="firstHeading">I pooped </h1>' +
 '<div id="bodyContent">' +
 "<p>, this is where we put poop text </p>" +
 "</div>" +
"</div>";

//this is the info window 
var infowindow = new google.maps.InfoWindow({
  content: contentString,
});



//  // google.maps.event.addListener(map, 'click', function(event) {
//   placeMarker(event.latLng);
// });

//  //listen for click on marker
//  var infowindow =  google.maps.event.addListener(map, 'click', function(event){
//    infowindow.content 
//  })
 
}



// GIPHY code below:
//variables
var apiKey = "1XcvMXHREHIKPQWHGafuJOfKR7dUJfee"; 
var searchFormEl = document.querySelector("#search-form");
var searchButtonEl = document.querySelector("#search-button");
var gifDisplayEl = document.querySelector("#gif-display");

var postingFormEl = document.querySelector("#posting-form");

//use this function when making info windows on google maps API
function gifSearch() {
  event.preventDefault();
  var searchTerm = document.querySelector("#search-input").value;
  
  fetch(
    "https://api.giphy.com/v1/gifs/search?q=" + 
    searchTerm + 
    "&api_key=" + 
    apiKey + 
    "&limit=1"
  )
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
      console.log(response.data[0]);

      var gifImg = document.createElement("img");
      gifImg.setAttribute("src", response.data[0].images.fixed_height.url);
      //fixed_height makes 200x200
      //fixed_height_small makes 100x100

      gifDisplayEl.innerHTML =''; 
      gifDisplayEl.appendChild(gifImg);
    })

  searchFormEl.reset();
}

//This function gets text and GIF entered and sets them
//as info window's content (see TODO comment below)
function finalPost() {
  event.preventDefault();
  var message = document.getElementById('message').value;
  var gif = gifDisplayEl;
  
  //for testing purposes
  console.log(message); 
  console.log(gif);

  //TODO: call markerAdd function from GoogleMaps API to add marker and set these 
  //vars into the info window

}

searchFormEl.addEventListener('submit', gifSearch);
postingFormEl.addEventListener('submit', finalPost);