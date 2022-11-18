import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AdminLayout } from "@/components/pages/admin/admin_layout/AdminLayout";


import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { myAxios } from "assets/axios/myAxios";

import { useTranslation } from "next-i18next";
import { VideoGallery } from "@/components/pages/admin/video_gallery_form/VideoGallery";
import { PeopleForm } from "@/components/pages/admin/people_form/PeopleForm";
import { GalleryForm } from "@/components/pages/admin/photo_gallery_form/GalleryForm";
import { PageForm } from "@/components/pages/admin/pages_form/PageForm";
import { InfoForm } from "@/components/pages/admin/info_form/InfoForm";
import { HomeSlider } from "@/components/pages/admin/home_form/HomeSlider";
import { HomeBanner } from "@/components/pages/admin/home_form/HomeBanner";
import { HomeUsefulLinks } from "@/components/pages/admin/home_form/HomeUsefulLinks";
import { HomeOpinions } from "@/components/pages/admin/home_form/HomeOpinions";
import { HomeStatistic } from "@/components/pages/admin/home_form/HomeStatistic";

import { GettingDataWithPhoto } from "@/components/pages/admin/pages_for_gitting_data/GettingDataWithPhoto";


export const getServerSideProps: GetServerSideProps = async (context) => {

    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "admin", "home"])),
        },
    };

};


const AdminPages: NextPage = (): JSX.Element => {
    const { query: { slug } } = useRouter();
    const { t } = useTranslation();

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetcher = async () => {
            try {
                if (slug && slug[0] === "home_page") return;
                const { data } = await myAxios(`/api/dashboard/page?menuId=${slug ? slug[1] : 1}&subMenuId=${slug ? slug[3] : 1}`);
                setData(data.page);
            } catch (err) {
                setData(null);
            }
        };
        fetcher();
    }, [slug]);

    return (
        <AdminLayout namePage={slug ? t(`header:${slug[0]}`) : ""} subNamePage={slug ? t(`header:${slug[2]}`) : ""}>
            {slug && <div>
                {(() => {
                    switch (slug && slug[4]) {
                        case 'PAGE':
                            return <PageForm data={data} />;
                        case 'PHOTOS':
                            return <GettingDataWithPhoto linkToForm={slug[4]} createItem={`/admin/create_edit_delete_item/${slug[4]}`} />;
                        case 'VIDEOS':
                            return <GettingDataWithPhoto linkToForm={slug[4]} createItem={`/admin/create_edit_delete_item/${slug[4]}`} />;
                        case 'PEOPLE':
                            return <GettingDataWithPhoto linkToForm={slug[4]} createItem={`/admin/create_edit_delete_item/${slug[4]}/${slug[2]}`} />;
                        case 'INFO':
                            return <GettingDataWithPhoto linkToForm={slug[4]} createItem={`/admin/create_edit_delete_item/${slug[4]}/${slug[2]}`} />;
                        case 'HOMEBANNER':
                            return <HomeBanner />;
                        case 'HOMESLIDER':
                        case 'HOMELINKS':
                        case 'HOMEOPINIONS':
                            return <GettingDataWithPhoto linkToForm={slug[4]} createItem={`/admin/create_edit_delete_item/${slug[4]}`} />;
                        case "HOMESTATISTIC": return <HomeStatistic />;
                        default:
                            return <></>;
                    }
                })()}
            </div>}
        </AdminLayout>
    );
};

export default AdminPages;
