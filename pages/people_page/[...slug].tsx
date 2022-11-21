import { GetServerSideProps, NextPage } from "next";

import { myAxios } from 'assets/axios/myAxios';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


import { Layout } from 'components/layout/Layout';
import { Breadcrumb } from '@/components/common/breadcrumb/Breadcrumb';
import { Container } from "@/components/common/container/Container";
import { Title } from "@/components/common/title/Title";
import { PeopleWr } from './../../components/pages/people/PeopleWr';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    const { query: { slug } } = context;

    try {
        const { data } = await myAxios(`/api/people?type=${slug && slug[2]}&lang=ru`);

        return {
            props: {
                data: data?.page,
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

interface PeoplePageInt {
    id: number, title: string, images: { url: string; id: number }[], links: { link: string }[]
}

const PeoplePage: NextPage<{ data: PeoplePageInt[] }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    const { query: { slug } } = useRouter();




    return <Layout title={`${t(`header:${slug && slug[0]}`)}, ${t(`header:${slug && slug[2]}`)}`} contentDesc={'a'}>
        <Container>
            <Breadcrumb />
            <Title heading="h1" title={t(`header:${slug && slug[2]}`)} />
            <PeopleWr data={data} />
        </Container>
    </Layout>;
};

export default PeoplePage;