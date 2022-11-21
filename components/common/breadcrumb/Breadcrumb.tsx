import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import s from "./index.module.scss";

import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import { RootState } from "assets/redux/store";


export const Breadcrumb: FC<{ nextlast?: string, last?: string }> = ({ last, nextlast }): JSX.Element => {
    const { t } = useTranslation();
    const { query: { slug } } = useRouter();

    const { bigFont } = useSelector(({ bigFont }: RootState) => bigFont);

    // @ts-ignore
    const filteredBread = slug && slug?.filter(item => item.length > 3);

    return <div className={`${s.bread} ${bigFont ? s.bigFont : ""}`}>
        <Link href={"/"}><a>{t("header:main")}</a></Link>


        {filteredBread && filteredBread.map((item: string) => {
            return <div className={s.submenu} key={item}>
                <div className={s.circle}></div>
                <span>{t(`header:${item}`)}</span>
            </div>;
        })

        }

        {

            nextlast && <div className={s.submenu} >
                <div className={s.circle}></div>
                <span>{nextlast}</span>
            </div>
        }

        {
            last && <div className={s.submenu} >
                <div className={s.circle}></div>
                <span>{last}</span>
            </div>
        }
    </div>;
};