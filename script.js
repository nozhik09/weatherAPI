const weatherApp = document.getElementById('weatherApp');
const loader = document.getElementById('loader');


async function getWeather() {

    const res = await fetch('https://get.geojs.io/v1/ip/geo.json');


    const data = await res.json();


    const { region, latitude, longitude, city } = data;


    const res1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data1 = await res1.json();

    const { current_weather_units, current_weather } = data1

    const { temperature, windspeed, weathercode } = current_weather

    const weatherDescription = decodeWeatherCode(current_weather.weathercode, current_weather_units);

    loader.style.display = 'block'
    setTimeout(() => {
        
        const weatherElements = document.createElement("div");
        const weatherDescriptionElement = document.createElement('p');
        weatherDescriptionElement.textContent = weatherDescription;
        weatherElements.append(weatherDescriptionElement);
        weatherApp.append(weatherElements);
        loader.style.display = 'none'

    }, 1500)



    function decodeWeatherCode(code, units) {
        switch (code) {
            case 0:
                return `Clear sky (${units.temperature}: ${current_weather.temperature}, ${units.windspeed}: ${current_weather.windspeed})`;
            case 1:
            case 2:
            case 3:
                return `Mainly clear, partly cloudy, and overcast (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 45:
            case 48:

                return `Fog and depositing rime fog (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 51:
            case 53:
            case 55:
                return `Drizzle: Light, moderate, and dense intensity (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 56:
            case 57:
                return `Freezing Drizzle: Light and dense intensity
                (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 61:
            case 63:
            case 65:
                return `Rain: Slight, moderate and heavy intensity
                (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 66:
            case 67:
                return `Freezing Rain: Light and heavy intensity
                (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 71:
            case 73:
            case 75:
                return `Snow fall: Slight, moderate, and heavy intensity
                (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 77:
                return `Snow grains
                (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 80:
            case 81:
            case 82:
                return `Rain showers: Slight, moderate, and violent
                (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 85:
            case 86:
                return `Snow showers slight and heavy
                (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            case 95:
                return `Thunderstorm: Slight or moderate
                (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;

            case 96, 99:
                return `Thunderstorm with slight and heavy hail
                (temperature: ${current_weather.temperature} ${units.temperature}, windspeed: ${current_weather.windspeed}${units.windspeed})`;
            default:
                return `Неизвестный код погоды (${units.temperature}: ${current_weather.temperature}, ${units.windspeed}: ${current_weather.windspeed})`;
        }


    }


}

getWeather()




