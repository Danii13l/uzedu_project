import type {GetServerSideProps, NextPage} from 'next'

import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import {Layout} from "@/components/layout/Layout";
import {Banner} from "@/components/pages/home/banner/Banner";
import {Selection} from "@/components/pages/home/selection/Selection";
import {News} from "@/components/pages/home/news/News";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const {locale} = context;


    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["header", "common", "buttons", "home","months"])),
        },
    };
};

const Home: NextPage = (): JSX.Element => {
    return (
        <Layout title={"Home"} contentDesc={"home"}>
            <Banner/>
            <Selection/>
            <News/>
        </Layout>
    )
}

export default Home
