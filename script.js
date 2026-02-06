const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "b6ff40f51c9ab1dd408dde064dda3485";


weatherForm.addEventListener("submit",async (event)=>{
    event.preventDefault();
    const city = cityInput.value.trim();
    if(!city){
        displayError("Please enter a city");
        return;
    }   
    try{
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);
    }
    catch(error) {
        displayError(error.message);
    }
})

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("City not found");
    }

    return await response.json();


}


function displayWeatherInfo(data){
    console.log(data);
    const name = data.name;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const id = data.weather[0].id;
    const description = data.weather[0].description;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const WeatherEmoji = document.createElement("p")

    cityDisplay.textContent = name;
    tempDisplay.textContent = `${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    WeatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    WeatherEmoji.classList.add("WeatherEmoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(WeatherEmoji);
    
}

function getWeatherEmoji(weatherId){
    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    if (weatherId >= 300 && weatherId < 400) return "🌦️";
    if (weatherId >= 500 && weatherId < 600) return "🌧️";
    if (weatherId >= 600 && weatherId < 700) return "❄️";
    if (weatherId >= 700 && weatherId < 800) return "🌫️";
    if (weatherId === 800) return "☀️";
    if (weatherId > 800) return "☁️";
    return "🌍";
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}