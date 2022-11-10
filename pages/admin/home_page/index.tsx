import {GetServerSideProps, NextPage} from "next";

import {AdminLayout} from "@/components/pages/admin/admin_layout/AdminLayout";

import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {HomeForm} from "@/components/pages/admin/home_form/HomeForm";


export const getServerSideProps: GetServerSideProps = async (context) => {

    const {locale} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["header", "common", "home", "admin"])),
        },
    };

};

const HomePage: NextPage = (): JSX.Element => {
    const {t} = useTranslation();
    return <AdminLayout namePage={t("admin:homepage")} subNamePage={null}>
        <HomeForm/>
    </AdminLayout>;
};

export default HomePage;
