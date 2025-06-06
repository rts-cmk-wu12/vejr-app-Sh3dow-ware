import type {FastifyRequest, FastifyReply} from "fastify";
import dotenv from "dotenv";
import {nameToCode} from "../country/nameToCode.ts";
import {capitals} from "../country/capitals.ts";
dotenv.config();

const API_KEY = process.env.OPEN_WEATHER_API;
console.log("API KEY: " + API_KEY);
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(url: string, reply: FastifyReply) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const error = await response.json();
            return reply.status(response.status).send(error);
        }
        const data = await response.json();
        return reply.send(data);
    } catch (err) {
        return reply.status(500).send({ error: "Failed to fetch weather data" });
    }
}

export async function getCityWeather(
    req: FastifyRequest<{ Params: { city: string } }>,
    reply: FastifyReply
) {
    const city = req.params.city;
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    return fetchWeather(url, reply);
}

export async function getCountryWeather(
    req: FastifyRequest<{ Params: { country: string } }>,
    reply: FastifyReply) {

    // Input from params and country code types
    let input = req.params.country.trim();
    let countryCode: string | undefined;

    /* just in case check whether if the input is 2, then make it uppercase, else
    use nameToCode and make the input to lowercase */
    if (input.length === 2) {
        countryCode = input.toUpperCase();
    } else {
        countryCode = nameToCode[input.toLowerCase()];
    }
   // if the countryCode not has no value, then return a error reply of 400.
    if (!countryCode) {
        return reply.status(400).send({ error: "Unsupported country" });
    }
    const capitalCity = capitals[countryCode];

    // If there is no capitalCity then return no capital
    if (!capitalCity) {
        return reply.status(400).send({ error: "No capital city found for country" });
    }
    // fetching by country and countryCode
    const url = `${BASE_URL}?q=${encodeURIComponent(capitalCity)},${countryCode}&appid=${API_KEY}&units=metric`;
    console.log("URL TO FETCH: " + url);

    return fetchWeather(url, reply);
}


export async function getCoordinatesWeather(
    req: FastifyRequest<{ Querystring: { lat: string; lon: string } }>,
    reply: FastifyReply
) {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return reply.status(400).send({ error: "Missing coordinates" });
    }
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    return fetchWeather(url, reply);
}