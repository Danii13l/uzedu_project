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

    const { query: { slug } } = context;
    try {
        const { data } = await myAxios(`/api/information/more?id=${slug && slug[2]}&lang=${locale}`);
        return {
            props: {
                data: data,
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



const SingleInfoPage: NextPage<{ data: any }> = ({ data }: any): JSX.Element => {
    const { t } = useTranslation();

    const { query: { slug } } = useRouter();

    return <>
        {
            data && <Layout title={`${t(`header:${slug && slug[0]}`)} ${data?.title}`} contentDesc={'a'}>
                <Container>
                    <Breadcrumb last={data?.title} />
                    <Title title={data?.title} />
                    {/* @ts-ignore */}
                    <SingleInfo data={data} />
                </Container>
            </Layout>
        }
    </>;

};

export default SingleInfoPage;