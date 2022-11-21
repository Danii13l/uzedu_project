import { GetServerSideProps, NextPage } from "next";

import { myAxios } from 'assets/axios/myAxios';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { Layout } from 'components/layout/Layout';
import { Container } from 'components/common/container/Container';
import { Breadcrumb } from 'components/common/breadcrumb/Breadcrumb';
import { SinglePerson } from "@/components/pages/people/single_person/SinglePerson";
import { Title } from "@/components/common/title/Title";
import { SubTitle } from "@/components/common/sub_title/SubTitle";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;


    try {

        return {
            props: {

                ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "people"])),
            },
        };
    } catch (err) {
        console.log(err);

        return {
            props: {
                ...(await serverSideTranslations(locale as string, ["header", "footer", "common", "buttons", "home", "months"])),
            },
        };
    }

};




const a = {
    "id": 15,
    "type": "LEADERS",
    "name": "Саидов Бахтиёр Одилович",
    "name_ru": "Саидов Бахтиёр Одилович",
    "name_uz": "Саидов Бахтиёр Одилович",
    "position": "Министр народного образования Республики Узбекистан",
    "position_ru": "Министр народного образования Республики Узбекистан",
    "position_uz": "Министр народного образования Республики Узбекистан",
    "workHours": "Рабочие часы Английский язык",
    "work_hours_ru": "Рабочие часы Русский язык",
    "work_hours_uz": "Рабочие часы Узбекский язык",
    "phone": "+998 97 123 123 31",
    "email": "SMT@GMAIL.COM",
    "tg": "",
    "biography": "жил был вйцв йц  вцйв йц вцй цйвцй вц йвйц вцйвйцв вцй вцй вйц",
    "workHistory": [
        {
            "text": "йцукенг шщз фывапр олдж см м Текст на английском",
            "textRu": "йцукенг шщз фывапр олдж см м Текст на русском",
            "textUz": "йцукенг шщз фывапр олдж см м Текст на узбекском"
        },
        {
            "text": "йцукенг шщз фывапр олдж см м Текст на английском",
            "textRu": "йцукенг шщз фывапр олдж см м Текст на русском",
            "textUz": "йцукенг шщз фывапр олдж см м Текст на узбекском"
        }
    ],
    "duty": [
        {
            "text": "Обязанности Текст на английском",
            "textRu": "Обязанности Текст на русском",
            "textUz": "Обязанности Текст на узбекском"
        }
    ],
    "is_boss": 1,
    "url": "/9c3a8404778d40858baf19801.jpeg"
};




const SinglePersonPage: NextPage<{ data: any }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    const { query: { slug } } = useRouter();

    return <Layout title={`${t(`header:${slug && slug[0]}`)}, ${a?.name}`} contentDesc={'a'}>
        <Container>
            <Breadcrumb last={a?.name} />
            <Title title={a?.name} />
            <SubTitle subt={a?.position} />
            <SinglePerson data={a} />
        </Container>
    </Layout>;
};

export default SinglePersonPage;