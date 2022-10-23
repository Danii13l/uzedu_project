import {FC} from "react";

import s from "./index.module.scss";

import {SectionWrapper} from "@/components/common/section_wrapper/SectionWrapper";
import {Title} from "@/components/common/title/Title";
import {TextInput} from "@/components/common/input/TextInput";
import {PhoneInput} from "@/components/common/input/PhoneInput";
import {TextArea} from "@/components/common/input/TextArea";

import {useTranslation} from "next-i18next";

import {FormikProps, useFormik} from "formik";
import {ContactUsInt, ContactUsSchema} from "assets/validation_form/contact_us";

export const ContactUs: FC = (): JSX.Element => {

    const {t} = useTranslation();

    const formik: FormikProps<ContactUsInt> = useFormik<ContactUsInt>({
        initialValues: {
            username: "",
            phone: "",
            email: "",
            question: ""
        },
        validationSchema: ContactUsSchema,
        onSubmit: async (values) => {
        },
    });

    return <div className={s.contact}>
        <SectionWrapper>
            <form className={s.form}>

                <div className={s.title_wrapper}>
                    <Title title={t("home:contactus")}/>
                    <p className={s.subtitle}>{t("home:wewillcontact")}</p>
                </div>

                <TextInput
                    labelText={t("common:name")}
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isError={formik.errors.username}
                    isTouched={formik.touched.username}
                    value={formik.values.username}
                    place={t("common:howcallyou")}
                />
                <div className={s.email_phone_wr}>
                    <PhoneInput
                        name="phone"
                        labelText={t("common:phonen")}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isError={formik.errors.phone}
                        isTouched={formik.touched.phone}
                        value={formik.values.phone}
                    />

                    <TextInput
                        labelText={t("common:email")}
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isError={formik.errors.email}
                        isTouched={formik.touched.email}
                        value={formik.values.email}
                        place={"example@mail.com"}
                    />
                </div>


                <TextArea name={"question"}
                          labelText={t("common:comment")}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isError={formik.errors.question}
                          isTouched={formik.touched.question}
                          value={formik.values.question}
                          place={"Ваш вопрос"}/>
            </form>
        </SectionWrapper>
    </div>
}