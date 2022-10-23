import {FC} from "react";
import Image from "next/image";

import s from './index.module.scss';

import {SectionWrapper} from "@/components/common/section_wrapper/SectionWrapper";


export const Banner: FC = (): JSX.Element => {
    return <div className={s.banner} style={{backgroundImage: "url(/images/home/banner_home.jpg)"}}>
        <SectionWrapper>
            <div className={s.inner}>
                <div className={s.socials}>
                    <a href={"#"}><Image src={"/images/home/fb.svg"} width={28} height={28}/></a>
                    <a href={"#"}><Image src={"/images/home/inst.svg"} width={28} height={28}/></a>
                    <a href={"#"}><Image src={"/images/home/tg.svg"} width={28} height={28}/></a>

                </div>
                <div className={s.content}>
                    <h1 className={s.title}>Министерство народного образования Республики Узбекистан</h1>
                    <blockquote className={s.blockquote}>“Школа является фундаментом образования и воспитания, а учителя
                        составляют его краеугольный
                        камень”
                    </blockquote>

                    <p className={s.name}>Шавкат Мирзиёев</p>
                </div>


            </div>

            <div className={s.line_content}>
                <div className={s.line_items}>
                    <h4 className={s.l_i_title}>6,2 млн</h4>
                    <p className={s.l_i_text}>Учеников</p>
                </div>
                <div className={s.line_items}>
                    <h4 className={s.l_i_title}>502 687</h4>
                    <p className={s.l_i_text}>Преподователей</p>
                </div>
                <div className={s.line_items}>
                    <h4 className={s.l_i_title}>230</h4>
                    <p className={s.l_i_text}>“Школ Баркамол авлод”</p>
                </div>
                <div className={s.line_items}>
                    <h4 className={s.l_i_title}>4</h4>
                    <p className={s.l_i_text}>Дома милосердия</p>
                </div>
                <div className={s.line_items}>
                    <h4 className={s.l_i_title}>10 130</h4>
                    <p className={s.l_i_text}>Школ</p>
                </div>
            </div>
        </SectionWrapper>
    </div>
}