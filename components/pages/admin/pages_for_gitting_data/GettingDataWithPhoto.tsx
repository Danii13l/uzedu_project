import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { getAuthorizationHeader, myAxios } from "assets/axios/myAxios";
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

  const [dataOut, setDataOut] = useState<any>(null);

  useEffect(() => {
    (async function () {
      try {
        if (slug && (slug[4] === "HOMESLIDER" || slug[4] === "HOMELINKS")) {
          const { data } = await myAxios(`/api/dashboard/multipart?type=${homeFetching[slug[4]]}&lang=ru`, {
            headers: {
              Authorization: getAuthorizationHeader()
            }
          });
          setDataOut(data.data);
        }
        if (slug && slug[4] === "HOMEOPINIONS") {
          const { data } = await myAxios(`/api/dashboard/opinion?lang=ru`, {
            headers: {
              Authorization: getAuthorizationHeader()
            }
          });
          setDataOut(data.data);
        }

        if (slug && slug[4] === "PHOTOS") {
          const { data } = await myAxios(`/api/gallery?lang=ru`, {
            headers: {
              Authorization: getAuthorizationHeader()
            }
          });
          setDataOut(data);
        }

        if (slug && slug[4] === "VIDEOS") {
          const { data } = await myAxios(`/api/video?lang=ru`, {
            headers: {
              Authorization: getAuthorizationHeader()
            }
          });
          setDataOut(data?.data);
        }

        if (slug && slug[4] === "INFO") {
          const { data } = await myAxios(`/api/information?type=${slug && slug[2]}&lang=ru`, {
            headers: {
              Authorization: getAuthorizationHeader()
            }
          });
          setDataOut(data?.data);
        }

        if (slug && slug[4] === "PEOPLE") {
          const { data } = await myAxios(`/api/dashboard/people?type=${slug && slug[2]}&lang=ru`, {
            headers: {
              Authorization: getAuthorizationHeader()
            }
          });
          setDataOut(data?.pages);
        }


      } catch (err) {
        console.log(err);
      }
    })();
  }, [slug]);


  return (
    <div>
      <Link href={createItem}>
        <a className={s.create}>??????????????</a>
      </Link>
      <div className={s.page_wrapper}>
        {dataOut && dataOut?.length > 0 && (
          <div className={s.inner}>
            {dataOut.map((item: any) => {
              return (
                <div className={s.item} key={item.id}>
                  <div className={s.img_wr}>
                    {item?.url && (
                      <Image
                        src={item?.url?.length === 0 ? "/images/common/def_person.jpg" : `${process.env.NEXT_PUBLIC_BASE_URL}${item.url}`}
                        alt={"image"}
                        layout="fill"
                        unoptimized
                        objectFit="cover"
                      />
                    )}

                    {
                      item?.images && <Image
                        src={!item?.images[0]?.url || item?.images[0]?.url?.length === 0 ? "/images/common/default_photo.jpg" : `${process.env.NEXT_PUBLIC_BASE_URL}${item?.images[0]?.url}`}
                        alt={"image"}
                        layout="fill"
                        unoptimized
                        objectFit="cover"
                      />
                    }
                  </div>


                  <div className={s.content}>
                    <h6 className={s.title}>{item?.title}</h6>
                    <h6 className={s.title}>{item?.name}</h6>
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
