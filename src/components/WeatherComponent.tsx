import type {WeatherProps} from "@/types/weatherData.ts";
import {getWeatherIcon} from "@/utils/weatherIcons.ts";

export const WeatherComponent = ({
                                     location,
                                     temperature,
                                     unit,
                                     condition,
                                     feelsLike,
                                     humidity,
                                     windSpeed,
                                 }: WeatherProps) => {
    const Icon = getWeatherIcon(condition);

    return (
        <article className="weather-display" aria-labelledby="weather-title">
            <h2 id="weather-title" className="weather-display__title">Current Weather</h2>

            <p className="weather-display__location">
                <strong>Location:</strong> {location}
            </p>

            <div role="group" aria-label="Weather details" className="weather-display__details">
                <span aria-hidden="true" className="weather-display__icon">
                    <Icon size={48}/>
                </span>
                <div className="weather-display__info">
                    <p className="weather-display__summary">
                        <strong>{temperature}{unit}</strong> – {condition}
                    </p>
                    <ul className="weather-display__list">
                        <li className="weather-display__item">Feels like: {feelsLike}{unit}</li>
                        <li className="weather-display__item">Humidity: {humidity}%</li>
                        <li className="weather-display__item">Wind: {windSpeed} km/h</li>
                    </ul>
                </div>
            </div>
        </article>
    );
};
