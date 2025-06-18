const searchInput = document.getElementById("input-user");
const cityName = document.querySelector(".city");
const cityTemp = document.querySelector(".temp");
const cityHumidity = document.querySelector(".humidity");
const cityWind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const weatherData = document.querySelector(".weather");
const weatherError = document.querySelector(".error");
const loadingText = document.querySelector(".loading");
const searchBtn = document.getElementById("search-btn");

const apiKey = "71a96156072b281e191005f39706fd65";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const checkWeather = async () => {
    try {
        const inputValue = searchInput.value.trim();
        if (!inputValue) {
            alert("Please enter a city name!");
            return;
        }

        const response = await fetch(apiUrl + inputValue + `&appid=${apiKey}`);
        loadingText.style.display = "block";

        if (response.status === 404) {
            weatherError.style.display = "block";
            weatherData.style.display = "none";
        }
        const data = await response.json();
        showLatestCity(data);
    }
    catch (err) {
        alert("City no found!");
        console.log(`Creature not found: ${err}`);
    }
    finally {
        loadingText.style.display = "none";
    }
}

const showLatestCity = (data) => {
    cityName.innerHTML = data.name;
    cityTemp.innerHTML = Math.floor(data.main.temp) + "°C";
    cityHumidity.innerHTML = data.main.humidity + "%";
    cityWind.innerHTML = data.wind.speed + "km/hr";

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "clouds.png";
    }
    else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "clear.png";
    }
    else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "drizzle.png";
    }
    else if (data.weather[0].main === "Humidity") {
        weatherIcon.src = "humidity.png";
    }
    else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "mist.png";
    }
    else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "rain.png";
    }
    else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "snow.png";
    }
    else if (data.weather[0].main === "Wind") {
        weatherIcon.src = "wind.png";
    }

    weatherData.style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather();
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather();
    }
});