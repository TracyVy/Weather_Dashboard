//Get doc ready for jQuery
$(document).ready(function () {
  var cityInput = "";
  var apiKey = "&APPID=59721a9077b67f8c7ef2afae98ab5d8e";
  var units = "&units=imperial";

  for (var i = 0; i < localStorage.length; i++) {
    var keyValue = localStorage.getItem(localStorage.key(i));
    console.log(keyValue);
    $("#history").prepend(
      `<button><h5 style="text-align: left;">${keyValue}</h5></button>`
    );
  }

  //Create an event listener and binding it
  $("#submit").on("click", function (e) {
    e.preventDefault();

    //Storing cityInput
    cityInput = $("#cityInput").val();
    console.log(cityInput);
    //Clear text from input box
    $("#cityInput").val("");

    //Basic ajax request
    var today = moment().format("MM/DD/YYYY");
    var today1 = moment(today).add(1, "days").format("MM/DD/YYYY");
    var today2 = moment(today).add(2, "days").format("MM/DD/YYYY");
    var today3 = moment(today).add(3, "days").format("MM/DD/YYYY");
    var today4 = moment(today).add(4, "days").format("MM/DD/YYYY");
    var today5 = moment(today).add(5, "days").format("MM/DD/YYYY");
    var cityName = "";
    var icon0 = "";
    var temp0 = "";
    var hum0 = "";
    var wind0 = "";
    var uv0 = "";
    var icon1 = "";
    var temp1 = "";
    var hum1 = "";
    var icon2 = "";
    var temp2 = "";
    var hum2 = "";
    var icon3 = "";
    var temp3 = "";
    var hum3 = "";
    var icon4 = "";
    var temp4 = "";
    var hum4 = "";
    var icon5 = "";
    var temp5 = "";
    var hum5 = "";
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}${apiKey}${units}`,
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
        var key = moment().format("MM/DD/YY h:m s a");
        localStorage.setItem(key, cityName);
        $("#history").prepend(
          `<button><h4 style="text-align: left;">${cityName}</h4></button>`
        );
        icon0 = res.daily[0].weather[0].icon;
        temp0 = res.daily[0].temp.day;
        hum0 = res.daily[0].humidity;
        wind0 = res.daily[0].wind_speed;
        uv0 = res.daily[0].uvi;
        icon1 = res.daily[1].weather[0].icon;
        temp1 = res.daily[1].temp.day;
        hum1 = res.daily[1].humidity;
        icon2 = res.daily[2].weather[0].icon;
        temp2 = res.daily[2].temp.day;
        hum2 = res.daily[2].humidity;
        console.log(hum2);
        icon3 = res.daily[3].weather[0].icon;
        temp3 = res.daily[3].temp.day;
        hum3 = res.daily[3].humidity;
        icon4 = res.daily[4].weather[0].icon;
        temp4 = res.daily[4].temp.day;
        hum4 = res.daily[4].humidity;
        icon5 = res.daily[5].weather[0].icon;
        temp5 = res.daily[5].temp.day;
        hum5 = res.daily[5].humidity;
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
