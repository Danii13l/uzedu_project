import { FC, useState } from "react";
import Image from "next/image";

import { InputInt } from "assets/interfaces/inputInterface";

import styles from "./index.module.scss";

export const PasswordInput: FC<InputInt> = ({
  name,
  labelText,
  onChange,
  onBlur,
  value,
  isError,
  isTouched,
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div>
      {labelText && <label className={styles.label}>{labelText}</label>}
      <div className={styles.input_password_wrapper}>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className={`${styles.input} ${
            isError && isTouched ? styles.errorInput : ""
          }`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="on"
        />
        {showPassword ? (
          <span className={styles.img_password_wrapper}>
            <Image
              src="/images/inputs/open_eye.svg"
              onClick={() => setShowPassword(!showPassword)}
              alt="eye"
              layout="fill"
            />
          </span>
        ) : (
          <span className={styles.img_password_wrapper}>
            <Image
              src="/images/inputs/closed_eye.svg"
              onClick={() => setShowPassword(!showPassword)}
              alt="eye"
              layout="fill"
            />
          </span>
        )}
      </div>
      {isError && isTouched && <p className={styles.error}>{isError}</p>}
    </div>
  );
};
