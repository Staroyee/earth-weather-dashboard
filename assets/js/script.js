// OPEN WEATHER API KEY
var apiKey = "0e584d18f4751753861bc60159e5582b";

// FORM ELEMENT STORED IN VARIABLE
var formEl = document.getElementById('submitForm');

// EVENT-LISTENER ON FORM ELEMENT WITH FUNCTION TO GET API DATA
formEl.addEventListener('submit', function(event) {

// PREVENTS WEBPAGE FROM RELOADING
  event.preventDefault();

// VARIABLE STORING VALUE FROM HTML USER INPUT ELEMENT
  var city = document.getElementById('query').value;

// API FETCH VARIABLE WITH OPTIONS
var QueryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=&appid=" + apiKey;

 fetch(QueryUrl)
     .then(function (response) {
       if (!response.ok) {
         throw response.json();
       }
       console.log(response);
       return response.json();
      })
// SHOWS ARRAY OF FETCHED DATA IN CONSOLE
     .then(function (data) {
       getForecast(data[0].lat, data[0].lon);
       getCurrent(data[0].lat, data[0].lon);
      });
});

function getForecast(lat, lon) {
  console.log(lat);
  console.log(lon);
  var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";

  fetch(url)
  .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    console.log(response);
    return response.json();
   })
// SHOWS ARRAY OF FETCHED DATA IN CONSOLE
  .then(function (data) {
    console.log(data)
   });
};

function getCurrent(lat, lon) {
  var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";

  fetch(url)
  .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    console.log(response);
    return response.json();
   })
// SHOWS ARRAY OF FETCHED DATA IN CONSOLE
  .then(function (data) {
    console.log(data);
    console.log(data.weather[0].icon);
    console.log(data.main.temp);
    console.log(data.wind.speed);
    console.log(data.main.humidity);
    console.log(new Date(data.dt * 1000).toLocaleDateString());
    updateCurrentWeather(data);
    addToHistory(data.name);
   });
};

function addToHistory(name) {
  // CREATE LOCAL STORAGE
  const storageData = JSON.parse(localStorage.getItem("searchHistory"));
  if (!storageData || storageData.length === 0) {
    localStorage.setItem("searchHistory", JSON.stringify([name]))
  } else if (storageData.length > 0 && !storageData.includes(name)) {
    storageData.push(name);
    localStorage.setItem("searchHistory", JSON.stringify(storageData))
  } else {
    var filteredData = storageData.filter(function(entry){
           return entry !== name
    })
    console.log(filteredData)
    filteredData.push(name);
    localStorage.setItem("searchHistory", JSON.stringify(filteredData));
  }
};

function updateCurrentWeather(currentWeather) {
  
  var city = document.getElementById("currentCity");
  city.textContent = currentWeather.name;
  var date = document.getElementById("currentDate");
  date.textContent = new Date(currentWeather.dt * 1000).toLocaleDateString();
  var icon = document.getElementById("currentIcon");
  icon.src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
  var temp = document.getElementById("currentTemp");
  temp.textContent = currentWeather.main.temp;
  var wind = document.getElementById("currentWind");
  wind.textContent = currentWeather.wind.speed;
  var humidity = document.getElementById("currentHumidity");
  humidity.textContent = currentWeather.main.humidity;
  
}

