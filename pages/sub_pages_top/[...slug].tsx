import { FC } from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { CommonPage } from "@/components/common/common_page/CommonPage";
import { Layout } from "@/components/layout/Layout";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { myAxios } from "assets/axios/myAxios";
import { PageInt } from "assets/interfaces/PageDataInt";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { locale } = context;
    const { slug } = context.query;

    try {
        const { data } = await myAxios(`/api/page?menuId=300&subMenuId=${slug ? slug[1] : 1}&lang=${locale}`);
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

const SubPagesTop: FC<{ data: PageInt }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    const { query: { slug } } = useRouter();

    return <Layout title={`${t(`header:${slug && slug[0]}`)}`} contentDesc={'a'}>
        <CommonPage data={data} />
    </Layout>;
};
export default SubPagesTop;