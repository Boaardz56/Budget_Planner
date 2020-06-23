
//working national park service AJAX call

var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=qcE8d6F20uPnRxCHeTizvaUcp5ZzbYiCqValJs8Y";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
console.log (response);
});

//google places AJAX call
var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&rankby=prominence&fields=photos,formatted_address,name,rating&key=AIzaSyCZv8-G_j3tkOqJ5sIqhGFN0iYBDs-Q664";
console.log(queryURL);
$.ajax({
  url: queryURL,
  method: "GET"
  
}).then(function(response) {
console.log (response);
});
  