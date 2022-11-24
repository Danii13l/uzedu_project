import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import s from "./index.module.scss";
import { useRouter } from 'next/router';
import { months } from 'assets/constants/months';
import { useTranslation } from 'next-i18next';

import { Pagination } from './../../common/pagination/Pagination';



export const InfoWr: FC<{ data: any }> = ({ data }): JSX.Element => {

    const { query: { slug } } = useRouter();

    const { t } = useTranslation();

    return <div className={s.wr}>
        {data?.data && Array.isArray(data?.data) && <div className={s.inner}>
            {
                data?.data.map((item: any) => {
                    return <div className={s.item} key={item.id}>
                        <div className={s.img_wr}>
                            <Image src={!item?.url || item?.url?.length === 0 ? "/images/common/default_photo.jpg" : `${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} alt="person" layout="fill" objectFit="cover" unoptimized />
                        </div>
                        <div className={s.content} >
                            <p>{item.title}</p>
                            <p>{`${item?.createdAt?.slice(8, 10)} ${t(months[item?.createdAt?.slice(5, 7) - 1])} ${item?.createdAt?.slice(0, 4)} ${t("common:year")}`} </p>
                        </div>
                        <Link href={`/info_page/single_info/${slug && slug[0]}/${slug && slug[2]}/${item.id}`}>
                            <a className={s.link}></a>
                        </Link>
                    </div>;

                })
            }
        </div>}


        <Pagination pageCount={data.totalPages} curPage={data.currentPage} />
    </div>;
};