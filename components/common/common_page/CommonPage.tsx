import { FC } from "react";

import s from './index.module.scss';

import { Breadcrumb } from "@/components/common/breadcrumb/Breadcrumb";
import { Container } from "@/components/common/container/Container";

import { PageInt } from "assets/interfaces/PageDataInt";
import { useSelector } from "react-redux";
import { RootState } from "assets/redux/store";

export const CommonPage: FC<{ data: PageInt }> = ({ data }): JSX.Element => {

    const { bigFont } = useSelector(({ bigFont }: RootState) => bigFont);

    return <div className={bigFont ? "bigFont" : ""}>
        <div className={s.page}>
            <Container>
                <Breadcrumb />
                {
                    data && <div className={s.inner}>
                        <h1 className={s.title}>{data.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                    </div>
                }

                {data?.files && data?.files.map((item, index: number) => {
                    return <div className="page_download_wr" key={index}>
                        <p className="page_inner_text">{item?.title}</p>
                        <a className="page_inner_link_download" href={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} download>Скачать
                            <img src="/images/button/download.svg" alt="image" />
                        </a>
                    </div>;
                })}

                {
                    data?.images && data?.images.map((item, index: number) => {
                        return <div className="page_img_wrapper" key={index}>
                            <img src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} alt="image" className="page_img" />
                            <div className="page_img_shadow"></div>
                        </div>;
                    })
                }

                {
                    data?.videos && data?.videos.map((item, index: number) => {
                        return <div className="video_wrapper" key={index}>
                            <h3 className="page_titles">{item?.title}</h3>
                            <div className="video_box">
                                <iframe width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${item?.url}`}
                                    title="Заголовок"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </div>;
                    })
                }
            </Container>
        </div>;
    </div>;
};

