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

  //array that holes matches places within entertainment category
  var matchingEntertainPlace = [];

  //empty array that holds the whole 5 restaraunts in area
  var searchResponse = [];

  //holds 5 entertainment places
  var searchResponseEntertain = [];

  //string that is compared to restaraunt categories
  var foodChoice = "";

  //string that is compared to entertainment categories
  var entertainChoice = "";

  //sets food/entertainment selected and fun select to false so menu bar works
  var searchFoodSelected = false;
  var searchFunSelected = false;

//makes sure user types city input for search button to function
  var inputSearchLoc = false;

  //pushes 5 restauraunts into array from yelp
   var restaurantArray = [];
 //pushes 5 entertainment options into array from yelp
   var entertainmentArray = [];
//adds distance and time to an array from bing function
   var distanceTimeArray = [];
//where we push both restauraunts and entertainment options
   var combinedArray = [];

  //runs the generate select function which creates the list items used to select food type
  generateEntertainSelect();
  generateFoodSelect();
//disables and enables the search bar so user puts in all inputs 
  buttonEnableDisable();


//function to enable and disable the search button if not all 3 inputs are met
  function buttonEnableDisable() {
//if you select an entertainment option and food option and put in a city then the search button is enabled
    if (searchFunSelected === true && searchFoodSelected === true && inputSearchLoc === true) {
      document.getElementById('submitBtn').disabled = false;
    } else {
//if user does not put in all inputs search bar is disabled
      document.getElementById('submitBtn').disabled = true;
    }
  }


  //Button event for user's search.
  $("#submitBtn").click(function () {

//sets user search variable to whatever is input
    var userSearch = $("#searchField").val();
//Shows container with cards after search.
    $("#card-page").show();
//here we call the yelp search function so we show options upon submit
    yelpSearch(userSearch);

//when you click search page goes straight to cards
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
//changing search terms to match yelp categories by adjusting trim and caps
    String.prototype.alltrim = function () { return this.replace(/\s+/g, ""); }
//query database
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
//give a response
    }).then(function (response) {
     
      console.log(response);
      console.log("FUCK")
//setting var i to zero so that it can be used twice within this function
        var i=0;
//resets restaurant array to empty when function runs
        restaurantArray=[];
//push the restaurants into an array called restaurant array
        for(i;i<response.businesses.length;i++){
        restaurantArray.push(response.businesses[i]);
        }
//if we fill the restaurant array then start next ajax call for entertainment
        if(i==response.businesses.length){
           $.ajax({
             url: yelpQueryEntertainURL,
             method: "GET",
             headers: {
               Authorization: "Bearer U3DP3tTXAE_o7T9a7hSMOS4MGwikjj-Q41FB7D8gdSNu5FaUojPMLoVRDSSD09XlrU8sGL01D9uv7oP4taznIPoCt_UU7zUnnakL0xSCyNRd7Z22JLeLQLye7E7yXnYx"
             }
      
           }).then(function (secondResponse) {
            console.log(secondResponse)
//initialize j variable as a counter so it does not interact with i variable earlier in function
            var j = 0;
//empty entertainment array upon a new search
            entertainmentArray=[];
//push entertainment options into entertainment array
             for(j;j<secondResponse.businesses.length;j++){
               entertainmentArray.push(secondResponse.businesses[j]);
             }
//once we fill that array we generate the card info with the info from these arrays
               if(j==secondResponse.businesses.length){
                 generateCards();
               }
          })
        }  
  })
  }
     
//runs the compare loop function which takes food choice and sees if any restaraunts have that category and if so they are pushed into array        
  resultCompareLoop(foodChoice);

//////////////HERE WE FILL THE CARDS WITH INFO////////////////////////////////////////////////////////////

