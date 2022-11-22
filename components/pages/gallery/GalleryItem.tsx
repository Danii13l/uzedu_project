import { FC, useCallback, useState } from "react";

import s from "./index.module.scss";
import Image from 'next/image';

import LightGallery from "lightgallery/react";
import { useTranslation } from 'next-i18next';
import { months } from './../../../assets/constants/months';


interface GalleryInt {
    id: number; title: string; images: { url: string; id: number }[]; links: { link: string }[]; url: string; link: string; createdAt: string
}

export const GalleryItem: FC<{ data: GalleryInt[], isVideo?: boolean }> = ({ data, isVideo }): JSX.Element => {
    const [toggleVid, setToggleVid] = useState(false);
    const [activeV, setActiveV] = useState(0);

    const { t } = useTranslation();

    const handleToggleVid = useCallback((val: boolean, ind: number) => {
        return () => {
            setToggleVid(val);
            setActiveV(ind);
        };
    }, []);


    return <>
        <div className={s.wrapper}>
            {
                data && data.map((item, indMain) => {
                    return <div className={s.item} key={item.id} >
                        <div className={s.img_wr}>

                            {
                                isVideo ?
                                    <div onClick={handleToggleVid(true, indMain)}>
                                        <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.url}`} alt={item.title} unoptimized layout="fill" objectFit="cover" />
                                    </div>
                                    :
                                    <>
                                        <LightGallery speed={300}>
                                            <>  {
                                                item?.images?.map((img, index) => {
                                                    return <a href={`${process.env.NEXT_PUBLIC_BASE_URL}${img?.url}`} className={`${s.img_link} ${index === 0 ? s.active : ""}`} key={index} >
                                                        <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${img?.url}`} alt={item.title} unoptimized layout="fill" objectFit="cover" />
                                                    </a>;
                                                })
                                            }</>
                                        </LightGallery>
                                        <p className={s.count_photo}>
                                            {item?.images?.length} <span>Фото</span>
                                        </p></>
                            }


                        </div>
                        <div className={s.content}>
                            <p className={s.title}>{item.title}</p>
                            {/* @ts-ignore */}
                            <p className={s.date}>{`${item?.createdAt?.slice(8, 10)} ${t(months[item?.createdAt?.slice(5, 7) - 1])} ${item?.createdAt?.slice(0, 4)} ${t("common:year")}`} </p>
                        </div>
                        {
                            <div className={`${s.vid_modal} ${toggleVid ? s.active : ""}`}>
                                <div className={s.vid_close} onClick={handleToggleVid(false, 0)}>
                                    <Image src={`/images/header/close_search.svg`} alt={"close"} layout="fill" />
                                </div>

                                <div className={s.vid_wr}>
                                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${data[activeV]?.link}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </div>
                            </div>
                        }

                    </div>;
                })
            }
        </div >




    </>;
};