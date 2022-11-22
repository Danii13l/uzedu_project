import { GetServerSideProps, NextPage } from "next";

import { myAxios } from 'assets/axios/myAxios';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { Layout } from 'components/layout/Layout';
import { Container } from 'components/common/container/Container';
import { Breadcrumb } from 'components/common/breadcrumb/Breadcrumb';
import { SinglePerson } from "@/components/pages/people/single_person/SinglePerson";
import { Title } from "@/components/common/title/Title";
import { SubTitle } from "@/components/common/sub_title/SubTitle";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    const { query: { slug } } = context;

    try {
        const { data } = await myAxios(`/api/people/more?lang=${locale}&id=${slug && slug[1]}`);

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


const SinglePersonPage: NextPage<{ data: any }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    const { query: { slug } } = useRouter();



    return <>

        {
            data && <Layout title={`${t(`header:${slug && slug[0]}`)}, ${data?.name}`} contentDesc={'a'}>
                <Container>
                    <Breadcrumb last={data?.name} />
                    <Title title={data?.name} />
                    <SubTitle subt={data?.position} />
                    <SinglePerson data={data} />
                </Container>
            </Layout>
        }
    </>;


};

export default SinglePersonPage;