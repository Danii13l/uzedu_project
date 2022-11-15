import s from "./index.module.scss";
import { Title } from '@/components/common/title/Title';
import { Container } from "@/components/common/container/Container";
import { SectionWrapper } from '@/components/common/section_wrapper/SectionWrapper';
import Image from "next/image";
import { Button } from "@/components/common/button/Button";
import { useState } from 'react';


const mapData = [
    {
        district: "buhara",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "kagan",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
    },
    {
        district: "altay",
        director: {
            ru: { name: "Хусенов Шерзод" },
            uz: { name: "Хусенов Шерзод UZ" },
            en: { name: "Хусенов Шерзод En" },
        },
        address: "G`afur G`ulom кучаси 9 уй",
        contact: "+998 65 332-15-44"
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
    const [modal, setModal] = useState(true);

    return <SectionWrapper>
        <Container>
            <div className={s.title_wr}>
                <Title title={"Интерактивная карта Бухарской области"} />
                <p className={s.subtitle}>Районные отделы</p>
            </div>
            <div className={s.img_wr}>
                <Image src={"/images/home/map.jpg"} alt="map" layout="fill" objectFit="cover" quality={100} />
            </div>

            <div className={s.btn}>
                <Button classN="second">Подробнее</Button>
            </div>

            <div className={`${s.modal_map} ${modal ? s.active : ""}`}>
                <div className={s.modal_inner}>
                    <div className={s.modal_top}>
                        <p>Бухарская область</p>
                        <div className={s.modal_top_img_wr}>
                            <Image src={"/images/home/close_map.svg"} alt="close" layout="fill" objectFit="cover" />
                        </div>
                    </div>

                    <div className={s.module_inner}>
                        <ul className={s.module_inner_left}>

                        </ul>
                        <div className={s.module_inner_right}></div>
                    </div>

                </div>
            </div>
        </Container>
    </SectionWrapper>;
};

