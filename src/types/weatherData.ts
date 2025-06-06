import type {LucideIcon} from "lucide-react"

export interface WeatherProps {
    location: string;
    temperature: number;
    feelsLike: number;
    unit: string;
    humidity: number;
    windSpeed: number;
    condition: string;
    icons?: Record<string, LucideIcon>;
}

// Weather API

export type WeatherData = {
    location: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    unit: string;
};


export type Coordinates = {
    lat: number;
    lon: number;
};