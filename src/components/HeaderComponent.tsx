import type {HeaderProps} from "@/types/header.ts";
import "@/style/layout/_header.sass"
export const HeaderComponent = ({headerClass = "header", titleClass = "header__title", title = "Weather App"}: HeaderProps) => {
    return (
        <>
            <header className={headerClass}>
                <h1 className={titleClass}>{title}</h1>
            </header>
        </>
    );
};