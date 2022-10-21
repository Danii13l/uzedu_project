import '../styles/for_libraries/top_selections.scss';
import '../styles/globals.scss'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";


import type {AppProps} from 'next/app'

import {appWithTranslation} from 'next-i18next';


import {Provider} from "react-redux";
import {store} from "../assets/redux/store";


function MyApp({Component, pageProps}: AppProps) {
    return <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
}

export default appWithTranslation(MyApp);

