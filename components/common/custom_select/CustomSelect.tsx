import Image from "next/image";
import {FC, useState, useRef, useEffect, useCallback} from "react";

import styles from "./custom_select.module.scss";
import {useTranslation} from "next-i18next";

interface mySelect {
    options: string[];
    name: string;
    second?: boolean;
    onChange?: any;
    textLabel?: string;
    autoHeight?: true;
    trans?: string;
    initialValue: string
}

export const CustomSelect: FC<mySelect> = ({
                                               name,
                                               options,
                                               second,
                                               onChange,
                                               textLabel,
                                               autoHeight,
                                               trans,
                                               initialValue
                                           }) => {
    const [isOpen, setIsOpen] = useState<boolean | null>(false);
    const [activeVal, setActiveVal] = useState("");
    const selectRef = useRef<HTMLDivElement | null>(null);

    const handleIsOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, [setIsOpen]);

    const handleSelect = useCallback((val: string) => {
        setActiveVal(val);
        setIsOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        document.addEventListener("click", (ev: any) => {
            if (!ev.target.dataset.select) setIsOpen(null);
        });
    }, []);


    const {t} = useTranslation();
    return (
        <>
            <label className={styles.labeltext}>{textLabel}</label>
            <div
                className={styles.select}
                ref={selectRef}
                data-select="custom_select"
            >
                <div className={styles.select_wrapper} data-select="custom_select">
                    <button
                        type="button"
                        className={`${styles.main_input} ${second ? styles.second : ""} ${
                            autoHeight ? styles.autoheight : ""
                        } `}
                        onClick={handleIsOpen}
                        data-select="custom_select"
                    >
                        {t(`${trans}:${activeVal.length > 0 ? initialValue : initialValue}`)}
                    </button>

                    <div className={`${styles.img_wrapper}`}>
                        <Image
                            src={"/images/select/select_arrow.svg"}
                            alt="arrow"
                            layout="fill"
                        />
                    </div>
                </div>

                <ul
                    className={`${styles.list} ${isOpen ? styles.open : ""}`}
                    data-select="custom_select"
                >
                    {options.map((item) => (
                        <li
                            className={`${styles.input} ${second ? styles.second : ""}`}
                            key={item}
                            onChange={onChange}
                            data-select="custom_select"
                        >
                            <label
                                htmlFor={item}
                                className={`${styles.label}`}
                                onClick={() => handleSelect(item)}
                                data-select="custom_select"
                            >
                                {t(`${trans}:${item}`)}
                            </label>
                            <input
                                type="radio"
                                name={name}
                                onChange={onChange}
                                value={item}
                                id={item}
                                className={styles.radio}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};