import { GetServerSideProps, NextPage } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AdminLayout } from "@/components/pages/admin/admin_layout/AdminLayout";
import { useRouter } from "next/router";
import { HomeSlider } from "@/components/pages/admin/home_form/HomeSlider";
import { HomeUsefulLinks } from "@/components/pages/admin/home_form/HomeUsefulLinks";
import { HomeOpinions } from '@/components/pages/admin/home_form/HomeOpinions';
import { GalleryForm } from "@/components/pages/admin/photo_gallery_form/GalleryForm";
import { VideoGallery } from '@/components/pages/admin/video_gallery_form/VideoGallery';
import { InfoForm } from '@/components/pages/admin/info_form/InfoForm';
import { PeopleForm } from '@/components/pages/admin/people_form/PeopleForm';
import { useTranslation } from 'next-i18next';


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
    console.log(slug);

    const { t } = useTranslation();
    return (
        <AdminLayout namePage={t(`header:${slug && slug[0]?.toLowerCase()}`)} subNamePage={""}>
            {(() => {
                switch (slug && slug[0]) {
                    case 'HOMESLIDER': return <HomeSlider id={slug && slug[1]} />;
                    case 'HOMELINKS': return <HomeUsefulLinks id={slug && slug[1]} />;
                    case 'HOMEOPINIONS': return <HomeOpinions id={slug && slug[1]} />;
                    case 'PHOTOS': return <GalleryForm id={slug && slug[1]} />;
                    case 'VIDEOS': return <VideoGallery id={slug && slug[1]} />;
                    case 'INFO': return <InfoForm id={slug && slug[1]} type={slug && slug[1]} />;
                    case 'PEOPLE': return <PeopleForm id={slug && slug[1]} type={slug && slug[1]} />;
                    default:
                        return <></>;
                }
            })()}
        </AdminLayout>
    );
};

export default EditDeleteItem;
