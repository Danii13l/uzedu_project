import {GetServerSideProps, NextPage} from "next";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {AdminLayout} from "@/components/pages/admin/admin_layout/AdminLayout";
import {PageForm} from "@/components/pages/admin/form/PageForm";

import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import {myAxios} from "assets/axios/myAxios";
import {GalleriesPage} from "@/components/pages/admin/galleries_page/GalleriesPage";
import {useTranslation} from "next-i18next";


export const getServerSideProps: GetServerSideProps = async (context) => {

    const {locale} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "admin"])),
        },
    };

};


const AdminPages: NextPage = (): JSX.Element => {
    const {query: {slug}} = useRouter();
    const {t} = useTranslation();

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetcher = async () => {
            try {
                const {data} = await myAxios(`/api/dashboard/page?menuId=${slug ? slug[1] : 1}&subMenuId=${slug ? slug[3] : 1}`);
                setData(data.page);
            } catch (err) {
                setData(null);
            }
        };
        fetcher();
    }, [slug]);

    return (
        <AdminLayout namePage={slug ? t(`header:${slug[0]}`) : ""} subNamePage={slug ? t(`header:${slug[2]}`) : ""}>
            <div>
                {
                    slug && slug[4] === "gallery" ? <GalleriesPage/> : <PageForm data={data}/>
                }

            </div>
        </AdminLayout>
    );
};

export default AdminPages;
