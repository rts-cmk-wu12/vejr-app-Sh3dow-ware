import {
    Sun,
    Cloud,
    CloudRain,
    Snowflake,
    Zap,
    CloudSun,
    CloudMoon,
    Droplets,
    Wind,
} from "lucide-react";
import type {LucideIcon}  from "lucide-react";

export const weatherIcons: Record<string, LucideIcon> = {
    "Clear": Sun,
    "Sunny": Sun,
    "Clouds": Cloud,
    "Cloudy": Cloud,
    "Partly Cloudy": CloudSun,
    "Mostly Cloudy": Cloud,
    "Overcast": Cloud,
    "Rain": CloudRain,
    "Snow": Snowflake,
    "Thunderstorm": Zap,
    "Drizzle": Droplets,
    "Windy": Wind,
    "Night Clear": CloudMoon
};

export const getWeatherIcon = (condition: string): LucideIcon => {
    return weatherIcons[condition] || Sun;
};
