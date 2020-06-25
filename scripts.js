$(document).ready(function(){
//google api to get some restaurants with rating around a location
//google places AJAX call
var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&rankby=prominence&fields=photos,formatted_address,name,rating&key=AIzaSyCZv8-G_j3tkOqJ5sIqhGFN0iYBDs-Q664";
console.log(queryURL);
$.ajax({
  url: queryURL,
  method: "GET"
  
}).then(function(response) {
console.log (response);
});
  


var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Orlando&categories=";
console.log(queryURL);
$.ajax({
  url: queryURL,
  method: "GET",
  headers:{
    Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
  }

}).then(function(response) {
console.log ("yelp" , response);
});

//Button event for user's search.
$("#submitBtn").click(function(){
  $("#searchField").hide();
  $("#checkBox").hide();
  $("#submitBtn").hide();
//Made it so the search data/text is taken and can be used.  cardHeader variable is a placeholder to demonstrate that the code is working with the page.
  var cardHeader = $("h4");
  var userSearch = $("#searchField").val();
  cardHeader.text(userSearch)
  console.log(userSearch)


})

})

//google maps api AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ

var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ";
console.log(queryURL);
$.ajax({
  url: queryURL,
  method: "GET"
  
}).then(function(response) {
console.log (response);
});
