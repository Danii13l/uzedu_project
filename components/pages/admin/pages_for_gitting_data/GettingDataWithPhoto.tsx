import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { myAxios } from "assets/axios/myAxios";
import Image from "next/image";

import s from "./index.module.scss";


const homeFetching: { HOMESLIDER: "SLIDER"; HOMELINKS: "LINK" } = {
  HOMESLIDER: "SLIDER",
  HOMELINKS: "LINK",
};

export const GettingDataWithPhoto: FC<{ linkToForm: string, createItem: string }> = ({ linkToForm, createItem }): JSX.Element => {
  const {
    query: { slug },
  } = useRouter();

  const [dataOut, setDataOut] = useState<
    | {
      title: string;
      id: number;
      description: string;
      url: string;
    }[]
    | null
  >(null);

  useEffect(() => {
    (async function () {
      try {
        if (slug && (slug[4] === "HOMESLIDER" || slug[4] === "HOMELINKS")) {
          const { data } = await myAxios(`/api/dashboard/multipart?type=${homeFetching[slug[4]]}&lang=ru`);
          setDataOut(data.data);
        }
        if (slug && slug[4] === "HOMEOPINIONS") {
          const { data } = await myAxios(`/api/dashboard/opinion?lang=ru`);
          setDataOut(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [slug]);

  return (
    <div>
      <Link href={createItem}>
        <a className={s.create}>Создать</a>
      </Link>
      <div className={s.page_wrapper}>
        {dataOut && (
          <div className={s.inner}>
            {dataOut.map((item) => {
              return (
                <div className={s.item} key={item.id}>
                  <div className={s.img_wr}>
                    {item.url && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.url}`}
                        alt={"image"}
                        layout="fill"
                        unoptimized
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <div className={s.content}>
                    <h6 className={s.title}>{item.title}</h6>
                    {item?.description && (
                      <p className={s.description}>{item.description}</p>
                    )}
                  </div>
                  <Link href={`/admin/create_edit_delete_item/${linkToForm}/${item.id}`}>
                    <a className={s.link}></a>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
