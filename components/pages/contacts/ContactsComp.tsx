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
                <h4 className={s.modal_title}>{t("home:buharatitle")}</h4>
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
    </div>;
};