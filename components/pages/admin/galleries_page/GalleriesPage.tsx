import React, {FC, useEffect, useState} from "react";

import {myAxios} from "assets/axios/myAxios";

import s from './index.module.scss';
import Link from "next/link";
import Image from "next/image";


export const GalleriesPage: FC = (): JSX.Element => {

    const [data, setData] = useState(null);
    useEffect(() => {
        const fetcher = async () => {
            try {
                const {data} = await myAxios("/api/gallery");
                setData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetcher();
    }, []);



    return <div className={s.gal_wr}>
        {
            data && data.map(item => {
                return <div key={item.id} className={s.gal}>
                    <div className={s.inner}>
                        <div className={s.img_wr}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.images[0].url}`}
                                layout={"fill"}
                                objectFit={"cover"}
                                alt={"picture"}
                                unoptimized
                            />
                        </div>

                        <div>
                            <p className={s.order}>Галерея № {item.id}</p>
                            <p className={s.title}>{item.title}</p>
                        </div>

                    </div>

                    <Link href={`/admin/edit_gallery/fotogallery/${item.id}`.replaceAll(",", "")}>
                        <a className={s.link}></a>
                    </Link>
                </div>;
            })
        }

    </div>;
};