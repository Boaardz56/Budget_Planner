$(document).ready(function () {

  var cardGlobalRating;
  // var categoriesListFood=$('#dropdownfood');
  var businesses = [];

  //Global variable that hides the container with the cards on the opening page.
  var cardsContainer = $("#card-page").hide();

  //the unordered list that holds drop down menu items
  var foodOptions = $("#foodOptions");

  var entertainOptions = $('#entertainOptions');

  var entertainSelects = $('#dropdownentertainselect')
  var foodSelects = $('#dropdownfoodselect')

  //array of predetermined choices/can be edited
  var categoriesForChoose = ["Choose Food", "Mexican", "Asian Fusion", "Vegan", "Italian", "Seafood"];

  //array of predetermined choices for entertainment
  var categoriesforFun = ["Choose Entertainment", "Bars", "Movie Theaters", "Galleries", "Cabaret", "Museums", "Music Venues", "Theater", "Race Tracks"]

  //empty array that holds matching places with food category
  var matchingFoodPlace = [];

  var matchingEntertainPlace = [];

  //empty array that holds the whole 5 restaraunts in area
  var searchResponse = [];

  //holds 5 entertainment places
  var searchResponseEntertain = [];

  //string that is compared to restaraunt categories
  var foodChoice = "";

  //string that is compared to entertainment categories
  var entertainChoice = "";

  //sets food selected and fun select to false so menu bar works
  var searchFoodSelected = false;
  var searchFunSelected = false;
//makes sure user types city input
  var inputSearchLoc = false;

  //inside bingAPI it tells which card section to point to (for loop was not working inside or outside function because of timing)
  var globalCounter = 0;


  //runs the generate list function which creates the list items used to select food type
  generateEntertainSelect();
  generateFoodSelect();
  buttonEnableDisable();


  //function to enable and disable the search button if not all 3 inputs are met
  function buttonEnableDisable() {

    if (searchFunSelected === true && searchFoodSelected === true && inputSearchLoc === true) {

      document.getElementById('submitBtn').disabled = false;

    } else {

      document.getElementById('submitBtn').disabled = true;
    }
    console.log(searchFunSelected)
    console.log(searchFoodSelected)
    console.log(inputSearchLoc)
  }


  //Button event for user's search.
  $("#submitBtn").click(function () {

    //Made it so the search data/text is taken and can be used.  cardHeader variable is a placeholder to demonstrate that the code is working with the page.
    //var cardHeader = $("h4");
    var userSearch = $("#searchField").val();
    //cardHeader.text(userSearch)
    // console.log(userSearch)
    //Shows container with cards after search.
    $("#card-page").show();
    yelpSearch(userSearch);
    yelpSearchEntertain(userSearch);

    //-------------------------Yelp API and functions for food--------------------------------------------------

    window.location.href = "#cardResults"
  });



  ///this is where we disable the search button if there is no input for location
  document.getElementById('searchField').oninput = function () {
    if (this.value === "") {
      inputSearchLoc = false;
      console.log("hey")
    } else {
      inputSearchLoc = true;
    }
    buttonEnableDisable();
  }

  //-------------------------Yelp API and functions--------------------------------------------------

  function yelpSearch(userSearch) {
    String.prototype.alltrim = function () { return this.replace(/\s+/g, ""); }
    var yelpQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userSearch + "&limit=5" + "&categories=" + foodChoice.alltrim().toLowerCase();
    console.log(yelpQueryURL);
    //start Ajax call  
    $.ajax({
      url: yelpQueryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
      }

    }).then(function (response) {

      var lat = response.region.center.latitude;
      var lon = response.region.center.longitude;
      //console.log("yelp", response);
      // console.log(lat, lon)

      //attaching Restaurant name to title of card
      for (i = 0; i < 5; i++) {
        var restname = $('#cardTitle' + i);
        restname.text(response.businesses[i].name);
        // var foodPic = $("<img>");
        // foodPic.attr(response.businesses[0].image_url);
        var cardRating = $('#cardSection' + i);
        cardRating.text("Rating: " + response.businesses[i].rating);
        var cardPrice = $("<p>");
        cardPrice.text("Price: " + response.businesses[i].price);
        cardRating.append(cardPrice);
        cardGlobalRating = cardRating;
      }


      //for loop that takes 50 restaraunts and pushes into a global array so we can access outside this function
      console.log(response.businesses.length);
      for (i = 0; i < response.businesses.length; i++) {
        var latitude = response.businesses[i].coordinates.latitude
        var longitude = response.businesses[i].coordinates.longitude
        // console.log("test")
        console.log(latitude, longitude)
        bingAPI(latitude,longitude)
        //console.log(bingAPI(latitude, longitude))
        searchResponse.push(response.businesses[i]);
        // console.log("search response " + JSON.stringify(searchResponse[i]))
      }

      //runs the compare loop function which takes food choice and sees if any restaraunts have that category and if so they are pushed into array        
      resultCompareLoop(foodChoice);
      console.log(matchingFoodPlace);

      console.log("//////// DISTANCE.LENGTH/////////"+distanceArray.length)

      

 //Geolocation function
      function bingAPI(latitude, longitude) {
        navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position) {
          // innerHTML = "Latitude: " + position.coords.latitude +
          //   "<br>Longitude: " + position.coords.longitude;
          // var response= response.data;
          var userLocallat = position.coords.latitude;
          var userLocallon = position.coords.longitude;

          // userLocate.push(position)




          var queryURL = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=" + userLocallat + "," + userLocallon + "&destinations=" + latitude + "," + longitude + "&travelMode=driving&distanceUnit=mi&key=At2SCR-6vENC2Cj3r4z2BPnKIwQVBbz-EtSXYqKjQCWTCF14BLLL06wG3puUnaiC"
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function (response) {
            console.log(response);
           // distanceArray.push(response);
            //console.log("this is the conents of distance array" + distanceArray);
          
            //loop through function to pull distance and times 
            // for (i = 0; i < response.resourceSets.length; i++) {
              console.log("global counter" + globalCounter);
//increments the card sections
               var cardRating = $('#cardSection' + globalCounter);
//takes travel distance from obj and makes it into local var
               var distanceTravel = response.resourceSets[0].resources[0].results[0].travelDistance;
//same same
               var travelTime = response.resourceSets[0].resources[0].results[0].travelDuration;
//Appending users travel time and distance to cards.
               var travelInfo = $("<p>");
               travelInfo.text("Distance: " + distanceTravel + " Miles    " + "Time: " + travelTime + " Minutes");
               cardRating.append(travelInfo);
//when we run bingAPI it will append to diff card
               globalCounter++;
            //   console.log("this is the length" + response.resourceSets.length)
            // }

           // console.log("THESE ARE GLOBAL distance time " + distanceTravel, travelTime)
//if globalcounter is 5 it is reset after all cards generated so if new search all cards will still work
           if(globalCounter==5){
             console.log("global counter reset")
             globalCounter=0;
           }

          })
        }
      }
    });
  }


  ////////////////FOOD SELECTS//////////////////////////////////////////////
  function generateFoodSelect() {
    for (i = 0; i < categoriesForChoose.length; i++) {
      var optionID = "foodType" + categoriesForChoose[i];
      //console.log(optionID);
      var options = document.createElement("OPTION");
      //console.log(options);
      options.id = optionID;
      options.innerHTML = categoriesForChoose[i];
      foodSelects.append(options);

    }
    document.getElementById('dropdownfoodselect').onchange = function () {
      // console.log(this.value)
      foodChoice = this.value;
      searchFoodSelected = true;
      buttonEnableDisable();
    }
  }


  ////////////////////COMPARE FOOD CHOICE TO YELP FOOD CAT///////////////////////////////////////////////////

  /////function to compare restaraunt categories to search term/////
  function resultCompareLoop(searchTerm) {
    // console.log("search term is " + searchTerm)
    //loops through all 50 restaraunts
    for (i = 0; i < searchResponse.length; i++) {
      //loops through categories in restaraunt
      for (j = 0; j < searchResponse[i].categories.length; j++) {
        //if the selected term matches restaraunt categories        
        if (searchResponse[i].categories[j].title == searchTerm) {
          //push the matching restaraunt object into the matching food place array
          matchingFoodPlace.push(searchResponse[i]);
          // console.log("added to array");
        }
        // console.log(searchResponse[i].categories[j].title);
      }
    }
  }
  ////////////////////////////////END YELP STUFF FOR FOOD////////////////////////////////////////////////////////////////////////////////

  //////start entertainment////////////

  /////////////////////function for yelp entertainment user search//////////////////////

  function yelpSearchEntertain(userSearch) {
    String.prototype.alltrim = function () { return this.replace(/\s+/g, ""); }

    var yelpQueryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userSearch + "&limit=5" + "&categories=" + entertainChoice.alltrim().toLowerCase();

    console.log(entertainChoice.alltrim().toLowerCase());
    console.log(yelpQueryURL);
    //start Ajax call  
    $.ajax({
      url: yelpQueryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
      }

    }).then(function (response) {
      console.log("yelp entertain", response);


      //attaching Entertainment name to title of card
      for (i = 5; i < 10; i++) {
        var entname = $('#cardTitle' + i);
        entname.text(response.businesses[i - 5].name);
        // var foodPic = $("<img>");
        // foodPic.attr(response.businesses[0].image_url);
        var cardRating = $('#cardSection' + i);
        cardRating.text("Rating: " + response.businesses[i - 5].rating);
        var cardPrice = $("<p>");
        cardPrice.text("Price: " + response.businesses[i - 5].price);
        cardRating.append(cardPrice);
      }


      //for loop that takes 50 restaraunts and pushes into a global array so we can access outside this function
      console.log(response.businesses.length);
      for (i = 0; i < response.businesses.length; i++) {
        searchResponseEntertain.push(response.businesses[i]);
        // console.log("search response " + JSON.stringify(searchResponse[i]))
      }

      //runs the compare loop function which takes food choice and sees if any restaraunts have that category and if so they are pushed into array        
      resultCompareLoopEntertain(entertainChoice);
      console.log(matchingEntertainPlace);

    });
  }

  ////////////////////COMPARE VENUE CHOICE TO YELP ENTERTAIN CAT///////////////////////////////////////////////////

  /////function to compare restaraunt categories to search term/////
  function resultCompareLoopEntertain(searchTerm) {
    //loops through all 50 restaraunts
    console.log("this is entertainchoice" + entertainChoice)
    console.log("this is search term" + searchTerm)
    for (i = 0; i < searchResponseEntertain.length; i++) {
      //loops through categories in restaraunt
      for (j = 0; j < searchResponseEntertain[i].categories.length; j++) {
        //if the selected term matches restaraunt categories        
        if (searchResponseEntertain[i].categories[j].title == searchTerm) {
          //push the matching restaraunt object into the matching food place array
          matchingEntertainPlace.push(searchResponseEntertain[i]);
          console.log("added to array");
        }
      }
    }
  }

  ///////////////STUFF WE CAN USE LATER MAYBE/////////////////////////////////////////////

  ////////////////////////ENTERTAIN SELECTS USE LATER MAYBE/////////////////////////////////

  function generateEntertainSelect() {
    for (i = 0; i < categoriesforFun.length; i++) {
      var optionID = "entertainType" + categoriesforFun[i];
      var options = document.createElement("OPTION");
      options.id = optionID;

      options.innerHTML = categoriesforFun[i];
      entertainSelects.append(options);
    }
    document.getElementById('dropdownentertainselect').onchange = function () {
      console.log(this.value)
      entertainChoice = this.value;
      searchFunSelected = true;
      buttonEnableDisable();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////GOOGLE MAPS API WE WANT//////////////////////////////////////////////////////////////////////////////////////////////////////

  //google maps api key AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ

  // var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyCd4rMGw53QW6U8tfSVBXMHztxnCnWJgmQ";
  // // console.log(queryURL);
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"

  // }).then(function (response) {
  //   // console.log (response);
  // });

  // //google api to get some restaurants with rating around a location
  // var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&rankby=prominence&fields=photos,formatted_address,name,rating&key=AIzaSyCZv8-G_j3tkOqJ5sIqhGFN0iYBDs-Q664";
  // // console.log(queryURL);
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"

  // }).then(function (response) {
  //   // console.log (response);
  // });

  // //google api to get some restaurants with rating around a location
  // //google places AJAX call
  // var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&rankby=prominence&fields=photos,formatted_address,name,rating&key=AIzaSyCZv8-G_j3tkOqJ5sIqhGFN0iYBDs-Q664";
  // // console.log(queryURL);
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"

  // }).then(function (response) {
  //   // console.log (response);
  // });

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




