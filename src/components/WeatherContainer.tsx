import React, { useEffect, useState } from "react";
import { WeatherComponent } from "@/components/WeatherComponent.tsx";
import {
    getWeatherDataByCity,
    getWeatherDataByCountry,
    getWeatherDataByCoordinates,
} from "@/api/weatherApi.ts";
import type { WeatherData } from "@/types/weatherData.ts";
import "@/style/main.sass";

export const WeatherContainer = () => {
    const [mode, setMode] = useState<"city" | "country" | "coordinates">("city");
    const [input, setInput] = useState({ city: "", country: "", lat: "", lon: "" });
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        try {
            let data: WeatherData;
            switch (mode) {
                case "city":
                    data = await getWeatherDataByCity(input.city);
                    break;
                case "country":
                    data = await getWeatherDataByCountry(input.country);
                    break;
                case "coordinates":
                    data = await getWeatherDataByCoordinates({
                        lat: parseFloat(input.lat),
                        lon: parseFloat(input.lon),
                    });
                    break;
                default:
                    throw new Error("Unknown search");
            }
            setWeather(data);
        } catch (err) {
            setError("Weather fetch failed. Could be a typo");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchWeather();
    };

    const handleInputChange = (field: keyof typeof input) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({ ...prev, [field]: e.target.value }));
    };

    useEffect(() => {
        setInput({ city: "", country: "", lat: "", lon: "" }); // Reset fields when mode changes
    }, [mode]);

    return (
        <section className="weather">
            <form onSubmit={handleSubmit} className="weather__form">
                <label className="weather__label">
                    Search by:
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value as any)}
                        className="weather__select"
                    >
                        <option value="city">City</option>
                        <option value="country">Country</option>
                        <option value="coordinates">Coordinates</option>
                    </select>
                </label>

                {mode === "city" && (
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={input.city}
                        onChange={handleInputChange("city")}
                        className="weather__input"
                    />
                )}

                {mode === "country" && (
                    <input
                        type="text"
                        placeholder="Enter country"
                        value={input.country}
                        onChange={handleInputChange("country")}
                        className="weather__input"
                    />
                )}

                {mode === "coordinates" && (
                    <div className="weather__coordinates">
                        <input
                            type="text"
                            placeholder="Latitude"
                            value={input.lat}
                            onChange={handleInputChange("lat")}
                            className="weather__input"
                        />
                        <input
                            type="text"
                            placeholder="Longitude"
                            value={input.lon}
                            onChange={handleInputChange("lon")}
                            className="weather__input"
                        />
                    </div>
                )}

                <button type="submit" className="weather__button">Search</button>
            </form>

            {loading && <p className="weather__loading">Loading... wind incoming.</p>}
            {error && <p className="weather__error">{error}</p>}
            {weather && <WeatherComponent {...weather} />}
        </section>
    );
};
