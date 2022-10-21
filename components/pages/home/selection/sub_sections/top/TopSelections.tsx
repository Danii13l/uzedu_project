import {FC} from "react";


import {Container} from "@/components/common/container/Container";
import {Button} from "@/components/common/button/Button";
import Image from "next/image";


import {Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

//fake
const fakeSlider = [
    {id: 1, text: "Базы данных", subtext: "Системы народного образования", img: "/images/home/laptop_book.png"},
    {id: 2, text: "Базы данных", subtext: "Системы народного образования", img: "/images/home/laptop_book.png"},
]

const cardStyles = {
    "swiper": {
        "swiper-pagination": {
            background: "red"
        }
    },

};

export const TopSelections: FC = (): JSX.Element => {
    return <div className={"topSelections"}>
        <Container>
            <div className={"topSelections__inner"}>
                <div className={"topSelections__inner_left"}>
                    <div className={"topSelections__l_inner"}>
                        <div className={"topSelections__l_img_wrap"}>
                            <Image src={"/images/home/call_center.svg"} width={48} height={48}/>
                        </div>
                        <div className={"topSelections__l_content"}>
                            <p>Телефон доверия</p>
                            <a href={"tel:+998712020909"}>(71) 202 09 09</a>
                        </div>
                    </div>
                    <Button classN={"main"}>Оценить</Button>
                </div>
                <div className={"topSelections__right"}>
                    <div className={"topSelections__slider"}>
                        <Swiper
                            modules={[Pagination]}
                            pagination={{
                                clickable: true,
                            }}
                            spaceBetween={0}
                            slidesPerView={1}
                        >
                            {
                                fakeSlider.map(item => {
                                    return <SwiperSlide key={item.id}>
                                        <div className={"topSelections__slide"}>
                                            <div className={"topSelections__slide_img_wrap"}>
                                                <Image src={item.img} layout={"fill"}/>
                                            </div>
                                            <div className={"topSelections__slide_content"}>
                                                <p>{item.text}</p>
                                                <p>{item.subtext}</p>
                                            </div>

                                            <div className={"topSelections__slide_btn"}>
                                                <Button classN={"main"}>Подробнее</Button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                })
                            }


                        </Swiper>
                    </div>
                </div>
            </div>
        </Container>
    </div>
}