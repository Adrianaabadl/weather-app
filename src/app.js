function formatDate(timestamp) {
  
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if(minutes < 10) {
    minuts = `0${minutes}`
  } 

  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = date.getDay();
  return `${days[day]} ${hours}:${minutes}`;

}

function displayWeather(response) {
  //console.log(response.data.weather[0].icon);
  let temperatureElement = document.querySelector("#temperature");
  celciusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celciusTemperature);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
}




function search (city) {
let apiKey = "0e573fd4dea4803d1538fdac2ccb7c50";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);

}



function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  //console.log(cityInput.value);
search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event){
  event.preventDefault(); //to prevent to open the browser
  let temperature = document.querySelector("#temperature");
  //remove the class active the take back to the origian style
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = ( celciusTemperature * 9 )/5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event){
  event.preventDefault(); //to prevent to open the browser
  let temperature = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperature.innerHTML = Math.round(celciusTemperature);

}

let celciusTemperature = null;

let fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Santiago de Chile");