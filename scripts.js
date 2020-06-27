$(document).ready(function () {

  // var categoriesListFood=$('#dropdownfood');
  var businesses = [];

  //Global variable that hides the container with the cards on the opening page.
  var cardsContainer = $("#card-page").hide();

  //the unordered list that holds drop down menu items
  var foodOptions = $("#foodOptions");

  var entertainOptions = $('#entertainOptions');

  // var entertainSelects = $('#dropdownentertainselect')
  // var foodSelects = $('#dropdownfoodselect')

  //array of predetermined choices/can be edited
  var categoriesForChoose = ["Mexican", "Asian Fusion", "Vegan", "Italian", "Seafood"];

  //array of predetermined choices for entertainment

  var categoriesforFun=["Bars", "Cinema", "Galleries", "Cabaret", "Museums", "Music Venues", "Theater", "Race Tracks"]


  //empty array that holds matching places with food category
  var matchingFoodPlace = [];

  var matchingEntertainPlace=[];

//empty array that holds the whole 50 restaraunts in area
  var searchResponse = [];

  var searchResponseEntertain= [];

//string that is compared to restaraunt categories
  var foodChoice="";

  //string that is compared to entertainment categories
  var entertainChoice = "";

  //runs the generate list function which creates the list items used to select food type
  generateFoodList();
  generateEntertainList();
  // generateEntertainSelect();
  // generateFoodSelect();

  //Button event for user's search.
  $("#submitBtn").click(function () {
   //Made it so the search data/text is taken and can be used.  cardHeader variable is a placeholder to demonstrate that the code is working with the page.
    //var cardHeader = $("h4");
    var userSearch = $("#searchField").val();
    if (userSearch === "") {
      return;
    }
  //cardHeader.text(userSearch)
  // console.log(userSearch)
//Shows container with cards after search.
  $("#card-page").show();
  yelpSearch(userSearch);
  yelpSearchEntertain(userSearch);
  window.location.href = "#cardResults"
  });  



    //-------------------------Yelp API and functions for food--------------------------------------------------

    window.location.href = "#cardResults"
  });


  function yelpSearch(userSearch) {
    var yelpQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userSearch + "&limit=50" + "&categories=" + foodChoice.toLowerCase();
    console.log(yelpQueryURL);
    //start Ajax call  
    $.ajax({
      url: yelpQueryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
      }

  //-------------------------Yelp API and functions--------------------------------------------------

function yelpSearch(userSearch) {
  String.prototype.alltrim = function () { return this.replace(/\s+/g, ""); }
  var yelpQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userSearch + "&limit=50" + "&categories=" + foodChoice.alltrim().toLowerCase();
  console.log(yelpQueryURL);
//start Ajax call  
  $.ajax({
  url: yelpQueryURL,
  method: "GET",
  headers:{
    Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
  }

    }).then(function (response) {
      var lat = response.region.center.latitude;
      var lon = response.region.center.longitude;
      console.log("yelp", response);
      console.log(lat, lon)

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
      for (i = 0; i < response.businesses.length; i++) {
        searchResponse.push(response.businesses[i]);
        // console.log("search response " + JSON.stringify(searchResponse[i]))
      }

      //runs the compare loop function which takes food choice and sees if any restaraunts have that category and if so they are pushed into array        
      resultCompareLoop(foodChoice);
      console.log(matchingFoodPlace);

      var queryURL = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=47.6044,-122.3345;47.6731,-122.1185;47.6149,-122.1936&destinations=" + lat + "," + lon + "&travelMode=driving&key=AroPEfTB4hg6gbnAT0DX7db1IHBHEAD6c6eWInD46ms_Q6j7NkxBo1ZItNijcTVA"
      $.ajax({
        url: queryURL,
        method: "GET"

      }).then(function (response) {
        console.log("bing", response);


      })

    });
  }
  //bing locations api to get distance between places and/or distance to places. Key=AroPEfTB4hg6gbnAT0DX7db1IHBHEAD6c6eWInD46ms_Q6j7NkxBo1ZItNijcTVA


  ///////////////////////////FOOD MATCHING FUNCTIONS///////////////////////////////////////////////////////////

  //here we generate list for food categories
  function generateFoodList() {
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
      a.onclick = function () {
        console.log("running the click function");
        foodChoice = $(this)[0].innerHTML;
        console.log($(this)[0].innerHTML);
      }

      //add ID to list item
      li.id = listID;
      //sets innerhtml of a tag so text is displayed
      a.innerHTML = categoriesForChoose[i];
      //append a tag to list item
      li.appendChild(a);
      //append list item to unordered list
      foodOptions.append(li);
    }
  }
  ////////////////////end food drop down////////////////////////

////////////////////COMPARE FOOD CHOICE TO YELP FOOD CAT///////////////////////////////////////////////////

/////function to compare restaraunt categories to search term/////
  function resultCompareLoop(searchTerm){
      console.log("search term is " + searchTerm)
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
////////////////////////////////END YELP STUFF FOR FOOD////////////////////////////////////////////////////////////////////////////////

////////////////ENTERTAINMENT DROP DOWN////////////////
// here we generate list for entertain categories


  function generateEntertainList() {
    //for loop that creates each list item with a tag
    for (i = 0; i < categoriesforFun.length; i++) {
      //creates list items so each has own id
      var listID = "entertainType" + categoriesforFun[i];
      //creates list element
      var li = document.createElement("li");
      var a = document.createElement("a");
      //makes link clickable
      a.setAttribute('href', "#");
      //adds on click function that sets food choice = innerhtml
      a.onclick = function () {
        console.log("running the click function");
        entertainChoice = $(this)[0].innerHTML;
        console.log($(this)[0].innerHTML);
      }

      //add ID to list item
      li.id = listID;
      //sets innerhtml of a tag so text is displayed
      a.innerHTML = categoriesforFun[i];
      //append a tag to list item
      li.appendChild(a);
      //append list item to unordered list
      entertainOptions.append(li);

    }

/////////////////////function for yelp entertainment user search//////////////////////

function yelpSearchEntertain(userSearch) {
  String.prototype.alltrim = function () { return this.replace(/\s+/g, ""); }

  var yelpQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userSearch + "&limit=50" + "&categories=" + entertainChoice.alltrim().toLowerCase();

  console.log(entertainChoice.alltrim().toLowerCase());
  console.log(yelpQueryURL);
//start Ajax call  
  $.ajax({
  url: yelpQueryURL,
  method: "GET",
  headers:{
    Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
  }

  }).then(function(response) {
      console.log ("yelp entertain" , response);

     
//attaching Restaurant name to title of card
      // var name = $("#cardTitle");
      // name.text(response.businesses[0].name);
      // var foodPic = $("<img>");
      // foodPic.attr(response.businesses[0].image_url);
      // var cardSection = $("#cardSection");
      // cardSection.attr('src', response.businesses[0].image_url);
      // var cardRating = $("#cardSection");
      // cardRating.text("Rating: " + response.businesses[0].rating);
      // var cardPrice = $("<p>");
      // cardPrice.text("Price: " + response.businesses[0].price);
      // cardRating.append(cardPrice);
      //attaching for loop
      //for (var i=0; i<cardInput.length;i++) {


//for loop that takes 50 restaraunts and pushes into a global array so we can access outside this function
       console.log(response.businesses.length);
           for(i=0; i<response.businesses.length; i++ ){
              searchResponseEntertain.push(response.businesses[i]);
              // console.log("search response " + JSON.stringify(searchResponse[i]))
           }
      
//runs the compare loop function which takes food choice and sees if any restaraunts have that category and if so they are pushed into array        
resultCompareLoopEntertain(entertainChoice);
console.log(matchingEntertainPlace);
      
  });
}

////////////////////COMPARE FOOD CHOICE TO YELP FOOD CAT///////////////////////////////////////////////////

/////function to compare restaraunt categories to search term/////
function resultCompareLoopEntertain(searchTerm){
  // console.log("search term is " + searchTerm)
//loops through all 50 restaraunts
for(i=0; i<searchResponseEntertain.length; i++){
//loops through categories in restaraunt
  for(j=0; j<searchResponseEntertain[i].categories.length; j++){
//if the selected term matches restaraunt categories        
    if(searchResponseEntertain[i].categories[j].title == searchTerm){
//push the matching restaraunt object into the matching food place array
      matchingEntertainPlace.push(searchResponseEntertain[i]);
      console.log("added to array");
    }


// console.log(searchResponse[i].categories[j].title);
  } 
}
}



















  //////////////////////////////////////////////GOOGLE MAPS API WE WANT//////////////////////////////////////////////////////////////////////////////////////////////////////

  //google maps api key AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ

  var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ";
  // console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {
    // console.log (response);
  });

  //google api to get some restaurants with rating around a location
  var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&rankby=prominence&fields=photos,formatted_address,name,rating&key=AIzaSyCZv8-G_j3tkOqJ5sIqhGFN0iYBDs-Q664";
  // console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {
    // console.log (response);
  });

  //google api to get some restaurants with rating around a location
  //google places AJAX call
  var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&rankby=prominence&fields=photos,formatted_address,name,rating&key=AIzaSyCZv8-G_j3tkOqJ5sIqhGFN0iYBDs-Q664";
  // console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) {
    // console.log (response);
  });

});



