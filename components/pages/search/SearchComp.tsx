import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./index.module.scss";


export const SearchComp = ({ data }: any) => {
    return <div className={s.wr}>
        {data && Array.isArray(data) && <div className={s.inner}>
            {
                data.map(item => {

                    return <div className={s.item} key={item.id}>
                        <div className={s.img_wr}>
                            <Image src={!item?.url || item?.url?.length === 0 ? "/images/common/default_photo" : `${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} alt="search" layout="fill" objectFit="cover" unoptimized />
                        </div>
                        <div className={s.content} >
                            <p>{item.title}</p>
                            <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                        </div>
                        <Link href={`/info_page/single_info/search/${item.type?.toLowerCase()}/${item.id}`}>
                            <a className={s.link}></a>
                        </Link>
                    </div>;

                })
            }
        </div>}
    </div>;
};