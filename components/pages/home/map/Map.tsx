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
import { mapData } from "assets/constants/map";




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
                <Title title={t("home:mapint")} />
                <p className={s.subtitle}>{t("home:districtdepartments")}</p>
            </div>
            <div className={s.img_wr_main}>
                <div className={s.img_wr}>
                    <Image src={"/images/home/map_buhara.png"} alt="map" layout="fill" objectFit="contain" quality={100} />
                </div>
            </div>


            <div className={s.btn} onClick={handleModal(true)}>
                <Button classN="second">{t("buttons:more")}</Button>
            </div>

            <div className={`${s.modal_map} ${modal ? s.active : ""}`}>
                <div className={s.modal_inner}>
                    <div className={s.modal_top}>
                        <h4 className={s.modal_title}>{t("home:buharatitle")}</h4>
                        <div className={s.modal_top_img_wr} onClick={handleModal(false)}>
                            <Image src={"/images/home/close_map.svg"} alt="close" layout="fill" objectFit="cover" />
                        </div>
                    </div>

                    <div className={s.map_inner}>
                        <span className={s.list_control} onClick={handleToggleList()}>{t("home:regions")}</span>
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
                                <p>{t("home:director")}:<span>{mapData[activeM].director}</span></p>
                                <p>{t("home:contacts")}:<span>{mapData[activeM].address}</span></p>
                                <p>{t("home:address")}:<span>{mapData[activeM].contact}</span></p>
                            </div>

                            <h6 className={s.map_subtitle}>{t("home:roadmap")}</h6>
                            <div className={s.map_google}>
                                <iframe src={`https://yandex.ru/map-widget/v1/?um=constructor%${getMapDirection(activeM)};source=constructor`} width="100%" height="100%" frameBorder="0"></iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    </SectionWrapper>;
};

