import {GetServerSideProps, NextPage} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import {AdminLayout} from "@/components/pages/admin/admin_layout/AdminLayout";
import {useTranslation} from "next-i18next";


export const getServerSideProps: GetServerSideProps = async (context) => {

    const {locale} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "buttons", "home", "admin"])),
        },
    };

};


const EditGallery: NextPage = (): JSX.Element => {
    const {query: {slug}} = useRouter();
    const {t} = useTranslation();

    useEffect(() => {
        const fetcher = async () => {
            try {
            } catch (err) {
            }
        };
        fetcher();
    }, [slug]);

    return (
        <AdminLayout namePage={t("admin:editphoto")} subNamePage={null}>
            <div>
                Edit
            </div>
        </AdminLayout>
    );
};

export default EditGallery;