function generateCards(){
//fill the first column with restaurants
  for (i = 0; i < 5; i++) {
  //set restname to the card title and increment 
    var restname = $('#cardTitle' + i);
  //set the text to the name of the restaurant
    restname.text(restaurantArray[i].name);
//add an image for each card
    var foodPic = $("#img" + i);
//add image url attribute 
    foodPic.attr('src', restaurantArray[i].image_url);
//add the raiting to the card section
    var cardRating = $('#cardSection' + i);
//set text to card raiting
    cardRating.text("Rating: " + restaurantArray[i].rating);
//create a p tag for the price
    var cardPrice = $("<p>");
//append the price to the card
    cardPrice.text("Price: " + restaurantArray[i].price);
    cardRating.append(cardPrice);
//set global card rating to card raiting
    cardGlobalRating = cardRating;
  }
//reset combined array upon reset
  combinedArray=[];
//set L to 0 if L is less than the 10 cards increment number
  for(l=0;l<10;l++){
//put 5 restaurants info into combined array
    if(l<5){
    combinedArray.push(restaurantArray[l]);
    } else {
//put 5 entertainment info into combined array
      combinedArray.push(entertainmentArray[l-5]);
    }
  }

//when J is initialized at zero and is less than the combined array increment J
  for (j = 0; j < combinedArray.length; j++) {
//set array latitide to the combined array (entertain + food) coords
    var arrayLatitude = combinedArray[j].coordinates.latitude
//set array for entertain / food longitude
    var arrayLongitude = combinedArray[j].coordinates.longitude
//call the bing API function for the arrays and increment
    bingAPI(arrayLatitude,arrayLongitude, j)
//push search responses from both cats into combined array
    searchResponse.push(combinedArray[j]);    
  }

//fill column 2 with entertainment options
  for (k = 5; k < 10; k++) {
    var entname = $('#cardTitle' + k);
    entname.text(entertainmentArray[k - 5].name);
    var foodPic = $("#img" + k);
    foodPic.attr('src', entertainmentArray[k - 5].image_url);
    var cardRating = $('#cardSection' + k);
    cardRating.text("Rating: " + entertainmentArray[k - 5].rating);
    var cardPrice = $("<p>");
//if there is no price for an option do not show it
    cardPrice.text("Price: " + entertainmentArray[k - 5].price);
    if (entertainmentArray[k - 5].price === undefined) {
     cardPrice.hide();
    }
    cardRating.append(cardPrice);
  }
 
//runs the compare loop function which takes food choice and sees if any restaraunts have that category and if so they are pushed into array        
  resultCompareLoopEntertain(entertainChoice);
}

////////////////FOOD SELECTS//////////////////////////////////////////////
  function generateFoodSelect() {
    for (i = 0; i < categoriesForChoose.length; i++) {
      var optionID = "foodType" + categoriesForChoose[i];
      var options = document.createElement("OPTION");
      options.id = optionID;
      options.innerHTML = categoriesForChoose[i];
      foodSelects.append(options);
    }
    
    document.getElementById('dropdownfoodselect').onchange = function () {
      foodChoice = this.value;
      searchFoodSelected = true;
      buttonEnableDisable();
    }
  }

  /////function to compare restaraunt categories to search term/////
  function resultCompareLoop(searchTerm) {
    //loops through all 5 restaraunts
    for (i = 0; i < searchResponse.length; i++) {
      //loops through categories in restaraunt
      for (j = 0; j < searchResponse[i].categories.length; j++) {
        //if the selected term matches restaraunt categories        
        if (searchResponse[i].categories[j].title == searchTerm) {
          //push the matching restaraunt object into the matching food place array
          matchingFoodPlace.push(searchResponse[i]);
        }
      }
    }
  }

  /////function to compare restaraunt categories to search term/////
  function resultCompareLoopEntertain(searchTerm) {
    //loops through all 5 restaraunts
    console.log("this is entertainchoice" + entertainChoice)
    console.log("this is search term" + searchTerm)
    for (i = 0; i < searchResponseEntertain.length; i++) {
      //loops through categories in restaraunt
      for (j = 0; j < searchResponseEntertain[i].categories.length; j++) {
        //if the selected term matches restaraunt categories        
        if (searchResponseEntertain[i].categories[j].title == searchTerm) {
          //push the matching restaraunt object into the matching entertain place array
          matchingEntertainPlace.push(searchResponseEntertain[i]);
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

      var queryURL = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=" + userLocallat + "," + userLocallon + "&destinations=" + latitude + "," + longitude + "&travelMode=driving&distanceUnit=mi&key=At2SCR-6vENC2Cj3r4z2BPnKIwQVBbz-EtSXYqKjQCWTCF14BLLL06wG3puUnaiC"
      $.ajax({
        url: queryURL,
        async: false,
        method: "GET"
      }).then(function (response) {
        console.log(response);
     
//takes travel distance from obj and makes it into local var
           var distanceTravel = response.resourceSets[0].resources[0].results[0].travelDistance;
//same same
           var travelTime = response.resourceSets[0].resources[0].results[0].travelDuration;

           var distanceAndTime = [distanceTravel, travelTime];

           distanceTimeArray.push(distanceAndTime);

           var cardRating = $("#cardSection" + cardPosition);
//Appending users travel time and distance to cards.
          var travelDist = $("<p>");
          travelDist.text("Distance: " + Math.round(distanceTravel) + " Miles").appendTo(cardRating);
          var travelMin = $("<p>");
          travelMin.text("Time: " + Math.round(travelTime) + " Minutes").appendTo(travelDist);
       if(globalCounter==10){
          globalCounter=0;
       }
      })
    }
  }

});
