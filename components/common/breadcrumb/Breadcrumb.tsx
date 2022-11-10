import {FC} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import s from "./index.module.scss";

import {useTranslation} from "next-i18next";


export const Breadcrumb: FC = (): JSX.Element => {
    const {t} = useTranslation();
    const {query: {slug}} = useRouter();

    // @ts-ignore
    const filteredBread = slug && slug?.filter(item => item.length > 3)


    return <div className={s.bread}>
        <Link href={"/"}><a>Главная</a></Link>

        {filteredBread && filteredBread.map((item: string) => {
            return <div className={s.submenu} key={item}>
                <div className={s.circle}></div>
                <span>{t(`header:${item}`)}</span>
            </div>
        })

        }
    </div>
}