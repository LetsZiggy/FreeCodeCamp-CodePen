// TEMP
var temp              = null;
var t                 = null;

// API URL
var ip_api            = "";
var weather_api       = "";
var moon_api          = "";

// Data
var current_date      = "";
var date              = ["YYYY", "MM", "DD"];
var time              = ["hh", "ss"];
var latitude          = "";
var longitude         = "";
var country           = "";
var city              = "";
var region            = "";
var sunrise           = "";
var sunset            = "";
var weather_id        = "";
var weather_desc      = "";
var temperature_curr  = "";
var temperature_min   = "";
var temperature_max   = "";
var temperature_sym   = 0; // 0 = kelvin, 1 = celsius, 2 = fahrenheit
var moon_phase        = "";

function getTime() {
  current_date = new Date();
  date[0] = current_date.getFullYear() ;  // Year
  date[1] = current_date.getMonth() + 1 ; // Month
  date[2] = current_date.getDate() ;      // Date
  time[0] = current_date.getHours() ;     // Hour
  time[1] = current_date.getMinutes() ;   // Minutes

  getCoordinates();
}

function getCoordinates() {
  ip_api = "https://ipinfo.io/?token=" + t;
  $.getJSON(ip_api,
            function(json) {
              temp = json["loc"].split(",");
              temp[0]   = parseFloat(temp[0]).toFixed(2);
              temp[1]   = parseFloat(temp[1]).toFixed(2);
              latitude  = "lat=" + temp[0].toString();
              longitude = "lon=" + temp[1].toString();
              country   = json["country"];
              city      = json["city"];
              region    = json["region"];

              $("#location").html(
                city.toUpperCase()
                + ', <span class="small">'
                + country.toUpperCase()
                + '</span>'
              );

              getWeather();
            }
  );
}

function getWeather() {
  weather_api = " https://fcc-weather-api.glitch.me/api/current?"
              + latitude
              + "&"
              + longitude;

  $.getJSON(weather_api,
            function(json) {
              sunrise          = json["sys"]["sunrise"];
              sunrise         *= 1000;
              sunset           = json["sys"]["sunset"];
              sunset          *= 1000;
              weather_id       = json["weather"][0]["id"];
              temperature_curr = json["main"]["temp"];
              temperature_max  = json["main"]["temp_max"];
              temperature_min  = json["main"]["temp_min"];

              getMoon();
            }
  );
}

function getMoon() {
  moon_api = "https://cors-anywhere.herokuapp.com/http://api.usno.navy.mil/moon/phase?date="
           + date[1]
           + "/"
           + date[2]
           + "/"
           + date[0]
           + "&nump=1";

  $.getJSON(moon_api, 
            function(json) {
              moon_phase = json["phasedata"][0]["phase"];
  
              setData();
            }
  );
}

