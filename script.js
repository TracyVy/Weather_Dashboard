//Get doc ready for jQuery
var cityInput = "";
var apiKey = "&APPID=59721a9077b67f8c7ef2afae98ab5d8e";
var units = "&units=imperial";

$(document).ready(function () {
  var keyValue = "";
  for (var i = 0; i < localStorage.length; i++) {
    keyValue = localStorage.getItem(localStorage.key(i));
    console.log(keyValue);

    $("#history").prepend(
      `<button  onclick="getWeather('${keyValue}')" class="city-button"><h5 style="text-align: left;">${keyValue}</h5></button>`
    );
  }

  getWeather(keyValue);

  //Create an event listener and binding it
  $("#submit").on("click", function (e) {
    e.preventDefault();

    //Storing cityInput
    cityInput = $("#cityInput").val();
    console.log(cityInput);

    //Clear text from input box
    $("#cityInput").val("");

    // Get the weather and update the UI
    getWeather(cityInput);

    // Display last city searched
    $("#history").prepend(
      `<button onclick="getWeather('${cityInput}')" class="city-button"><h5 style="text-align:left;">${cityInput}</h4></button>`
    );

    // Persist value into locale storage
    var key = moment().format("MM/DD/YY hh:mm ss a");
    localStorage.setItem(key, cityInput);
  });
});

function getWeather(cityName) {
  console.log("cityName=" + cityName);

  //Basic ajax request
  var today = moment().format("MM/DD/YYYY");
  var today1 = moment(today).add(1, "days").format("MM/DD/YYYY");
  var today2 = moment(today).add(2, "days").format("MM/DD/YYYY");
  var today3 = moment(today).add(3, "days").format("MM/DD/YYYY");
  var today4 = moment(today).add(4, "days").format("MM/DD/YYYY");
  var today5 = moment(today).add(5, "days").format("MM/DD/YYYY");
  //var cityName = "";

  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}${apiKey}${units}`,
    datatype: "JSON",
  }).then(function (response) {
    console.log(response);
    lat = response.coord.lat;
    lon = response.coord.lon;
    // API call to get UV index requires lat & lon
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely${apiKey}${units}`,
      datatype: "JSON",
    }).then(function (res) {
      console.log(res);
      cityName = response.name;
      var icon0 = res.daily[0].weather[0].icon;
      var temp0 = res.daily[0].temp.day;
      var hum0 = res.daily[0].humidity;
      var wind0 = res.daily[0].wind_speed;
      var uv0 = res.daily[0].uvi;
      var icon1 = res.daily[1].weather[0].icon;
      var temp1 = res.daily[1].temp.day;
      var hum1 = res.daily[1].humidity;
      var icon2 = res.daily[2].weather[0].icon;
      var temp2 = res.daily[2].temp.day;
      var hum2 = res.daily[2].humidity;
      console.log(hum2);
      var icon3 = res.daily[3].weather[0].icon;
      var temp3 = res.daily[3].temp.day;
      var hum3 = res.daily[3].humidity;
      var icon4 = res.daily[4].weather[0].icon;
      var temp4 = res.daily[4].temp.day;
      var hum4 = res.daily[4].humidity;
      var icon5 = res.daily[5].weather[0].icon;
      var temp5 = res.daily[5].temp.day;
      var hum5 = res.daily[5].humidity;
      console.log([temp1, temp2, temp3, temp4, temp5]);
      $("#daily").empty();
      $("#daily").append(
        `<h3>${cityName} (${today})</h3><img src=http://openweathermap.org/img/w/${icon0}.png />`
      );
      $("#daily").append(`<p>Temperature: ${temp0}&#8457;</p>`);
      $("#daily").append(`<p>Humidity: ${hum0}%</p>`);
      $("#daily").append(`<p>Wind Speed: ${wind0} MPH</p>`);
      $("#daily").append(`<p>UV Index: ${uv0} </p>`);
      $("#fiveDay").html(`<h4>5-Day Forecast:</h4>`);
      $("#forecast1").empty();
      $("#forecast2").empty();
      $("#forecast3").empty();
      $("#forecast4").empty();
      $("#forecast5").empty();
      $("#forecast1").append(`<h5>${today1}</h5>`);
      $("#forecast1").append(
        `<img src=http://openweathermap.org/img/w/${icon1}.png />`
      );
      $("#forecast1").append(`<p>Temp: ${temp1}&#8457;</p>`);
      $("#forecast1").append(`<p>Humidity: ${hum1}%</p>`);
      $("#forecast2").append(`<h5>${today2}</h5>`);
      $("#forecast2").append(
        `<img src=http://openweathermap.org/img/w/${icon2}.png />`
      );
      $("#forecast2").append(`<p>Temp: ${temp2}&#8457;</p>`);
      $("#forecast2").append(`<p>Humidity: ${hum2}%</p>`);
      $("#forecast3").append(`<h5>${today3}</h5>`);
      $("#forecast3").append(
        `<img src=http://openweathermap.org/img/w/${icon3}.png />`
      );
      $("#forecast3").append(`<p>Temp: ${temp3}&#8457;</p>`);
      $("#forecast3").append(`<p>Humidity: ${hum3}%</p>`);
      $("#forecast4").append(`<h5>${today4}</h5>`);
      $("#forecast4").append(
        `<img src=http://openweathermap.org/img/w/${icon4}.png />`
      );
      $("#forecast4").append(`<p>Temp: ${temp4}&#8457;</p>`);
      $("#forecast4").append(`<p>Humidity: ${hum4}%</p>`);
      $("#forecast5").append(`<h5>${today5}</h5>`);
      $("#forecast5").append(
        `<img src=http://openweathermap.org/img/w/${icon5}.png />`
      );
      $("#forecast5").append(`<p>Temp: ${temp5}&#8457;</p>`);
      $("#forecast5").append(`<p>Humidity: ${hum5}%</p>`);
    });
  });
}

/*  if('geolocation' in navigator) {
  /* geolocation is available */
/*} else {
  /* geolocation IS NOT available */
/* }

navigator.geolocation.getCurrentPosition((position) => {
  doSomething(position.coords.latitude, position.coords.longitude);
}); */
