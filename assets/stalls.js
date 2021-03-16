
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.428, lng: -111.936 },
    zoom: 8,
  });
  console.log(map)
}

//Global variables
var apiKey = "1XcvMXHREHIKPQWHGafuJOfKR7dUJfee"; 
var searchFormEl = document.querySelector("#search-form");
var searchButtonEl = document.querySelector("#search-button");
var postingFormEl = document.querySelector("#posting-form");
var gifDisplayEl = document.querySelector("#gif-display");

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
    .then(function(response) {
      return response.json();
    })

    .then(function(response) {
      var gifImg = document.createElement("img");
      gifImg.className = "gif-used";
      gifImg.setAttribute("src", response.data[0].images.fixed_height.url);
      //fixed_height makes 200x200
      //fixed_height_small makes 100x100

      gifDisplayEl.innerHTML =''; 
      gifDisplayEl.appendChild(gifImg);
    })
};

//This function gets text and GIF entered and will set them
//as info window's content (see TODO comment below)
function finalPost() {
  event.preventDefault();
  var gifUsed = document.getElementsByClassName('gif-used');
  var message = document.getElementById('message').value;
  var coordinates = [];

  //for testing purposes
  console.log(gifUsed);
  console.log(message); 

  //TODO: call markerAdd function from GoogleMaps API to add marker and set these 
  //vars into the info window

  //saves post to local storage (coordinates not used yet!)
  var postInfoObj = {
    gif: gifUsed, 
    text: message, 
    location: coordinates,
  };
  console.log(postInfoObj);
  savePost(postInfoObj);
  testLoad();
}

function savePost(postInfoObj) {
  posts.push(postInfoObj);
  console.log(postInfoObj);
  localStorage.setItem("posts", JSON.stringify(posts));
}

function testLoad() {
  var savedPosts = localStorage.getItem("posts");
  savedPosts = JSON.parse(savedPosts);
  console.log(savedPosts);
  var testDiv = document.createElement("div");
  testDiv.appendChild(savedPosts[0]);
}

//in load localstorage function, remake marker then set content of infowindow  
//to postInfoObj's gif, text, and location properties from localStorage
function loadPosts() { 
  var savedPosts = localStorage.getItem("posts");
  
  //returns out of function if nothing saved
  if (!savedPosts) {return false;};

  //parse localStorage string back into array of objects
  savedPosts = JSON.parse(savedPosts);

  //loop thru savedPosts array of objects and remake markers and infowindows
  for (var i=0; i<savedPosts.length; i++) {
    markerinfowindowfunct(savedPosts[i]);
  }
}

searchFormEl.addEventListener('submit', gifSearch);
postingFormEl.addEventListener('submit', finalPost);