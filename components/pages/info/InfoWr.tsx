import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import s from "./index.module.scss";
import { useRouter } from 'next/router';



export const InfoWr: FC<{ data: any }> = ({ data }): JSX.Element => {

    const { query: { slug } } = useRouter();
    return <div className={s.wr}>
        {data && Array.isArray(data) && <div className={s.inner}>
            {
                data.map(item => {

                    return <div className={s.item} key={item.id}>
                        <div className={s.img_wr}>
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} alt="person" layout="fill" objectFit="cover" unoptimized />
                        </div>
                        <div className={s.content} >
                            <p>{item.title}</p>
                        </div>
                        <Link href={`/info_page/single_info/${slug && slug[0]}/${slug && slug[2]}/${item.id}`}>
                            <a className={s.link}></a>
                        </Link>
                    </div>;

                })
            }
        </div>}

    </div>;
};