import 'styles/for_libraries/top_selections.scss';
import "styles/for_libraries/opinions.scss";
import "styles/for_libraries/inputs.scss";
import 'styles/globals.scss';

import "styles/page_inner.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';


import type { AppProps } from 'next/app';

import { appWithTranslation } from 'next-i18next';


import { Provider } from "react-redux";
import { store } from "../assets/redux/store";


function MyApp({ Component, pageProps }: AppProps) {
    return <Provider store={store}>
        <Component {...pageProps} />
    </Provider>;
}

export default appWithTranslation(MyApp);

