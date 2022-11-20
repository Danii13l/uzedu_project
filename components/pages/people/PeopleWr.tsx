import Image from "next/image";
import { FC } from "react";

import s from "./index.module.scss";


const a = [
    {
        "id": 15,
        "type": "LEADERS",
        "name": "Имя Русский язык",
        "position": "Должность Русский язык",
        "workHours": "Рабочие часы Русский язык",
        "phone": "+998 97 123 123 31",
        "email": "SMT@GMAIL.COM",
        "tg": "",
        "biography": "жил был вйцв йц  вцйв йц вцй цйвцй вц йвйц вцйвйцв вцй вцй вйц",
        "workHistory": [
            {
                "text": "йцукенг шщз фывапр олдж см м Текст на русском"
            }
        ],
        "duty": [
            {
                "text": "Обязанности Текст на русском"
            }
        ],
        "isBoss": 1,
        "url": "/9c3a8404778d40858baf19801.jpeg"
    },
    {
        "id": 16,
        "type": "LEADERS",
        "name": "Имя Русский язык 2",
        "position": "Должность Русский язык 2",
        "workHours": "Рабочие часы Русский язык",
        "phone": "+998 21 233  12 23",
        "email": "SMT@GMAIL.COM2",
        "tg": "ццйуцуцйу йцу 2",
        "biography": " йцу цй вцй уцй уцй вцйу ц цй кцй йцк йц кйц кц 2",
        "workHistory": [
            {
                "text": "Текст на русском 2"
            }
        ],
        "duty": [
            {
                "text": "Текст на английском Обязанности"
            }
        ],
        "isBoss": 0,
        "url": "/9c3a8404778d40858baf19802.jpeg"
    }
]

export const PeopleWr: FC<{ data }> = ({ data }): JSX.Element => {

    return <div className={s.wr}>
        {a && Array.isArray(a) && <>
            {
                a.map(item => {
                    if (item?.isBoss) {
                        return <div className={s.isBoss_wr}>
                            <div className={s.item} key={item.id}>
                                <div className={s.img_wr}>
                                    <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} alt="person" layout="fill" objectFit="cover" unoptimized />
                                </div>
                                <div className={s.content} >
                                    <p>{item.name}</p>
                                    <p>{item.position}</p>
                                </div>
                            </div>

                            <div className={s.isBoss_big_info}>
                                <Image src={'/images/people/isboss_logo.svg'} alt="person" width={156} height={156} quality="100" />
                            </div>
                        </div>
                    }
                })
            }
        </>}

        <div className={s.inner}>
            {a && Array.isArray(a) && <>
                {
                    a.map(item => {
                        if (item?.isBoss === 0) {
                            return <div className={s.item} key={item.id}>
                                <div className={s.img_wr}>
                                    <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.url}`} alt="person" layout="fill" objectFit="cover" unoptimized />
                                </div>
                                <div className={s.content} >
                                    <p>{item.name}</p>
                                    <p>{item.position}</p>
                                </div>
                            </div>
                        }
                    })
                }
            </>}
        </div>
    </div>
}