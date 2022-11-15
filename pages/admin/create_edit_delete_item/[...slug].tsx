import { GetServerSideProps, NextPage } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AdminLayout } from "@/components/pages/admin/admin_layout/AdminLayout";
import { useRouter } from "next/router";
import { HomeSlider } from "@/components/pages/admin/home_form/HomeSlider";
import { HomeUsefulLinks } from "@/components/pages/admin/home_form/HomeUsefulLinks";
import { HomeOpinions } from '@/components/pages/admin/home_form/HomeOpinions';


export const getServerSideProps: GetServerSideProps = async (context) => {

    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["header", "common", "home", "months", "admin"])),
        },
    };

};
const EditDeleteItem: NextPage = (): JSX.Element => {
    const { query: { slug } } = useRouter();

    return (
        <AdminLayout namePage={"Админ Панель"} subNamePage={""}>
            {(() => {
                switch (slug && slug[0]) {
                    case 'HOMESLIDER': return <HomeSlider id={slug && slug[1]} />;
                    case 'HOMELINKS': return <HomeUsefulLinks id={slug && slug[1]} />;
                    case 'HOMEOPINIONS': return <HomeOpinions id={slug && slug[1]} />;
                    default:
                        return <></>;
                }
            })()}
        </AdminLayout>
    );
};

export default EditDeleteItem;
