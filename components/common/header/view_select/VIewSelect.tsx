import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";

import { setBigFont } from "assets/redux/slices/bigFont";
import { setBAndW } from "assets/redux/slices/blackWhite";

import s from "../index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "assets/redux/store";
import { useTranslation } from 'next-i18next';

export const ViewSelect: FC = (): JSX.Element => {
    const [settingView, setSettingView] = useState(false);
    const { bAndw } = useSelector(({ blackWhite }: RootState) => blackWhite);
    const { bigFont } = useSelector(({ bigFont }: RootState) => bigFont);
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const handleBlackAndWhite = useCallback((val: boolean) => {
        return () => dispatch(setBAndW(val));
    }, []);

    const handleBigFont = useCallback((val: boolean) => {
        return () => dispatch(setBigFont(val));

    }, []);


    const handleSettingView = useCallback(() => {
        return setSettingView(prev => !prev);
    }, []);



    useEffect(() => {
        document.addEventListener("click", (ev: any) => {
            if (!ev.target.dataset.setview) setSettingView(false);
        });
    }, []);

    return <div className={s.setting} data-setview={"setting_view"}>
        <Image data-setview={"setting_view"} src={"/images/header/eye.svg"} width={18} height={12} alt="eye"
            onClick={handleSettingView} />

        {settingView && <div className={s.s_inner} data-setview={"setting_view"}>
            <div className={s.s_item} data-setview={"setting_view"}>
                <p data-setview={"setting_view_title"} className={s.s_item_title}>{t("header:view")}</p>
                <div className={`${s.s_item_inner} ${s.s_item_inner_color}`} data-setview={"setting_view_box"}>
                    <div className={!bAndw ? s.active : ""} onClick={handleBlackAndWhite(false)} data-setview={"setting_view"}>A</div>
                    <div className={bAndw ? s.active : ""} onClick={handleBlackAndWhite(true)} data-setview={"setting_view"}>A</div>
                </div>
            </div>

            <div className={s.s_item_inner_border}></div>
            <div className={`${s.s_item} ${s.s_item_second}`} data-setview={"setting_view"}>
                <p data-setview={"setting_view_title"} className={s.s_item_title}>{t("header:fontsize")}</p>
                <div className={`${s.s_item_inner} ${s.s_item_inner_font}`} data-setview={"setting_view_box"}>
                    <div className={!bigFont ? s.active : ""} onClick={handleBigFont(false)} data-setview={"setting_view"}>A</div>
                    <div className={bigFont ? s.active : ""} onClick={handleBigFont(true)} data-setview={"setting_view"}>A</div>
                </div>
            </div>
        </div>
        }
    </div>;
};