import {FC} from "react";

import { InputInt } from "assets/interfaces/inputInterface";

import styles from "./index.module.scss";

export const TextInput: FC<InputInt> = ({
                                            name,
                                            value,
                                            labelText,
                                            onChange,
                                            onBlur,
                                            isError,
                                            isTouched,
                                            place
                                        }): JSX.Element => {
    return (
        <div>
            {labelText && <label className={styles.label}>{labelText}</label>}
            <input
                type="text"
                name={name}
                className={`${styles.input} ${
                    isError && isTouched ? styles.errorInput : ""
                }`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="on"
                placeholder={place ? place : ""}
            />
            {isError && isTouched && <p className={styles.error}>{isError}</p>}
        </div>
    );
};
