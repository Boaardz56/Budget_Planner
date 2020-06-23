
//working national park service AJAX call

var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=qcE8d6F20uPnRxCHeTizvaUcp5ZzbYiCqValJs8Y";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});



//Getting an object with a list of countries.
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://countries-cities.p.rapidapi.com/location/country/list?format=json",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "countries-cities.p.rapidapi.com",
        "x-rapidapi-key": "eec2f665f6msh2d3f36fae53a543p11853ajsn8b422c1ada74"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});


//Getting list of cities.
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://countries-cities.p.rapidapi.com/location/country/US/city/list?page=2&per_page=20&format=json&population=1",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "countries-cities.p.rapidapi.com",
        "x-rapidapi-key": "eec2f665f6msh2d3f36fae53a543p11853ajsn8b422c1ada74"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});