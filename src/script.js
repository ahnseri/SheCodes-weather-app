function formatDateTime(date) {
  let daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let getDay = daysOfWeek[date.getDay()];
  let monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let getMonth = monthsOfYear[date.getMonth()];
  let getDate = date.getDate();
  //--toLocalTimeString MDN
  let getTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${getDay}, ${getMonth} ${getDate} | ${getTime}`;
}

//--Change City
function logTemperature(response) {
  document.querySelector("#display-city-name").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-des").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
}

function search(city) {
  let units = "metric";
  let apiKey = "264d058cf40518d3759e3102bcc572cf";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(logTemperature);
}

function logCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

//--Find current location
function loadLocation(event) {
  event.preventDefault();
  function findLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "264d058cf40518d3759e3102bcc572cf";
    let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=`;
    let apiUrl = `${apiEndpoint}&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(logTemperature);
  }
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentDateTime = document.querySelector("#display-date-time");
let dateTimeStamp = new Date();
currentDateTime.innerHTML = formatDateTime(dateTimeStamp);

//--Change City
let searchForm = document.querySelector("#change-city-form");
searchForm.addEventListener("submit", logCity);

//--Change city search button
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", logCity);

//--User current location
let userLocation = document.querySelector("#current-location");
userLocation.addEventListener("click", loadLocation);

//--Default city on load
search("Seoul");
//--Convert Celsius & Fahrenheit
