import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import s from "./index.module.scss";

import { Title } from '@/components/common/title/Title';
import { Container } from "@/components/common/container/Container";
import { SectionWrapper } from '@/components/common/section_wrapper/SectionWrapper';
import { Button } from "@/components/common/button/Button";

import { useTranslation } from 'next-i18next';

import { getMapDirection } from 'assets/function/getMapdirection';


const mapData = [
    {
        district: "buhara",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44",
    },
    {
        district: "kagan",
        director: {
            ru: { name: "Хусенов Шерзод2" },
            uz: { name: "Хусенов Шерзод UZ2" },
            en: { name: "Хусенов Шерзод En2" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44",

    },
    {
        district: "altay",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44",

    },
    {
        district: "buharadis",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "vabkent",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "gidjuvan",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "jandar",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "kagandist",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "karakul",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "peshkun",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "romit",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "karaul",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "shafirkan",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    }];




export const Map = () => {
    const [modal, setModal] = useState(false);
    const [activeM, setActiveM] = useState(0);
    const [toggleList, setToggleList] = useState(false);
    const { locale } = useRouter();



    const handleActiveM = (num: number) => {
        return () => setActiveM(num);
    };

    const handleModal = (val: boolean) => {
        return () => setModal(val);
    };

    const handleToggleList = () => {
        return () => setToggleList(prev => !prev);
    };

    const { t } = useTranslation();


    useEffect(() => {
        if (modal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    });

    return <SectionWrapper>
        <Container>
            <div className={s.title_wr}>
                <Title title={"Интерактивная карта Бухарской области"} />
                <p className={s.subtitle}>Районные отделы</p>
            </div>
            <div className={s.img_wr_main}>
                <div className={s.img_wr}>
                    <Image src={"/images/home/map_buhara.png"} alt="map" layout="fill" objectFit="contain" quality={100} />
                </div>
            </div>


            <div className={s.btn} onClick={handleModal(true)}>
                <Button classN="second">Подробнее</Button>
            </div>

            <div className={`${s.modal_map} ${modal ? s.active : ""}`}>
                <div className={s.modal_inner}>
                    <div className={s.modal_top}>
                        <h4 className={s.modal_title}>Бухарская область</h4>
                        <div className={s.modal_top_img_wr} onClick={handleModal(false)}>
                            <Image src={"/images/home/close_map.svg"} alt="close" layout="fill" objectFit="cover" />
                        </div>
                    </div>

                    <div className={s.map_inner}>
                        <span className={s.list_control} onClick={handleToggleList()}>Районы</span>
                        <ul className={`${s.map_inner_left} ${toggleList ? s.active : ""}`}>
                            {
                                mapData.map((item, index) => {
                                    return <li key={item.district} className={`${s.list_items} ${activeM === index ? s.active : ""}`} onClick={handleActiveM(index)}>
                                        {t(`home:${item.district}`)}
                                    </li>;
                                })
                            }
                        </ul>
                        <div className={s.map_inner_right}>
                            <div className={s.map_info}>
                                {/* @ts-ignore */}
                                <p>Директор:<span>{mapData[activeM].director[`${locale}`].name}</span></p>
                                <p>Адрес:<span>{mapData[activeM].address}</span></p>
                                <p>Контакты:<span>{mapData[activeM].contact}</span></p>
                            </div>

                            <h6 className={s.map_subtitle}>Карта проезда</h6>
                            <div className={s.map_google}>
                                <iframe src={`https://www.google.com/maps/embed?pb=${getMapDirection(activeM, locale)}`} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    </SectionWrapper>;
};

