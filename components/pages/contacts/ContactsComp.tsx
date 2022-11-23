import { Title } from "@/components/common/title/Title";
import { mapData } from "assets/constants/map";
import { getMapDirection } from "assets/function/getMapdirection";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";
import { FC, useState } from "react";
import s from "./index.module.scss";
import { PageInt } from 'assets/interfaces/PageDataInt';


export const ContactsComp: FC<{ data: PageInt }> = ({ data }) => {


    const [activeM, setActiveM] = useState(0);
    const [toggleList, setToggleList] = useState(false);
    const { locale } = useRouter();

    const { t } = useTranslation();

    const handleActiveM = (num: number) => {
        return () => setActiveM(num);
    };

    const handleToggleList = () => {
        return () => setToggleList(prev => !prev);
    };

    return <div className={s.contacts}>
        {
            data && <>
                <Title title={data?.title} />
                <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
            </>
        }

        <div className={s.modal_inner}>
            <div className={s.modal_top}>
                <h4 className={s.modal_title}>Бухарская область</h4>
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
    </div>;
};