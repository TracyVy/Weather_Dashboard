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
    var cityName0 = "";
    var icon0 = "";
    var temp0 = "";
    var hum0 = "";
    var wind0 = "";
    var uv0 = "";
    var lat0 = "";
    var lon0 = "";
    var today = moment().format("MM/DD/YYYY");
    $.ajax({
      type: "GET",
      // url: `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}${apiKey}${units}`,
      url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityInput}${apiKey}${units}`,
      datatype: "JSON",
    }).then(function (response) {
      console.log(response);
      cityName0 = response.name;
      icon0 = response.weather[0].icon;
      temp0 = response.main.temp;
      hum0 = response.main.humidity;
      wind0 = response.wind.speed;
      lat0 = response.coord.lat;
      lon0 = response.coord.lon;
      $.ajax({
        type: "GET",
        url: `http://api.openweathermap.org/data/2.5/uvi?${apiKey}&lat=${lat0}&lon=${lon0}`,
        datatype: "JSON",
      }).then(function (response) {
        uv0 = response.value;
        console.log(uv0);
        $("#history").prepend(
          `<h4 style="border:thin dotted grey;">${cityInput}</h4>`
        );
        $("#daily").empty();
        $("#daily").append(
          `<h3>${cityName0} (${today})</h3><img src=http://openweathermap.org/img/w/${icon0}.png />`
        );
        $("#daily").append(`<p>Temperature: ${temp0}&#8457;</p>`);
        $("#daily").append(`<p>Humidity: ${hum0}%</p>`);
        $("#daily").append(`<p>Wind Speed: ${wind0} MPH</p>`);
        $("#daily").append(`<p>UV Index: ${uv0} </p>`);
      });
    });
  });
});

// $("#fiveDay").append(`<div>Temperature: ${temp0}</div>`);

/*  if('geolocation' in navigator) {
  /* geolocation is available */
/*} else {
  /* geolocation IS NOT available */
/* }

navigator.geolocation.getCurrentPosition((position) => {
  doSomething(position.coords.latitude, position.coords.longitude);
}); */
