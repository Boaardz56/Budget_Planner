# Night Life
## Project 1
### Team JARS- Sarah, Alex, Jackie, Richenda
## Description
Offers user the chance to plan an outing in a local or unfamiliar area based on their current location. Choose through an array of food types and entertainment venues. An easy to use application appropriate for any setting.
## Languages
- HTML
- CSS
- JavaScript
### APIs used
- [YelpAPI](https://rapidapi.com/blog/yelp-fusion-api-profile-pull-local-business-data/) was used to retrieve buisness name, price information, rating and the location of each establishment.
- [BingAPI](https://docs.microsoft.com/en-us/bingmaps/rest-services/routes/calculate-a-distance-matrix?redirectedfrom=MSDN) distance matrix API was used to calculate the distance and time between users and their prospective destinations.
- HTML5 built in geolocation was used to get users current location.

## Libraries
[Foundation Wireframe](https://get.foundation/develop/getting-started.html)

[Google Fonts](https://fonts.google.com/)

## Method
Used HTML to create a series of rows and columns to organize search result cards. In the javascript file, we created global variables that can be accessed by entire file. Click function is disabled until user inputs location, foods and entertainment. Yelp API based on userSearch is called in the click function which also gives us the latitude and longitude variables of the business locations. All information returned from Yelp API is for looped to extract pertinent data.

Inside the BingAPI function the geolocation API is utilized to get current userlocation. These are stored in the variables userLocallat and userLocallon which are added to the bing query URL. This returns the distance between the two locations.

Seperate for loops were created to append price, rating,  buisness name and distance/time values to cards.

Finally, CSS was used for styling purposes.

![](images/NightLife_Gif.gif)

https://boaardz56.github.io/Nightlife/

