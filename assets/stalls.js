//map stuff
var map;
var myLocation = window.localStorage;
var mapArray = [] 

// this is what calls the map to existance
function initMap() {
  //map options
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.428, lng: -111.936 },
    zoom: 8,
  });

  //listen for click
  google.maps.event.addListener(map, "click", function (event) {
    console.log(placeMarker(event.latLng));
    // if (myLocation) {
    //   var currentLocation = myLocation.getItem("locationlatLang");
    // var locationList = currentLocation.concat(event.latLng);
    // console.log(locationList);
    // } 
    
    myLocation.setItem("locationlatLang", event.latLng);
    var currentLoc = myLocation.getItem("locationlatLang");
    var locationList = currentLoc.substring(1, currentLoc.length -1).split(", ")
    // var newMapArray = mapArray.push(locationList); 
    mapArray.push(locationList);
    poopString(locationList)
  });

function poopString(locationList){
  var nugget = {
    loction: locationList,
    message: contentStringGlobal,
  }

var allContent = JSON.parse(localStorage.getItem("disPoop")) || []
console.log(allContent)
  allContent.push(nugget);
  localStorage.setItem("disPoop", JSON.stringify(allContent))
};

  //this gets all the content in to the map gif and message
  var contentString = contentStringGlobal;

  function placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
    });
    // this is the listener  for a click to open the map marker
    marker.addListener("click", () => {
      //this is the info window var
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      finalPost();
      infowindow.setContent(contentStringGlobal);
      infowindow.open(map, marker);
      // console.log(contentStringGlobal);
      console.log(marker.position);
      // let poopSave = {
      //   contentString: contentStringGlobal,
      //   markerLocation: marker.anchorPoint
      // };


    });
      //CALL SAVE FUNCTION HERE AND MODIFY SAVE FUNCTION SO THAT IT STORES 'location'
      //TODO: can use posts array to store
      //could use marker.getPosition to return LatLng

  }
  // placeMarker({
  //   lat: 33.74375168366952, 
  //   lng: -112.68856347656249

  //   }); 

}

//Global variables
var apiKey = "1XcvMXHREHIKPQWHGafuJOfKR7dUJfee";
var searchFormEl = document.querySelector("#search-form");
var searchButtonEl = document.querySelector("#search-button");
var postingFormEl = document.querySelector("#posting-form");
var gifDisplayEl = document.querySelector("#gif-display");
var contentStringGlobal = "";

var posts = [];

// GIPHY search function
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
    .then(function (response) {
      return response.json();
    })

    .then(function (response) {
      var gifImg = document.createElement("img");
      gifImg.setAttribute("id", "gif-used");
      gifImg.setAttribute("src", response.data[0].images.fixed_height_small.url);
      //fixed_height makes 200x200
      //fixed_height_small makes 100x100

      gifDisplayEl.innerHTML = "";
      gifDisplayEl.appendChild(gifImg);
    });
}

//This function gets text and GIF entered and will set them
//as info window's content (see TODO comment below)
function finalPost() {
  event.preventDefault();
  var gifUsed = document.getElementById("gif-used").getAttribute("src");
  var message = document.getElementById("message").value;

  //for testing purposes
  console.log(gifUsed);
  console.log(message);

  //TODO: call markerAdd function from GoogleMaps API to add marker and set these
  //vars into the info window

  //saves post to local storage (coordinates not used yet!)
  var postInfoObj = {
    gif: gifUsed,
    text: message,
  };
  console.log(postInfoObj);
  // savePost(postInfoObj);

  contentStringGlobal =
    "<img src='" + gifUsed + "'></img><p>" + message + "</p>";
}



// function savePost(postInfoObj) {
//   posts.push(postInfoObj);
//   localStorage.setItem("posts", JSON.stringify(posts));
// }


//in load localstorage function, remake marker then set content of infowindow
//to postInfoObj's gif, text, and location properties from localStorage
// function loadPosts() {
//   var savedPosts = localStorage.getItem("posts");

//   //returns out of function if nothing saved
//   if (!savedPosts) {
//     return false;
//   }

//   //parse localStorage string back into array of objects
//   savedPosts = JSON.parse(savedPosts);

//   //loop thru savedPosts array of objects and remake markers and infowindows
//   for (var i = 0; i < savedPosts.length; i++) {
//     //within function: use savedPosts[i].gif | .location | .text
//     markerinfowindowfunct(savedPosts[i]);
//   }
// }

searchFormEl.addEventListener("submit", gifSearch);
