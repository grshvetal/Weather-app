$("document").ready(function () {
  var latitude, longitude, place, location_api_link, weather_api_link;

  //-----getting geolocation data -------------------------

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      //--- Using Google Georeversecoding API to get the place names
      location_api_link =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        latitude +
        "," +
        longitude +
        "&key=AIzaSyDfEjTOUzG_DesuWDqz5bkGkQibDSad39M";
      $.getJSON(location_api_link, function (locationData) {
        var place_local, place_state;
        // extracts place and state name from the json data
        for (var i = 0; i < locationData.results[0].address_components.length; i++) {
          if (locationData.results[0].address_components[i].types[0] === "locality") {
            place_local = locationData.results[0].address_components[i].long_name;
            locationData.results[0].address_components[i].long_name;
          }
          if (
            locationData.results[0].address_components[i].types[0] ===
            "administrative_area_level_1"
          ) {
            place_state = locationData.results[0].address_components[i].long_name;
          }
        }
        place = place_local + ", " + place_state;
        $("#place").html(place);
      }); 

      //---- Using the Weather API to get the weather data

      weather_api_link =
        "https://api.forecast.io/forecast/a00ba813edd03ccdf7574542c6bbbe69/" +
        latitude +
        "," +
        longitude +
        "?callback=?";
      $.getJSON(weather_api_link, function (weatherdata) {
        var summary = weatherdata.currently.summary;
        var icon =
          '<i class="wi wi-forecast-io-' +
          weatherdata.currently.icon +
          '"></i>';
        var temperatureF = Math.round(weatherdata.currently.temperature);
        var temperatureC = Math.round(
          (weatherdata.currently.temperature - 32) / (9 / 5)
        );
        var temperature = temperatureC + "°C";
        $("#icon").html(icon);
        $("#summary").html(summary);
        $("#temperature").html(temperature);

        // changing background according to current weather
        
        var background;
        switch (weatherdata.currently.icon) {
          case "clear-day":
            background =
              "url(https://www.dropbox.com/s/2171zqudweg5vld/clear-day-64.png?raw=1)";
            break;
          case "clear-night":
            background =
              "url(https://www.dropbox.com/s/9wf7cgvfo8ja54i/clear-night-64.png?raw=1)";
            break;
          case "rain":
            background =
              "url(https://www.dropbox.com/s/vpweg2l3xa4ran6/rain-64.png?raw=1)";
            break;
          case "snow":
            background =
              "url(https://www.dropbox.com/s/51980ria4odme22/snow-64.png?raw=1)";
            break;
          case "sleet":
            background =
              "url(https://www.dropbox.com/s/gqyfz2q8jdkv13i/sleet-64.png?raw=1)";
            break;
          case "wind":
            background =
              "url(https://www.dropbox.com/s/1xndz17h4bdx8wl/wind-64.png?raw=1)";
            break;
          case "fog":
            background =
              "url(https://www.dropbox.com/s/d946kwkraco8htr/fog-64.png?raw=1)";
            break;
          case "cloudy":
            background =
              "url(https://www.dropbox.com/s/onhw6ehmdopsbt1/cloudy-64.png?raw=1)";
            break;
          case "partly-cloudy-day":
            background =
              "url(https://www.dropbox.com/s/fnsw50f5gcm2uxh/partly-cloudy-day-64.png?raw=1)";
            break;
          case "partly-cloudy-night":
            background =
              "url(https://www.dropbox.com/s/swrdtlpihseutj5/partly-cloudy-night-64.png?raw=1)";
            break;
          case "hail":
            background =
              "url(https://www.dropbox.com/s/ej77mp1dt0qwvzg/hail-64.png?raw=1)";
            break;
          case "thunderstorm":
            background =
              "url(https://www.dropbox.com/s/v8czqdrwbs7ttgh/thunderstorm-64.png?raw=1)";
            break;
          case "tornado":
            background =
              "url(https://www.dropbox.com/s/d0hrt16glegxaw1/tornado-64.png?raw=1)";
            break;
        }
        $("body").css("background-image", background);
        //Dynamic favicon
        var faviconLink = background.slice(4, background.length-1);
        console.log(faviconLink);
        $("link[rel='shortcut icon']").attr("href", faviconLink);

        // Fehrenheit button action
        $("#btn_fahrenheit").on("click", function () {
          $("#temperature").html(temperatureF + "°F");
          $("#btn_fahrenheit").removeClass("btn_off");
          $("#btn_fahrenheit").addClass("btn_on");
          $("#btn_celsius").removeClass("btn_on");
          $("#btn_celsius").addClass("btn_off");
        });
        // Celsius button action
        $("#btn_celsius").on("click", function () {
          $("#temperature").html(temperatureC + "°C");
          $("#btn_fahrenheit").removeClass("btn_on");
          $("#btn_fahrenheit").addClass("btn_off");
          $("#btn_celsius").removeClass("btn_off");
          $("#btn_celsius").addClass("btn_on");
        });
      }); //getJSON of Weather API ends
    }); //getCurrent.position ends
  } // If ends

  // Setting a background image according to day-night
  var date = new Date();
  var current_hour = date.getHours();
  if (current_hour >= 18 || current_hour <= 7) {
    $("body").css("background", "#282a36");
    $("body").css("color", "yellow");
  } 
}); //document.ready ends