function setData() {
  temperature_sym = 1;
  var red  = ((temperature_curr - temperature_min) / (temperature_max - temperature_min) * 255).toFixed(0);
  if (red < 0) { red = 0; } else if (red > 255) { red = 255; }
  var blue = 255 - red;
  if (blue < 0) { blue = 0; } else if (blue > 255) { blue = 255; }
  $("#temperature").html(
      '<div class="thermometer">'
    +   '<span class="max-temp">'
    +      (temperature_max).toFixed(1)
    +   '</span>'
    +   '<span class="min-temp">'
    +      (temperature_min).toFixed(1)
    +   '</span>'
    +   '<i class="icon wi wi-thermometer-exterior"></i>'
    +   '<i class="icon wi wi-thermometer-internal" style="color: rgb(' + red + ',0,' + blue + ');"></i>'
    + '</div>'
    + '<div class="full_width">'
    +   '<span class="temperature_num">'
    +      (temperature_curr).toFixed(1)
    +   '</span>'
    +   '<div class="temperature_icon" onclick="changeTemperature()">'
    +     '<i class="wi wi-celsius text"></i>'
    +   '</div>'
    + '</div>'
  );

  moon_phase = moon_phase.toLowerCase();
  switch (moon_phase) {
    case "new moon":
      $("#moon").html(
        '<i class="wi wi-moon-alt-new"></i><div class="full_width">'
        + moon_phase.toUpperCase() + '</div>'
      );
      break;
    case "first quarter":
      $("#moon").html(
        '<i class="wi wi-moon-alt-first-quarter"></i><div class="full_width">'
        + moon_phase.toUpperCase() + ' MOON</div>'
      );
      break;
    case "full moon":
      $("#moon").html(
        '<i class="wi wi-moon-alt-full"></i><div class="full_width">'
        + moon_phase.toUpperCase() + '</div>'
      );
      break;
    case "last quarter":
      $("#moon").html(
        '<i class="wi wi-moon-alt-third-quarter"></i><div class="full_width">'
        + moon_phase.toUpperCase() + ' MOON</div>'
      );
      break;
  }

  switch (weather_id) {
    case 200: // thunderstorm with light rain
    case 201: // thunderstorm with rain
    case 202: // thunderstorm with heavy rain
    case 210: // light thunderstorm
    case 211: // thunderstorm
    case 212: // heavy thunderstorm
    case 221: // ragged thunderstorm
    case 230: // thunderstorm with light drizzle
    case 231: // thunderstorm with drizzle
    case 232: // thunderstorm with heavy drizzle
      weather_desc = "thunderstorm";
      if (current_date < sunset) {
        // Daytime
        $("#weather").html(
          '<i class="weather wi wi-day-thunderstorm"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      else {
        // Nighttime
        $("#weather").html(
          '<i class="weather wi wi-night-alt-thunderstorm"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      break;

    case 300: // light intensity drizzle
    case 301: // drizzle
    case 302: // heavy intensity drizzle
    case 310: // light intensity drizzle rain
    case 311: // drizzle rain
    case 312: // heavy intensity drizzle rain
    case 313: // shower rain and drizzle
    case 314: // heavy shower rain and drizzle
    case 321: // shower drizzle
      weather_desc = "shower";
      if (current_date < sunset) {
        // Daytime
        $("#weather").html(
          '<i class="weather wi wi-day-showers"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      else {
        // Nighttime
        $("#weather").html(
          '<i class="weather wi wi-night-alt-showers"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      break;

    case 500: // light rain
    case 501: // moderate rain
    case 502: // heavy intensity rain
    case 503: // very heavy rain
    case 504: // extreme rain
    case 511: // freezing rain
    case 520: // light intensity shower rain
    case 521: // shower rain
    case 522: // heavy intensity shower rain
    case 531: // ragged shower rain
      weather_desc = "raining";
      if (current_date < sunset) {
        $("#weather").html(
          '<i class="weather wi wi-day-rain"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      else {
        $("#weather").html(
          '<i class="weather wi wi-night-alt-rain"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      break;

    case 600: // light snow
    case 601: // snow
    case 602: // heavy snow
    case 615: // light rain and snow
    case 616: // rain and snow
    case 620: // light shower snow
    case 621: // shower snow
    case 622: // heavy shower snow
      weather_desc = "snowing";
      if (current_date < sunset) {
        $("#weather").html(
          '<i class="weather wi wi-day-snow"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      else {
        $("#weather").html(
          '<i class="weather wi wi-night-alt-snow"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      break;

    case 611: // sleet
    case 612: // shower sleet
      weather_desc = "sleet";
      if (current_date < sunset) {
        $("#weather").html(
          '<i class="weather wi wi-day-sleet"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      else {
        $("#weather").html(
          '<i class="weather wi wi-night-alt-sleet"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      break;

    case 701: // mist
    case 741: // fog
      weather_desc = "fog";
      $("#weather").html(
        '<i class="weather wi wi-fog"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 711: // smoke
    case 721: // haze
      weather_desc = "smog";
      $("#weather").html(
        '<i class="weather wi wi-smog"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 731: // sand, dust whirls
    case 751: // sand
      weather_desc = "sandstorm";
      $("#weather").html(
        '<i class="weather wi wi-sandstorm"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 761: // dust
      weather_desc = "duststorm";
      $("#weather").html(
        '<i class="weather wi wi-dust"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 762: // volcanic ash
      weather_desc = "volcano";
      $("#weather").html(
        '<i class="weather wi wi-volcano"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 771: // squalls
    case 901: // tropical storm
    case 960: // storm
    case 961: // violent storm
      weather_desc = "squall";
      $("#weather").html(
        '<i class="weather wi wi-thunderstorm"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 781: // tornado
    case 900: // tornado
      weather_desc = "tornado";
      $("#weather").html(
        '<i class="weather wi wi-tornado"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 800: // clear sky
    case 951: // calm
      weather_desc = "clear sky";
      if (current_date < sunset) {
        $("#weather").html(
          '<i class="weather wi wi-day-sunny"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      else {
        $("#weather").html(
          '<i class="weather wi wi-night-clear"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      break;

    case 801: // few clouds
    case 802: // scattered clouds
    case 803: // broken clouds
    case 804: // overcast clouds
      weather_desc = "cloudy";
      if (current_date < sunset) {
        $("#weather").html(
          '<i class="weather wi wi-day-cloudy"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      else {
        $("#weather").html(
          '<i class="weather wi wi-night-alt-cloudy"></i><div class="full_width">'
          + weather_desc.toUpperCase() + '</div>'
        );
      }
      break;

    case 902: // hurricane
    case 962: // hurricane
      weather_desc = "hurricane";
      $("#weather").html(
        '<i class="weather wi wi-hurricane"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 903: // cold
      weather_desc = "cold wave";
      $("#weather").html(
        '<i class="weather wi wi-thermometer-exterior" style="color: blue;"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 904: // hot
      weather_desc = "heat wave";
      $("#weather").html(
        '<i class="weather wi wi-thermometer" style="color: red;"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 905: // windy
    case 952: // light breeze
    case 953: // gentle breeze
    case 954: // moderate breeze
    case 955: // fresh breeze
    case 956: // strong breeze
      weather_desc = "windy";
      $("#weather").html(
        '<i class="weather wi wi-windy"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 906: // hail
      weather_desc = "hail";
      $("#weather").html(
        '<i class="weather wi wi-hail"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;

    case 957: // high wind, near gale
    case 958: // gale
    case 959: // severe gale
      weather_desc = "gale";
      $("#weather").html(
        '<i class="weather wi wi-strong-wind"></i><div class="full_width">'
        + weather_desc.toUpperCase() + '</div>'
      );
      break;
  }

  $(".initial").addClass("hidden");
  $(".wrapper").removeClass("hidden");
}

function changeTemperature() {
  if (temperature_sym == 2) {
    temperature_sym = 1;
    $(".max-temp").html(
      (temperature_max).toFixed(1)
    );
    $(".min-temp").html(
      (temperature_min).toFixed(1)
    );
    $(".temperature_num").html(
      (temperature_curr).toFixed(1)
    );
    $(".text").removeClass("wi-fahrenheit").addClass("wi-celsius");
  }
  else if (temperature_sym == 1) {
    temperature_sym = 2;
    $(".max-temp").html(
      ((temperature_max * 9 / 5) + 32).toFixed(1)
    );
    $(".min-temp").html(
      ((temperature_min * 9 / 5) + 32).toFixed(1)
    );
    $(".temperature_num").html(
      ((temperature_curr * 9 / 5) + 32).toFixed(1)
    );
    $(".text").removeClass("wi-celsius").addClass("wi-fahrenheit");
  }
}

$(document).ready(function() {
  t = "5e65959b6266a2";
  getTime();
});