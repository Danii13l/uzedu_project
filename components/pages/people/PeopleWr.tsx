import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import s from "./index.module.scss";



export const PeopleWr: FC<{ data: any }> = ({ data }): JSX.Element => {


    const { query: { slug } } = useRouter();

    return <div className={s.wr}>
        {data && Array.isArray(data) && <>
            {
                data.map(item => {
                    if (item?.isBoss) {
                        return <div className={s.isBoss_wr} key={item.id}>
                            <div className={s.item} key={item.id}>
                                <div className={s.img_wr}>
                                    <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} alt="person" layout="fill" objectFit="cover" unoptimized />
                                </div>
                                <div className={s.content} >
                                    <p>{item.name}</p>
                                    <p>{item.position}</p>
                                </div>
                                <Link href={`/people_page/single_person/${slug && slug[2]}/${item.id}`}>
                                    <a className={s.link}></a>
                                </Link>
                            </div>

                            <div className={s.isBoss_big_info}>
                                <div className={s.isBoss_img_wr}>
                                    <Image src={'/images/people/logo.svg'} alt="person" width={140} height={140} quality="100" />
                                </div>

                                <p>{item.name}</p>
                                <p>{item.position}</p>
                            </div>
                        </div>;
                    }
                })
            }
        </>}



        <div className={s.inner}>
            {data && Array.isArray(data) && <>
                {
                    data.map(item => {
                        if (item?.isBoss === 0) {
                            return <div className={s.item} key={item.id}>
                                <div className={s.img_wr}>
                                    <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} alt="person" layout="fill" objectFit="cover" unoptimized />
                                </div>
                                <div className={s.content} >
                                    <p>{item.name}</p>
                                    <p>{item.position}</p>
                                </div>
                                <Link href={`/people_page/single_person/${slug && slug[2]}/${item.id}`}>
                                    <a className={s.link}></a>
                                </Link>
                            </div>;
                        }
                    })
                }
            </>}
        </div>
    </div>;
};