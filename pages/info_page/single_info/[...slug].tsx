import { GetServerSideProps, NextPage } from "next";

import { myAxios } from 'assets/axios/myAxios';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { Layout } from 'components/layout/Layout';
import { Container } from 'components/common/container/Container';
import { Breadcrumb } from 'components/common/breadcrumb/Breadcrumb';

import { Title } from "@/components/common/title/Title";

import { SingleInfo } from "@/components/pages/info/single_info/SingleInfo";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;


    try {

        return {
            props: {

                ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "people"])),
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




const a = {
    "id": 1,
    "type": "COORDADVBODIES",
    "title": "Hello Banner",
    "titleRu": "Привет Баннер деск",
    "titleUz": "Salom Banner",
    "description": "Hello Banner desc",
    "descriptionRu": "Привет Баннер деск",
    "descriptionUz": "Salom Banner  desc",
    "url": "/541c90bdc206c2930f80ffa02.png"
};



const SingleInfoPage: NextPage<{ data: any }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    const { query: { slug } } = useRouter();

    return <Layout title={`${t(`header:${slug && slug[0]}`)} ${a?.title}`} contentDesc={'a'}>
        <Container>
            <Breadcrumb last={a?.title} />
            <Title title={a?.title} />
            <SingleInfo data={a} />
        </Container>
    </Layout>;
};

export default SingleInfoPage;