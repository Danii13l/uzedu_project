import type {GetServerSideProps, NextPage} from 'next';

import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import {Layout} from "@/components/layout/Layout";
import {Banner} from "@/components/pages/home/banner/Banner";
import {Selection} from "@/components/pages/home/selection/Selection";
import {News} from "@/components/pages/home/news/News";
import {Opinions} from "@/components/pages/home/opinions/Opinions";
import {UsefulLinks} from "@/components/pages/home/useful_links/UsefulLinks";
import {ContactUs} from "@/components/pages/home/contact_us/ContactUs";
import {Statistics} from "@/components/pages/home/statistics/Statistics";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const {locale} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "buttons", "home", "months"])),
        },
    };
};

const Home: NextPage = (): JSX.Element => {
    return (
        <Layout title={"Home"} contentDesc={"home"}>
            <Banner/>
            <Selection/>
            <News/>
            <Opinions/>
            <ContactUs/>
            <Statistics/>
            <UsefulLinks/>
        </Layout>
    );
};

export default Home;
