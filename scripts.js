$(document).ready(function(){

var categoriesListFood=$('#dropdownfood');
var businesses=[];

//Global variable that hides the container with the cards on the opening page.
  var cardsContainer = $(".grid-container").hide();

  //the unordered list that holds drop down menu items
  var foodOptions = $("#foodOptions");

  //array of predetermined choices/can be edited
  var categoriesForChoose=["Mexican", "Asian Fusion", "Vegan", "Italian", "Seafood"];

  //empty array that holds matching places with food category
  var matchingFoodPlace=[];

//empty array that holds the whole 50 restaraunts in area
  var searchResponse = [];

//string that is compared to restaraunt categories
  var foodChoice="";

//runs the generate list function which creates the list items used to select food type
generateList();

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
  
});


//-------------------------Yelp API and functions--------------------------------------------------
function yelpSearch(userSearch) {
  var yelpQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userSearch + "&limit=50" + "&categories=";
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
      var name = $("#cardTitle");
      name.text(response.businesses[0].name);
      // var foodPic = $("<img>");
      // foodPic.attr(response.businesses[0].image_url);
      // var cardSection = $("#cardSection");
      // cardSection.attr('src', response.businesses[0].image_url);
      var cardRating = $("#cardSection");
      cardRating.text("Rating: " + response.businesses[0].rating);
      var cardPrice = $("<p>");
      cardPrice.text("Price: " + response.businesses[0].price);
      cardRating.append(cardPrice);
      //attaching for loop
      //for (var i=0; i<cardInput.length;i++) {



//for loop that takes 50 restaraunts and pushes into a global array so we can access outside this function
       console.log(response.businesses.length);
           for(i=0; i<response.businesses.length; i++ ){
              searchResponse.push(response.businesses[i]);
              // console.log("search response " + JSON.stringify(searchResponse[i]))
           }
      
//runs the compare loop function which takes food choice and sees if any restaraunts have that category and if so they are pushed into array        
resultCompareLoop(foodChoice);
console.log(matchingFoodPlace);
      
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
var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&rankby=prominence&fields=photos,formatted_address,name,rating&key=AIzaSyCZv8-G_j3tkOqJ5sIqhGFN0iYBDs-Q664";
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


//here we generate list for food categories
function generateList(){
//for loop that creates each list item with a tag
  for (i = 0; i < categoriesForChoose.length; i++) {
//creates list items so each has own id
        var listID = "foodType" + categoriesForChoose[i];
//creates list element
        var li = document.createElement("li");
        var a = document.createElement("a");
//makes link clickable
            a.setAttribute('href', "#");
//adds on click function that sets food choice = innerhtml
            a.onclick=function(){
              console.log("running the click function");
               foodChoice = $(this)[0].innerHTML;
              console.log($(this)[0].innerHTML);
            }
           
//add ID to list item
        li.id = listID;
//sets innerhtml of a tag so text is displayed
        a.innerHTML=categoriesForChoose[i];
//append a tag to list item
    li.appendChild(a);
//append list item to unordered list
        foodOptions.append(li);

    }
  }

//function to compare restaraunt categories to search term
  function resultCompareLoop(searchTerm){
//loops through all 50 restaraunts
    for(i=0; i<searchResponse.length; i++){
//loops through categories in restaraunt
      for(j=0; j<searchResponse[i].categories.length; j++){
//if the selected term matches restaraunt categories        
        if(searchResponse[i].categories[j].title == searchTerm){
//push the matching restaraunt object into the matching food place array
          matchingFoodPlace.push(searchResponse[i]);
          console.log("added to array");
        }

// console.log(searchResponse[i].categories[j].title);
      } 
    }
  
  
  }











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