///////////////STUFF WE CAN USE LATER MAYBE/////////////////////////////////////////////

////////////////////////ENTERTAIN SELECTS USE LATER MAYBE/////////////////////////////////

// function generateEntertainSelect(){
//   for (i = 0; i < categoriesforFun.length; i++) {
//     var optionID = "entertainType" + categoriesforFun[i];
//     var options = document.createElement("OPTION");

//   options.onclick=function(){
//    console.log("running the click function");
//    entertainChoice = $(this)[0].innerHTML;

//    console.log($(this)[0].innerHTML);
//     }
//     //   //add ID to list item
//       options.id = optionID;

//      options.innerHTML=categoriesforFun[i];

//      entertainSelects.append(options);
//   }
// }
//////////////////FOOD SELECTS USE LATER MAYBE//////////////////////////////////////////////
// function generateFoodSelect(){
//   for (i = 0; i < categoriesForChoose.length; i++) {
//     var optionID = "foodType" + categoriesForChoose[i];
//     //console.log(optionID);
//     var options = document.createElement("OPTION");
//     //console.log(options);

//   options.setAttribute('value', "#");

//   options.onclick=function(){
//     preventDefault ()

//    console.log("running the click function");

//    foodChoice = $(this)[0].innerHTML;

//    //console.log($(this)[0].innerHTML);
//     }
//     //   //add ID to list item
//       options.id = optionID;

//      options.innerHTML=categoriesForChoose[i];

//      foodSelects.append(options);
//   }
// }

///////////////////////////////////////////////////////////////////////////////////




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



