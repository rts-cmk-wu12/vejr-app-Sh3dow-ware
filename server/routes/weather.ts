import type {FastifyInstance} from "fastify";
import { getCityWeather, getCountryWeather, getCoordinatesWeather } from "../controllers/weatherController";


// Routes
export default async function weatherRoutes(fastify: FastifyInstance) {
    fastify.get("/city/:city", getCityWeather);
    fastify.get("/country/:country", getCountryWeather);
    fastify.get("/coordinates", getCoordinatesWeather);
}
