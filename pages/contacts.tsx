import { Container } from "@/components/common/container/Container";
import { Layout } from "@/components/layout/Layout";
import { ContactsComp } from "@/components/pages/contacts/ContactsComp";

import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Breadcrumb } from 'components/common/breadcrumb/Breadcrumb';
import { myAxios } from "assets/axios/myAxios";
import { PageInt } from 'assets/interfaces/PageDataInt';




export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    try {
        const { data } = await myAxios(`/api/page?menuId=1&subMenuId=10&lang=${locale}`);
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

const Contacts: NextPage<{ data: PageInt }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Layout title={t("header:contacts")} contentDesc="Котакты">
            <Container>
                <Breadcrumb last={t("header:contacts")} />
                <ContactsComp data={data} />
            </Container>
        </Layout>
    );
};

export default Contacts;