import { useRouter } from "next/router";
import { FormWrapper } from "@/components/pages/admin/form_items/FormWrapper";
import { Form, Formik } from "formik";

import { InputsBlockMain } from "@/components/pages/admin/form_items/InputsBlockMain";
import { Button } from "@/components/common/button/Button";

import { InputsFormik } from "@/components/common/input/InputsFormik";
import { InputsWrapper } from "@/components/pages/admin/form_items/InputsWrapper";

import { getAuthorizationHeader, myAxios } from 'assets/axios/myAxios';
import { FC, useEffect, useState } from "react";
import { FormActions } from './../form_items/FormActions';
import { PreviewImage } from '@/components/pages/admin/form_items/PreviewImage';


export const VideoGallery: FC<{ id?: string }> = ({ id }) => {

    const { push } = useRouter();

    const [dataOut, setData] = useState<{
        id: number;
        titleRu: string;
        titleUz: string;
        title: string;
        url: string;
        link: string;
    } | null>(null);

    useEffect(() => {
        (async function () {
            try {
                if (id) {
                    const { data } = await myAxios(`/api/dashboard/video/${id}`, {
                        headers: {
                            'Authorization': getAuthorizationHeader()
                        }
                    });
                    setData(data);
                }

            } catch (err) {
                console.log(err);
            }
        }());
    }, []);

    return <FormWrapper>
        <FormActions isDelete={true} data={dataOut} typeOfPage={"Видео Галерея"} deleteFetch={`dashboard/video`} pushTo="/admin/pages/informationService/5/videogallery/38/VIDEOS" />
        <Formik
            initialValues={{
                titleRu: dataOut?.titleRu ?? "",
                titleUz: dataOut?.titleUz ?? "",
                title: dataOut?.title ?? "",
                image: dataOut?.url ?? "",
                link: dataOut?.link ?? "",
            }}
            enableReinitialize={true}
            onSubmit={async (val) => {
                try {
                    const formData = new FormData();
                    // @ts-ignore
                    for (let key in val) formData.append(key, val[key]);
                    dataOut?.id && formData.append("id", dataOut?.id as any);

                    dataOut?.id ? await myAxios.put("/api/dashboard/video", formData, {
                        headers: {
                            'Authorization': getAuthorizationHeader()
                        }
                    }) : await myAxios.post("/api/dashboard/video", formData, {
                        headers: {
                            'Authorization': getAuthorizationHeader()
                        }
                    });
                    await push("/admin/pages/informationService/5/videogallery/38/VIDEOS");
                } catch (err) {
                    console.log(err);
                }
            }}
        >
            {({ values, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <InputsBlockMain title={"Заголовок"} arr={["titleRu", "titleUz", "title"]} />

                    <InputsWrapper title={"Ссылка"}>
                        <InputsFormik name={`link`} label={""} />
                    </InputsWrapper>

                    <InputsWrapper title={"Фотография"}>
                        <PreviewImage condit={values?.image}
                            imgUrl={values?.image}
                            valueToDelete={values?.image}
                            formikSetFun={setFieldValue}
                            valueToSave={"image"}
                            isToUpload={true}
                        />
                    </InputsWrapper>
                    <div>
                        <Button classN={"main"} submit={true}>Отправить</Button>
                    </div>
                </Form>
            )}
        </Formik>
    </FormWrapper>;
};