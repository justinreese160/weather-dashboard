var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "307e7b2e895662e4dd4a4b5de2b6c337";
var citySearchEl = document.getElementById("searchBar");
var currenWeatherContainer = document.getElementById("currentWeatherContainer");
var weatherIconURL = "https://openweathermap.org/img/wn/";
var searchButton = document.getElementById("searchButton");
var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var userInput;
var saveCity = [];
var savedCity = document.getElementById("savedCity");
var cardBody = document.getElementsByClassName("card-body")

function getApi() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      userInput +
      "&units=imperial&appid=307e7b2e895662e4dd4a4b5de2b6c337"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayCurrentWeather(data);

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&exclude={part}&units=imperial&appid=307e7b2e895662e4dd4a4b5de2b6c337"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data2) {
          console.log(data2);
          currenWeatherContainer.innerHTML +=
            "<p> UVI: " + data2.current.uvi + "</p>";
          displayForecastWeather(data2);
        });
    });
}

function check() {
  if (localStorage.getItem("cities") != null)
    return JSON.parse(localStorage.getItem("cities"));
  else return saveCity;
}

function save() {
  saveCity = check();
  saveCity.unshift(userInput);
  if (saveCity.length > 5) {
    saveCity.pop();
    localStorage.setItem("cities", JSON.stringify(saveCity));
  } else {
    localStorage.setItem("cities", JSON.stringify(saveCity));
  }
}

function displaySave() {
  saveCity = check();
  for (let i = 0; i < saveCity.length; i++) {
    var button = document.createElement("button");
    button.innerHTML = saveCity[i];
    savedCity.appendChild(button);
  }
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  userInput = citySearchEl.value;
  console.log(userInput);
  getApi();
  save();
  displaySave();
});

savedCity.addEventListener("click", function (event) {
  event.preventDefault();
  userInput = event.target.textContent;
  upDateDiv();
  getApi();
  save();
  check();
  console.log(event.target);
});

function upDateDiv() {
  savedCity.innerHTML = "";
  currenWeatherContainer.innerHTML = "";
  day1.innerHTML = "";
  day2.innerHTML = "";
  day3.innerHTML = "";
  day4.innerHTML = "";
  day5.innerHTML = "";
}

function displayCurrentWeather(response) {
  var today = new Date();
  var iconURL = weatherIconURL + response.weather[0].icon + "@2x.png";
  currenWeatherContainer.innerHTML +=
    "<h1>" +
    response.name +
    today.toLocaleDateString() +
    "<img src = " +
    iconURL +
    "></h1>";
  currenWeatherContainer.innerHTML += "<p> Temp: " + response.main.temp + "<p>";
  currenWeatherContainer.innerHTML +=
    "<p> Wind: " + response.wind.speed + "<p>";
  currenWeatherContainer.innerHTML +=
    "<p> Humidty: " + response.main.humidity + "<p>";
}

function displayForecastWeather(response) {
  var iconURL = weatherIconURL + response.daily[0].weather[0].icon + "@2x.png";
  day1.innerHTML += "<h1>" + "<img src = " + iconURL + "></h1>";
  day1.innerHTML += "<p> Temp: " + response.daily[0].temp.day + "<p>";
  day1.innerHTML += "<p> Wind: " + response.daily[0].wind_speed + "<p>";
  day1.innerHTML += "<p> Humidty: " + response.daily[0].humidity + "<p>";

  day1.style.display = "initial";

  day2.innerHTML += "<h1>" + "<img src = " + iconURL + "></h1>";
  day2.innerHTML += "<p> Temp: " + response.daily[1].temp.day + "<p>";
  day2.innerHTML += "<p> Wind: " + response.daily[1].wind_speed + "<p>";
  day2.innerHTML += "<p> Humidty: " + response.daily[1].humidity + "<p>";

  day1.style.display = "initial";

  day3.innerHTML += "<h1>" + "<img src = " + iconURL + "></h1>";
  day3.innerHTML += "<p> Temp: " + response.daily[2].temp.day + "<p>";
  day3.innerHTML += "<p> Wind: " + response.daily[2].wind_speed + "<p>";
  day3.innerHTML += "<p> Humidty: " + response.daily[2].humidity + "<p>";

  day2.style.display = "initial";

  day4.innerHTML += "<h1>" + "<img src = " + iconURL + "></h1>";
  day4.innerHTML += "<p> Temp: " + response.daily[3].temp.day + "<p>";
  day4.innerHTML += "<p> Wind: " + response.daily[3].wind_speed + "<p>";
  day4.innerHTML += "<p> Humidty: " + response.daily[3].humidity + "<p>";

  day1.style.display = "initial";

  day5.innerHTML += "<h1>" + "<img src = " + iconURL + "></h1>";
  day5.innerHTML += "<p> Temp: " + response.daily[4].temp.day + "<p>";
  day5.innerHTML += "<p> Wind: " + response.daily[4].wind_speed + "<p>";
  day5.innerHTML += "<p> Humidty: " + response.daily[4].humidity + "<p>";

  day5.style.display = "initial";
}
