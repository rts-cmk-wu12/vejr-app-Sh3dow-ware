import Fastify from "fastify";
import cors from "@fastify/cors";
import weatherRoutes from "./routes/weather";

const fastify = Fastify({ logger: true });

async function start() {
    try {
        await fastify.register(cors);
        await fastify.register(weatherRoutes, { prefix: "/weather" });

        await fastify.listen({ port: 5000 });
        console.log("Fastify server is running on http://localhost:5000");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start().then(r => console.log(r));
