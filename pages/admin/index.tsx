import { GetServerSideProps, NextPage } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AdminLayout } from "@/components/pages/admin/admin_layout/AdminLayout";


export const getServerSideProps: GetServerSideProps = async (context) => {

    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["header", "common", "home", "months", "admin"])),
        },
    };

};
const AdminIndex: NextPage = (): JSX.Element => {

    return (
        <AdminLayout namePage={"Админ Панель"} subNamePage={""}>
            <></>
        </AdminLayout>
    );
};

export default AdminIndex;
