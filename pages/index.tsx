import type { GetServerSideProps, NextPage } from 'next';

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@/components/layout/Layout";
import { Banner } from "@/components/pages/home/banner/Banner";
import { Selection } from "@/components/pages/home/selection/Selection";
import { News } from "@/components/pages/home/news/News";
import { Opinions } from "@/components/pages/home/opinions/Opinions";
import { UsefulLinks } from "@/components/pages/home/useful_links/UsefulLinks";
import { ContactUs } from "@/components/pages/home/contact_us/ContactUs";
import { Statistics } from "@/components/pages/home/statistics/Statistics";
import { Map } from '@/components/pages/home/map/Map';
import { myAxios } from 'assets/axios/myAxios';
import { useTranslation } from 'next-i18next';



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    const allData = {
        banner: [],
        slider: [],
        opinions: [],
        statistic: [],
        links: [],
        news: []
    };



    try {
        const banner = await myAxios(`/api/multipart?type=BANNER&lang=${locale}`);
        allData.banner = banner?.data["data"];

        const slider = await myAxios(`/api/multipart?type=SLIDER&lang=${locale}`);
        allData.slider = slider?.data["data"];

        const opinions = await myAxios(`/api/opinion?lang=${locale}`);
        allData.opinions = opinions?.data["data"];

        const statistic = await myAxios(`/api/statistic`);
        allData.statistic = statistic?.data;

        const links = await myAxios(`/api/multipart?type=LINK&lang=${locale}`);
        allData.links = links?.data["data"];

        const news = await myAxios(`/api/information?type=ministrynews&lang=${locale}`);
        allData.news = news?.data["data"];



    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            data: allData,
            ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "buttons", "home", "months"])),
        },
    };
};

const Home: NextPage = ({ data }: any): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Layout title={"Buxoro viloyati xalq ta???limi boshqarmasi"} contentDesc={"Buxoro viloyati xalq ta???limi boshqarmasi"}>
            <Banner data={data.banner} />
            <Selection data={data.slider} />
            <News data={data.news} />
            <Opinions data={data.opinions} />
            <Map />
            <ContactUs />
            <Statistics data={data.statistic} />
            <UsefulLinks data={data.links} />
        </Layout >
    );
};

export default Home;
