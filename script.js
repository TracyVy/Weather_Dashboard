//Get doc ready for jQuery
$(document).ready(function () {
  var cityInput = "";
  var apiKey = "&APPID=59721a9077b67f8c7ef2afae98ab5d8e";
  var units = "&units=imperial";
  // var currentW = "";

  //Create an event listener and binding it
  $("#submit").on("click", function (e) {
    e.preventDefault();

    //Storing cityInput
    cityInput = $("#cityInput").val();
    console.log(cityInput);
    //Clear text from input box
    $("#cityInput").val("");

    //Basic ajax request
    /** 
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${cityInput}${apiKey}&units=imperial`,
    }).then(function (res) {
      console.log(res);
    });
*/

    var cityName = "";
    var temp = "";
    $.ajax({
      type: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}${apiKey}${units}`,
      datatype: "JSON",
    }).then(function (response) {
      console.log(response);
      cityName = response.name;
      temp = response.main.temp;
    });

    $("#daily").prepend(`<div>City: ${cityName}</div>`);
    $("#fiveDay").prepend(`<div>Temperature: ${temp}</div>`);
  });
});

/*  if('geolocation' in navigator) {
  /* geolocation is available */
/*} else {
  /* geolocation IS NOT available */
/* }

navigator.geolocation.getCurrentPosition((position) => {
  doSomething(position.coords.latitude, position.coords.longitude);
}); */
