import { Container } from "@/components/common/container/Container";
import { Title } from "@/components/common/title/Title";
import { Layout } from "@/components/layout/Layout";
import { SearchComp } from "@/components/pages/search/SearchComp";
import { myAxios } from "assets/axios/myAxios";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Breadcrumb } from './../../components/common/breadcrumb/Breadcrumb';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    const { query: { text } } = context;

    try {
        const res = await fetch(`http://localhost:3000/api/search?lang=${locale}&text=${text}`);
        const data = await res.json();

        return {
            props: {
                data: data?.data,
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


const SearchRes: NextPage = ({ data }: any): JSX.Element => {
    const { query: { text } } = useRouter();
    const { t } = useTranslation();

    return (
        <Layout title={`${t("header:search")},${t("header:searchresult")}`} contentDesc={"home"}>
            <Container>
                <Breadcrumb nextlast={t("header:search")} last={text as any} />
                <Title title={t("header:searchresult")} />
                <SearchComp data={data} />
            </Container>
        </Layout >

    );
};

export default SearchRes;