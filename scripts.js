

//working national park service AJAX call

var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=qcE8d6F20uPnRxCHeTizvaUcp5ZzbYiCqValJs8Y";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
console.log (response);
});

  

  