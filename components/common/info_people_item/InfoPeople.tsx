import Image from "next/image";
import { FC } from "react";

import s from "./index.module.scss";

interface InfoPeopleTitleInt {
    title: string;
    name: string;
    position: string;
    description: string,
    phone: string,
    email: string,
    tg: string,
    biography: string,
    workHistory: { text: string }[],
    duty: { text: string }[],
    isBoss: number,
    url: string

}

export const InfoPeopleItem: FC<{ data: InfoPeopleTitleInt }> = ({ data }): JSX.Element => {
    return <div className={s.item}>
        <div className={s.img_wr}>
            <Image src={`/person.jpg`} objectFit="cover" layout="fill" alt="person" />
        </div>

        <div className={s.content}>
            <p className={s.title}>{data?.title}</p>
            {data?.position && <p className={s.subtitle}>{data?.position}</p>}
        </div>
    </div>;
};