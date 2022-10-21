import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";

import {useEffect, useState} from "react";

import s from '../index.module.scss';


export const Language = () => {
    const router = useRouter();
    const {locales, locale: activeLocale} = router;
    const [open, setOpen] = useState(false);


    useEffect(() => {
        document.addEventListener("click", (ev: any) => {
            ev.target.dataset.lang !== "language" && setOpen(false);
        });
    }, []);

    return (
        <div data-lang="language">
            <div className={s.lang} onClick={() => setOpen(!open)} data-lang="language">
                <div className={s.view} data-lang="language">
                    <button
                        type='button'
                        data-lang="language"
                    >
                        {activeLocale?.toUpperCase()}
                    </button>

                    <div className={s.img_lang_wrap} data-lang="language">
                        <Image
                            src={"/images/header/world.svg"}
                            alt="arrow"
                            width={16}
                            height={16}
                            data-lang="language"
                        />
                    </div>

                </div>

                {
                    open && <div className={s.locales_wrapper} data-lang="language">
                        <div className={s.locales} data-lang="language">
                            {locales?.map((locale) => {
                                const {pathname, query, asPath} = router;
                                return (
                                    <Link
                                        passHref
                                        as={asPath}
                                        key={locale}
                                        locale={locale}
                                        href={{pathname, query}}

                                    >
                                        <a onClick={() => setOpen(!open)}
                                           data-lang="language">{locale.toUpperCase()}</a>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

