var isCelsius = true;
function GetInfo() {
  var newName = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = "--" + newName.value + "--";

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      newName.value +
      "&appid=32ba0bfed592484379e51106cef3f204"
  )
  .then((response) => response.json())
  .then((data) => {
    // Getting the min and max values for each day
    for (i = 0; i < 5; i++) {
      var minTemp = data.list[i].main.temp_min;
      var maxTemp = data.list[i].main.temp_max;

      if (isCelsius) {
        minTemp = minTemp - 273.15;
        maxTemp = maxTemp - 273.15;
      } else {
        minTemp = (minTemp * 9) / 5 - 459.67;
        maxTemp = (maxTemp * 9) / 5 - 459.67;
      }

      document.getElementById("day" + (i + 1) + "Min").innerHTML =
        "Min: " + minTemp.toFixed(1) + (isCelsius ? "°C" : "°F");
        
      document.getElementById("day" + (i + 1) + "Max").innerHTML =
        "Max: " + maxTemp.toFixed(1) + (isCelsius ? "°C" : "°F");
    }

      //------------------------------------------------------------

      //Getting Weather Icons
      for (i = 0; i < 5; i++) {
        document.getElementById("img" + (i + 1)).src =
          "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }
      //------------------------------------------------------------
      console.log(data);
    })

    .catch((err) =>
      alert("Something Went Wrong: Try Checking Your Internet Coneciton")
    );
}

function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "London";
  GetInfo();
}

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    GetInfo();
  }