function getWeather() {
    const apikey = 'b4ce638d89c759ef8a9a432a3a597171';
    const city = document.getElementById('city').value;
    if (!city){
        alert('Please enter a city');
        return
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
    
    
    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
        console.log(data);
    })
    .catch(error => {
        console.error("Error fetching current weather data:",error);
        alert("Please try again!");
    });

    fetch(forcastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForcast(data.list);
    })
    .catch(error => {
        console.error("Error fetching current weather data:",error);
        alert("Please try again!");
    });
   
}
function displayWeather(data){
    const tempInfo = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const HourlyForcast = document.getElementById('hourly-forcast');
    const sunsetsunrise = document.getElementById('sunset-sunrise');
   
    // Clear content
    weatherIcon.innerHTML = '';
    weatherInfo.innerHTML = '';
    tempInfo.innerHTML = '';
    HourlyForcast.innerHTML = '';
    sunsetsunrise.innerHTML = '';

    if (data.cod === '404'){
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
    else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const discription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const temp_max = Math.round(data.main.temp_max - 273.15);
        const temp_min = Math.round(data.main.temp_min - 273.15);

        const temperatureHTML = `<p>${temperature}°C</p>`;

        const weatherHTML =`<p>${cityName}</p>
                            <p>${discription}</p>
                            <p>${temp_max}°C/${temp_min}°C</p>`;

        
        tempInfo.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHTML; 
        weatherIcon.src = iconUrl;
        weatherIcon.alt = discription;
        
        showImage();
    }
}
function displayHourlyForcast(hourlyData){

    const hourlyForcast = document.getElementById('hourly-forcast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `<div class ="hourly-item" >
                                    <span>${hour}:00</span>
                                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                                    <span>${temperature}°C</span>                            
                                </div>`;
        hourlyForcast.innerHTML += hourlyItemHtml; 
    });
}
function showImage(){

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
