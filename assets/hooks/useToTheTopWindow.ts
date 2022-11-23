
import { Router } from "next/router";

export const useToTheTopWindows = () => {
    Router.events.on("routeChangeStart", () => {
        window.scrollTo(1, 1);
        window.pageYOffset = 0;
        window.scrollY = 0;
    });

    Router.events.on("routeChangeComplete", () => {
        window.scrollTo(1, 1);
        window.pageYOffset = 0;
        window.scrollY = 0;
    });

};