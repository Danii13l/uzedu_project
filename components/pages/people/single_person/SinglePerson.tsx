import Image from "next/image";
import s from "./index.module.scss";
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { RootState } from "assets/redux/store";



export const SinglePerson = ({ data }: any) => {
    const { t } = useTranslation();


    const { bigFont } = useSelector(({ bigFont }: RootState) => bigFont);
    return <>
        {
            data && <div className={`${s.wr} ${bigFont ? s.bigFont : ""}`}>

                <div className={s.who_wr}>
                    <div className={s.img_wr}>
                        <Image src={!data?.url || data?.url?.length === 0 ? "/images/common/def_person.jpg" : `${process.env.NEXT_PUBLIC_BASE_URL}${data?.url}`} alt="person" layout="fill" objectFit="cover" unoptimized />
                    </div>
                    <div className={s.who_info}>
                        <div className={s.who_info_top}>
                            <p>{data?.name}</p>
                            <p>{data?.position}</p>
                        </div>
                        <div className={s.who_info_bot}>
                            <div className={s.who_info_bot_item}>
                                <div className={s.who_info_bot_img}>
                                    <Image src={"/images/people/clock.svg"} alt="icon" layout="fill" objectFit="contain" />
                                </div>
                                <span>{data?.workHours}</span>
                            </div>
                            <div className={s.who_info_bot_item}>
                                <div className={s.who_info_bot_img}>
                                    <Image src={"/images/people/phone.svg"} alt="icon" layout="fill" objectFit="contain" />
                                </div>
                                <span>
                                    {data?.phone}
                                </span>
                            </div>
                            <div className={s.who_info_bot_item}>
                                <div className={s.who_info_bot_img}>
                                    <Image src={"/images/people/email.svg"} alt="icon" layout="fill" objectFit="contain" />
                                </div>
                                <span>{data?.email}</span>
                            </div>
                            <div className={s.who_info_bot_item}>
                                <div className={s.who_info_bot_img}>
                                    <Image src={"/images/people/tg.svg"} alt="icon" layout="fill" objectFit="contain" />
                                </div>
                                <span>
                                    {data?.tg}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>


                <div className={"accordion"}>

                    <div className="accordion_item">
                        <input type="checkbox" name="accord" id="biography" className="accordion__input" />
                        <label htmlFor="biography" className="accordion__label accordion__label_top">
                            <span>
                                {t("people:biography")}
                            </span>

                            <div className="accordion_arr">
                                <img src={"/images/common/accordion_arr.svg"} alt="arr" />
                            </div>
                        </label>
                        <ul className="accordion__content">
                            <li className="accordion__li">
                                <p className="accordion__text" >
                                    {data?.biography}
                                </p>
                                <span className="accordion__li_border"></span>
                            </li>

                            <li className="accordion__li_close">
                                <label htmlFor="biography" >{t("people:close")}</label>
                            </li>
                        </ul>
                    </div>

                    <div className="accordion_item">
                        <input type="checkbox" name="accord" id="workHistory" className="accordion__input" />
                        <label htmlFor="workHistory" className="accordion__label accordion__label_top">
                            <span>
                                {t("people:workHistory")}
                            </span>

                            <div className="accordion_arr">
                                <img src={"/images/common/accordion_arr.svg"} alt="arr" />
                            </div>
                        </label>
                        <ul className="accordion__content">
                            {
                                data?.workHistory.map((item: any, index: number) => {
                                    return <li className="accordion__li" key={index}>
                                        <p className="accordion__text" >
                                            {item?.text}
                                        </p>
                                        <span className="accordion__li_border"></span>
                                    </li>;
                                })
                            }


                            <li className="accordion__li_close">
                                <label htmlFor="workHistory" >{t("people:close")}</label>
                            </li>
                        </ul>
                    </div>


                    <div className="accordion_item">
                        <input type="checkbox" name="accord" id="duty" className="accordion__input" />
                        <label htmlFor="duty" className="accordion__label accordion__label_top">
                            <span>
                                {t("people:duty")}
                            </span>

                            <div className="accordion_arr">
                                <img src={"/images/common/accordion_arr.svg"} alt="arr" />
                            </div>
                        </label>
                        <ul className="accordion__content">
                            {
                                data?.duty.map((item: any, index: number) => {
                                    return <li className="accordion__li" key={index}>
                                        <p className="accordion__text" >
                                            {item?.text}
                                        </p>
                                        <span className="accordion__li_border"></span>
                                    </li>;
                                })
                            }


                            <li className="accordion__li_close">
                                <label htmlFor="duty" >{t("people:close")}</label>
                            </li>
                        </ul>
                    </div>




                </div>





            </div>
        }
    </>;
};