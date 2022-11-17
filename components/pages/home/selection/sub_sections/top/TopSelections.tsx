import { FC } from "react";
import Image from "next/image";


import { Container } from "@/components/common/container/Container";
import { Button } from "@/components/common/button/Button";


import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

interface SliderInt {
    id: number;
    title: string;
    description: string;
    url: string;
    link: string;
};

export const TopSelections: FC<{ data: SliderInt[] }> = ({ data }): JSX.Element => {
    return <div className={"topSelections"}>
        <Container>
            <div className={"topSelections__inner"}>
                <div className={"topSelections__inner_left"}>
                    <div className={"topSelections__l_inner"}>
                        <div className={"topSelections__l_img_wrap"}>
                            <Image src={"/images/home/call_center.svg"} width={48} height={48} alt={"call_center"} />
                        </div>
                        <div className={"topSelections__l_content"}>
                            <p>Телефон доверия</p>
                            <a href={"tel:+998712020909"}>(71) 202 09 09</a>
                        </div>
                    </div>
                    <div className={"topSelections__l_btn"}>
                        <Button classN={"main"}>Оценить</Button>
                    </div>
                </div>
                <div className={"topSelections__right"}>
                    <div className={"topSelections__slider"}>
                        <Swiper
                            modules={[Pagination]}
                            pagination={{
                                clickable: true,
                            }}
                            spaceBetween={10}
                            slidesPerView={1}
                        >
                            {
                                data && data.map(item => {
                                    return <SwiperSlide key={item.id}>
                                        <div className={"topSelections__slide"}>
                                            <div className={"topSelections__slide_img_wrap"}>
                                                <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} layout={"fill"} alt="slider" unoptimized />
                                            </div>
                                            <div className={"topSelections__slide_content"}>
                                                <p>{item.title}</p>
                                                <p>{item.description}</p>
                                            </div>

                                            <Link href={item?.link}>
                                                <a className={"topSelections__slide_btn"}><Button classN={"main"}>Подробнее</Button></a>
                                            </Link>
                                        </div>
                                    </SwiperSlide>;
                                })
                            }


                        </Swiper>
                    </div>
                </div>
            </div>
        </Container>
    </div>;
};