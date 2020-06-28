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
  var categoriesforFun = ["Choose Entertainment", "Bars", "Movie Theaters", "Galleries", "Museums", "Music Venues", "Theater", "Race Tracks"]

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

   var restaurantArray = [];

   var entertainmentArray = [];

   var distanceTimeArray = [];

   var combinedArray = [];

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
   // yelpSearchEntertain(userSearch);

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
    var yelpQueryEntertainURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + userSearch + "&limit=5" + "&categories=" + entertainChoice.alltrim().toLowerCase();
    console.log(yelpQueryURL);
    //start Ajax call 
    $.ajax({
      url: yelpQueryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
      }

    }).then(function (response) {
     
      console.log(response);
      console.log("FUCK")
        var i=0;
        for(i;i<response.businesses.length;i++){
        restaurantArray.push(response.businesses[i]);
        console.log("restaurant array " + restaurantArray)
        console.log("name check " + restaurantArray[i].name)
        }
        if(i==response.businesses.length){
            console.log("second loop???")
           $.ajax({
             url: yelpQueryEntertainURL,
             method: "GET",
             headers: {
               Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
             }
      
           }).then(function (secondResponse) {
            console.log(secondResponse)
            var j = 0;
             for(j;j<secondResponse.businesses.length;j++){
              
               entertainmentArray.push(secondResponse.businesses[j]);
               console.log("entertainment array " + entertainmentArray)

             }
               if(j==secondResponse.businesses.length){
                 generateCards();
               }
          })
        }  
  })
  }

      //runs the compare loop function which takes food choice and sees if any restaraunts have that category and if so they are pushed into array        
      resultCompareLoop(foodChoice);
      // resultCompareLoop(entertainChoice);
      console.log(matchingFoodPlace);

//////////////////////////////////////////////////////////////////////////

function generateCards(){

  for (i = 0; i < 5; i++) {
    var restname = $('#cardTitle' + i);
    console.log("restname =" + restname);
    console.log("restaurant array= "+restaurantArray)
    restname.text(restaurantArray[i].name);

    console.log("business name" + restaurantArray[i].name)
    // var foodPic = $("<img>");
    // foodPic.attr(response.businesses[0].image_url);
    var cardRating = $('#cardSection' + i);
    cardRating.text("Rating: " + restaurantArray[i].rating);
    var cardPrice = $("<p>");
    cardPrice.text("Price: " + restaurantArray[i].price);
    cardRating.append(cardPrice);
    cardGlobalRating = cardRating;
  }
  for(l=0;l<10;l++){
    if(l<5){
    combinedArray.push(restaurantArray[l]);
    } else {
      combinedArray.push(entertainmentArray[l-5]);
    }
  }


  for (j = 0; j < combinedArray.length; j++) {
    var arrayLatitude = combinedArray[j].coordinates.latitude
    console.log("response" + j + " lat = " + combinedArray[j].coordinates.latitude)
    var arrayLongitude = combinedArray[j].coordinates.longitude
    // console.log("test")
    console.log(arrayLatitude, arrayLongitude)
    bingAPI(arrayLatitude,arrayLongitude, j)
    //console.log(bingAPI(latitude, longitude))
    searchResponse.push(combinedArray[j]);
    // console.log("search response " + JSON.stringify(searchResponse[i]))
    console.log("VALUE OF J " + j)
    
  }

  for (k = 5; k < 10; k++) {
    var entname = $('#cardTitle' + k);
    entname.text(entertainmentArray[k - 5].name);
    // var foodPic = $("<img>");
    // foodPic.attr(response.businesses[0].image_url);
    var cardRating = $('#cardSection' + k);
    cardRating.text("Rating: " + entertainmentArray[k - 5].rating);
    var cardPrice = $("<p>");
    cardPrice.text("Price: " + entertainmentArray[k - 5].price);
    cardRating.append(cardPrice);
  }
 
  //runs the compare loop function which takes food choice and sees if any restaraunts have that category and if so they are pushed into array        
  resultCompareLoopEntertain(entertainChoice);
  console.log(matchingEntertainPlace);

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
          //push the matching restaraunt object into the matching entertain place array
          matchingEntertainPlace.push(searchResponseEntertain[i]);
          console.log("added to array");
        }
      }
    }
  }

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

  //////////////////////GEOLOCATE STUFF HERE/////////////////////////////////////////////////////////////


  //Geolocation function
  function bingAPI(latitude, longitude, cardPosition) {
    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
      var userLocallat = position.coords.latitude;
      var userLocallon = position.coords.longitude;
      console.log("our position: " + userLocallat, userLocallon)

      // userLocate.push(position)


      var queryURL = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=" + userLocallat + "," + userLocallon + "&destinations=" + latitude + "," + longitude + "&travelMode=driving&distanceUnit=mi&key=At2SCR-6vENC2Cj3r4z2BPnKIwQVBbz-EtSXYqKjQCWTCF14BLLL06wG3puUnaiC"
      $.ajax({
        url: queryURL,
        async: false,
        method: "GET"
      }).then(function (response) {
        console.log(response);

//increments the card sections
     
//takes travel distance from obj and makes it into local var
           var distanceTravel = response.resourceSets[0].resources[0].results[0].travelDistance;
//same same
           var travelTime = response.resourceSets[0].resources[0].results[0].travelDuration;

           var distanceAndTime = [distanceTravel, travelTime];

           distanceTimeArray.push(distanceAndTime);
           console.log("////DIST AND TIME////" + distanceAndTime)
          // return distanceAndTime;

           var cardRating = $("#cardSection" + cardPosition);
           console.log("cardRating: " + cardRating)
//Appending users travel time and distance to cards.
           var travelInfo = $("<p>");
           console.log("distance travel = " + distanceTravel + " travel time = " + travelTime)
           travelInfo.text("Distance: " + Math.round(distanceTravel) + " Miles    " + "Time: " + Math.round(travelTime) + " Minutes");
           cardRating.append(travelInfo);
       if(globalCounter==10){
         console.log("global counter reset")
          globalCounter=0;
       }
      })
    }
  }



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