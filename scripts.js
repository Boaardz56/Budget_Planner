
//working national park service AJAX call

var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=qcE8d6F20uPnRxCHeTizvaUcp5ZzbYiCqValJs8Y";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
console.log (response);
});


//trails api not working cross origin ref
 var APIKey = "8c360f11femshd6bee130a2f26b1p1ca187jsn90567bb8ec6a";
  var queryURL ="https://trailapi-trailapi.p.rapidapi.com/trails/explore/" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  console.log (response);
  });




  

  