import type { Coordinates, WeatherData } from "@/types/weatherData.ts";

// BACKEND API
const BASE_URL = "http://localhost:5000/weather/";

function transformWeatherData(data: any): WeatherData {
    return {
        location: data.name,
        temperature: Math.round(data.main.temp),
        unit: "°C",
        condition: data.weather[0].main,
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
    };
}

export async function getWeatherDataByCity(city: string): Promise<WeatherData> {
    const response = await fetch(`${BASE_URL}city/${city}`);
    if (!response.ok) throw new Error(`City fetch failed with status ${response.status}`);
    const data = await response.json();
    return transformWeatherData(data);
}

export async function getWeatherDataByCountry(country: string): Promise<WeatherData> {
    const response = await fetch(`${BASE_URL}country/${country}`);
    if (!response.ok) throw new Error(`Country fetch failed with status ${response.status}`);
    const data = await response.json();
    return transformWeatherData(data);
}

export async function getWeatherDataByCoordinates(coordinates: Coordinates): Promise<WeatherData> {
    const { lat, lon } = coordinates;
    const response = await fetch(`${BASE_URL}coordinates?lat=${lat}&lon=${lon}`);
    if (!response.ok) throw new Error(`Coordinates fetch failed with status ${response.status}`);
    const data = await response.json();
    return transformWeatherData(data);
}


async function main() {
    try {
        const weather = await getWeatherDataByCity("London");
        console.log("City Weather:", weather);

        const countryWeather = await getWeatherDataByCountry("UK");
        console.log("Country Weather:", countryWeather);

        const coordinatesWeather = await getWeatherDataByCoordinates({ lat: 51.5074, lon: -0.1278 });
        console.log("Coordinate Weather:", coordinatesWeather);

    } catch (error) {
        console.error("Something went horribly wrong with the weather most likely:", error);
    }
}


main();
