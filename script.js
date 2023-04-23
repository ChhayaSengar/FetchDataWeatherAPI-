const lat = document.getElementById('lat');
const long = document.getElementById('long');
const map = document.getElementById('googleMap');
const dataWeather = document.getElementById('data1');
let latitude;
let longitude;
const WeatherApiKey = "876a3a9a1a38185329aa680f304ccfa2";

const W_D = function getLocation() {
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position){
  
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    //here we show first - lat and long of map
    // document.('.long').style.color = "white";
    // lat.innerHTML = "Lat: " + latitude;
    // long.innerHTML = "long: " + longitude;

    // Displaying lat and long of aboutmap
    lat.textContent = "Lat: " + latitude;
    long.textContent = "long: " + longitude;
// here i call the function
    displayMap(latitude, longitude);
    fetchWeatherData(latitude, longitude);
    
    // u can write function inside the function or outside
    // function displayMap(latitude, longitude) {
    //   const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
    //   const iframe = document.createElement('iframe');
    //   iframe.setAttribute('src', mapUrl);
    //   iframe.setAttribute('width', '100%');
    //   iframe.setAttribute('height', '100%');
    //   iframe.setAttribute('frameborder', '0');
    //   iframe.setAttribute('style', 'border:0');
    //   map.appendChild(iframe);
    // }

}

function displayMap(latitude, longitude) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', mapUrl);
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '100%');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('style', 'border:0');
  map.appendChild(iframe);
}

function fetchWeatherData(latitude, longitude) {
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WeatherApiKey}`;
 
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('Location_name').innerHTML = "Location: " + data.name + " " + data.sys.country;
      document.getElementById('Time_Zone').innerHTML = "TimeZone: " + data.timezone;
      document.getElementById('lati').innerHTML = "Lat: " + data.coord.lat;
      document.getElementById('longi').innerHTML = "Long: " + data.coord.lon;
      document.getElementById('Wind_Speed').innerHTML = "Wind Speed: " + data.wind.speed;
      document.getElementById('Pressure').innerHTML = "Pressure: " + data.main.pressure;
      document.getElementById('Humidity').innerHTML = "Humidity: " + data.main.humidity;
      document.getElementById('Wind_Direction').innerHTML = "Wind Direction: " + data.wind.deg + " deg";
      document.getElementById('UV_Index').innerHTML = "UV Index: " + data.weather[0].description;
      document.getElementById('Feels_like').innerHTML = "Feels Like: " + data.main.feels_like;
    })
    .catch(error => {
      console.log(error);
    });

  }

W_D();


