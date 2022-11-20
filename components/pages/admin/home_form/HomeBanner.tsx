import { FC, useEffect, useState } from "react";

import { myAxios } from "assets/axios/myAxios";

import { Field, Form, Formik } from "formik";

import { Button } from "@/components/common/button/Button";
import { FormActions } from "../form_items/FormActions";
import { FormWrapper } from "../form_items/FormWrapper";
import { InputsBlockMain } from "../form_items/InputsBlockMain";
import { InputsWrapper } from "../form_items/InputsWrapper";
import { PreviewImage } from "../form_items/PreviewImage";


import s from "./index.module.scss";


import { bannerNumber, bannerNumberTitles } from "assets/constants/homeForm";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';



export const HomeBanner: FC = (): JSX.Element => {
    const { push } = useRouter();

    const [dataOut, setData] = useState<{
        type: string,
        title: string,
        titleRu: string,
        titleUz: string,
        description: string,
        descriptionRu: string,
        descriptionUz: string,
        pupils: string,
        teachers: string,
        barkamol: string,
        houses: string,
        school: string,
        image: string,
        url: string | null,
        id: number
    } | undefined>(undefined);

    useEffect(() => {
        (async function () {
            try {
                const { data } = await myAxios("/api/dashboard/multipart?type=BANNER");
                setData(data.data[0]);
            } catch (err) {
                console.log(err);
            }
        }());
    }, []);


    const { t } = useTranslation();
    return (
        <FormWrapper>
            <FormActions isDelete={false} data={dataOut} typeOfPage={"Баннер"} />
            <Formik
                initialValues={{
                    type: "BANNER",
                    title: dataOut?.title ?? "",
                    titleRu: dataOut?.titleRu ?? "",
                    titleUz: dataOut?.titleUz ?? "",
                    description: dataOut?.description ?? "",
                    descriptionRu: dataOut?.descriptionRu ?? "",
                    descriptionUz: dataOut?.descriptionUz ?? "",
                    pupils: dataOut?.pupils ?? "",
                    teachers: dataOut?.teachers ?? "",
                    barkamol: dataOut?.barkamol ?? "",
                    houses: dataOut?.houses ?? "",
                    school: dataOut?.school ?? "",
                    image: dataOut?.url ?? "",
                }}
                enableReinitialize={true}
                onSubmit={async (val) => {
                    try {
                        const formData = new FormData();
                        // @ts-ignore
                        for (let key in val) formData.append(key, val[key]);
                        dataOut?.id && formData.append("id", dataOut?.id as any);
                        dataOut ? await myAxios.patch("/api/dashboard/multipart", formData) : await myAxios.post("/api/dashboard/multipart", formData);
                        await push("/admin");
                    } catch (err) {
                        console.log(err);

                    }
                }}
            >
                {({ values, setFieldValue, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <InputsBlockMain title={"Заголовок"} arr={["titleRu", "titleUz", "title"]} />
                        <InputsBlockMain title={"Описание"} arr={["descriptionRu", "descriptionUz", "description"]} />
                        <InputsWrapper title={"Статистика"}>
                            <div className={s.number_banner_wr}>
                                {
                                    bannerNumber.map((item, index) => {
                                        return <div key={item}>
                                            <p className={s.banner_number_title}>{t(`home:${bannerNumberTitles[index]}`)}</p>
                                            <Field name={item} className={"formik_input"} />
                                        </div>;
                                    })
                                }
                            </div>
                        </InputsWrapper>


                        <InputsWrapper title="Фотография">
                            <PreviewImage condit={values?.image}
                                imgUrl={values?.image}
                                valueToDelete={values?.image}
                                formikSetFun={setFieldValue}
                                valueToSave={"image"}
                                isToUpload={true}
                            />
                        </InputsWrapper>

                        <Button classN={"main"} submit={true}>Отправить</Button>
                    </Form>
                )}
            </Formik>
        </FormWrapper >
    );
};