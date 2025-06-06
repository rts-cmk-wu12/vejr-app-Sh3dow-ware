import { createFileRoute } from '@tanstack/react-router';
import { HeaderComponent } from "@/components/HeaderComponent.tsx";
import { WeatherContainer } from "@/components/WeatherContainer.tsx";
import "@/style/main.sass"
const App = () => {
    return (
        <>
            <HeaderComponent title={"Weather App"} />
            <WeatherContainer />
        </>
    );
};

export const Route = createFileRoute('/')({
    component: App,
});
