import { GetServerSideProps, NextPage } from "next";

import { myAxios } from 'assets/axios/myAxios';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


import { Layout } from 'components/layout/Layout';
import { Breadcrumb } from '@/components/common/breadcrumb/Breadcrumb';
import { Container } from "@/components/common/container/Container";
import { GalleryItem } from "@/components/pages/gallery/GalleryItem";
import { Title } from "@/components/common/title/Title";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    try {
        const { data } = await myAxios(`/api/video?lang=${locale}`);
        return {
            props: {
                data: data?.pages,
                ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "buttons", "home", "months"])),
            },
        };
    } catch (err) {
        return {
            props: {
                ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "buttons", "home", "months"])),
            },
        };
    }

};

interface GalleryVideoInt {
    id: number, title: string, images: { url: string; id: number }[], links: { link: string }[]
}

const GalleryVideo: NextPage<{ data: GalleryVideoInt[] }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    const { query: { slug } } = useRouter();


    return <Layout title={`${t(`header:${slug && slug[0]}`)}, ${t(`header:${slug && slug[2]}`)}`} contentDesc={'a'}>
        <Container>
            <Breadcrumb />
            <Title heading="h1" title={t(`header:videogallery`)} />
            <GalleryItem data={data} isVideo={true} />
        </Container>
    </Layout>;
};

export default GalleryVideo;