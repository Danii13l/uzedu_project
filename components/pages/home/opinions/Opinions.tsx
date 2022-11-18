import { FC } from "react";
import Image from "next/image";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useTranslation } from "next-i18next";

import { Title } from "@/components/common/title/Title";
import { SectionWrapper } from "@/components/common/section_wrapper/SectionWrapper";
import { Container } from "@/components/common/container/Container";


import { cutText } from "assets/function/cutText";

interface OpinionsInt {
    id: number;
    subtitle: string;
    text: string;
    title: string;
}

export const Opinions: FC<{ data: OpinionsInt[] }> = ({ data }): JSX.Element => {
    const { t } = useTranslation();

    return <div className={"opinions"}>
        <SectionWrapper>
            <Container>
                <div className={"opinions__title"}>
                    <Title title={t("home:opinions")} />
                </div>

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{
                        clickable: true,
                    }}
                    spaceBetween={20}
                    slidesPerView={1}
                >
                    {
                        data && typeof data !== "string" && data.map(item => {
                            return <SwiperSlide key={item.id}>
                                <div className={"opinions__slide"}>
                                    <div className={"opinions__quote"}>
                                        <Image src={"/images/home/quote.svg"} layout={"fill"} alt="quote" />
                                    </div>
                                    <h6 className={"opinions__name"}>{item?.title}</h6>
                                    <p className={"opinions__who"}>{item?.subtitle}</p>
                                    <p className={"opinions__text"}> {cutText(item?.text, 392)}</p>

                                    <div className={"opinions__quote_bottom"}>
                                        <Image src={"/images/home/quote.svg"} layout={"fill"} alt="quote" />
                                    </div>

                                    <div className={"opinions__slide_shadow"}></div>
                                    <div className={"opinions__slide_bg"}></div>
                                </div>
                            </SwiperSlide>;
                        })
                    }

                </Swiper>
            </Container>
        </SectionWrapper>
    </div>;
};