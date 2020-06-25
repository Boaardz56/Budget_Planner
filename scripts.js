//Global variable that hides the container with the cards on the opening page.
var cardsContainer = $(".grid-container").hide();


$(document).ready(function(){


  //Button event for user's search.




$(document).ready(function(){


//Button event for user's search.
$("#submitBtn").click(function(){
  $("#searchField").hide("scale-out-down");
  $("#checkBox").hide("scale-out-down");
  $("#submitBtn").hide("scale-out-down");
//Made it so the search data/text is taken and can be used.  cardHeader variable is a placeholder to demonstrate that the code is working with the page.
  //var cardHeader = $("h4");
  var userSearch = $("#searchField").val();
  //cardHeader.text(userSearch)
  // console.log(userSearch)
//Shows container with cards after search.
  $(".grid-container").show();
  yelpSearch(userSearch);
  window.location.href = "#cardResults"

});

//-------------------------Yelp API and functions--------------------------------------------------
function yelpSearch(userSearch) {
  var yelpQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Orlando&categories=";
  console.log(yelpQueryURL);
  //start Ajax call  
  $.ajax({
  url: yelpQueryURL,
  method: "GET",
  headers:{
    Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
  }

  }).then(function(response) {
      console.log ("yelp" , response);
      //attaching Restaurant name to title of card
      var yelpCard = $("#yelpCard");
      //add loop to pull business info 
      for (var i=0; i<yelpCard.length; i++) {
      var name = $("#yelpFoodTitle");
      name.text(response.businesses[0].name);
      // var foodPic = $("<img>");
      // foodPic.attr(response.businesses[0].image_url);
      var cardRating = $("#yelpFoodSection");
      cardRating.text("Rating: " + response.businesses[0].rating);
      var cardPrice = $("<p>");
      cardPrice.text("Price: " + response.businesses[0].price);
      cardRating.append(cardPrice);
      //attaching for condition??
    }
  });
}

//google maps api AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ

var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ";
// console.log(queryURL);
$.ajax({
  url: queryURL,
  method: "GET"
  
}).then(function(response) {
// console.log (response);
});

//google api to get some restaurants with rating around a location
//google places AJAX call
var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&rankby=prominence&fields=photos,formatted_address,name,rating&key=AIzaSyCZv8-G_j3tkOqJ5sIqhGFN0iYBDs-Q664";
// console.log(queryURL);
$.ajax({
  url: queryURL,
  method: "GET"
  
}).then(function(response) {
// console.log (response);
});



//commented out for future use
//google maps api AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ

// var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ&callback=myMap";
// console.log(queryURL);
// $.ajax({
//   url: queryURL,
//   method: "GET"
  
// }).then(function(response) {

// });

// map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8
//   });




//CLOSING document tag!!!
});
