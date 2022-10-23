import {FC} from "react";
import Image from "next/image";

import {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import {useTranslation} from "next-i18next";

import {Title} from "@/components/common/title/Title";
import {SectionWrapper} from "@/components/common/section_wrapper/SectionWrapper";
import {Container} from "@/components/common/container/Container";

const blockquotes = [
    {
        id: 1,
        name: "Дэниел Розенблюм",
        who: "посол США в Узбекистане",
        text: "«Качественное образование — мощный драйвер развития и один из самых действенных инструментов сокращения бедности и улучшения здоровья, гендерного равенства, мира и стабильности. Когда дети учатся и преуспевают, они вырастают во взрослых, которые меняют свою жизнь и свою страну»."
    },
    {
        id: 2,
        name: "Дэниел Розенблюм",
        who: "посол США в Узбекистане",
        text: "«Качественное образование — мощный драйвер развития и один из самых действенных инструментов сокращения бедности и улучшения здоровья, гендерного равенства, мира и стабильности. Когда дети учатся и преуспевают, они вырастают во взрослых, которые меняют свою жизнь и свою страну  которые меняют свою жизнь и свою страну  которые меняют свою жизнь и свою страну  которые меняют свою жизнь и свою страну»."
    },
];

export const Opinions: FC = (): JSX.Element => {
    const {t} = useTranslation();

    return <div className={"opinions"}>
        <SectionWrapper>
            <Container>
                <div className={"opinions__title"}>
                    <Title title={t("home:opinions")}/>
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={0}
                    slidesPerView={1}
                >
                    {
                        blockquotes.map(item => {
                            return <SwiperSlide key={item.id}>
                                <div className={"opinions__slide"}>
                                    <div className={"opinions__quote"}>
                                        <Image src={"/images/home/quote.svg"} width={66} height={50}/>
                                    </div>
                                    <h6 className={"opinions__name"}>{item.name}</h6>
                                    <p className={"opinions__who"}>{item.who}</p>
                                    <p className={"opinions__text"}>{item.text}</p>

                                    <div className={"opinions__quote_bottom"}>
                                        <Image src={"/images/home/quote.svg"} width={66} height={50}/>
                                    </div>

                                    <div className={"opinions__slide_shadow"}></div>
                                    <div className={"opinions__slide_bg"}></div>
                                </div>
                            </SwiperSlide>
                        })
                    }

                </Swiper>
            </Container>
        </SectionWrapper>
    </div>
}