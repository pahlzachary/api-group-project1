
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.428, lng: -111.936 },
    zoom: 8,
  });
  console.log(map)
}


// GIPHY code below:

//variables
var apiKey = "1XcvMXHREHIKPQWHGafuJOfKR7dUJfee"; 
var searchFormEl = document.querySelector("#search-form");
var searchButtonEl = document.querySelector("#search-button");

//use this function when making info windows on google maps API
function gifFinder() {
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
      gifImg.setAttribute("src", response.data[0].images.fixed_height_small.url);
      
      //will want gifImg to go into the info window on google maps instead of this temp div
      document.querySelector("#gif-display").innerHTML =''; 
      document.querySelector("#gif-display").appendChild(gifImg);
    })

  searchFormEl.reset();
}

searchFormEl.addEventListener('submit', gifFinder);