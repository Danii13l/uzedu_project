import { useRouter } from "next/router";
import { FormWrapper } from "@/components/pages/admin/form_items/FormWrapper";
import { FieldArray, Form, Formik } from "formik";

import { InputsBlockMain } from "@/components/pages/admin/form_items/InputsBlockMain";
import { Button } from "@/components/common/button/Button";
import { FieldArrayWrapper } from "@/components/pages/admin/form_items/FieldArrayWrapper";
import { InputsFormik } from "@/components/common/input/InputsFormik";
import { InputsWrapper } from "@/components/pages/admin/form_items/InputsWrapper";

import { myAxios } from 'assets/axios/myAxios';
import { FC, useEffect, useState } from "react";
import { FormActions } from './../form_items/FormActions';

export const VideoGallery: FC<{ id?: string }> = ({ id }) => {

    const { push } = useRouter();

    const [dataOut, setData] = useState<{
        id: number;
        titleRu: string;
        titleUz: string;
        title: string;
        descriptionRu: string;
        descriptionUz: string;
        description: string;
        links: string[],
    } | null>(null);

    useEffect(() => {
        (async function () {
            try {
                if (id) {
                    const { data } = await myAxios(`/api/dashboard/video/${id}`);
                    setData(data?.page);
                }

            } catch (err) {
                console.log(err);
            }
        }());
    }, []);

    console.log(dataOut);
    return <FormWrapper>
        <FormActions isDelete={true} data={dataOut} typeOfPage={"Видео Галерея"} deleteFetch={`dashboard/video/`} pushTo="/admin/pages/informationService/5/videogallery/38/VIDEOS" />
        <Formik
            initialValues={{
                titleRu: dataOut?.titleRu ?? "",
                titleUz: dataOut?.titleUz ?? "",
                title: dataOut?.title ?? "",
                image: "",
                link: dataOut?.links ?? [],
            }}
            enableReinitialize={true}
            onSubmit={async (val) => {
                try {
                    dataOut?.id ? await myAxios.post("/api/dashboard/video", val) : await myAxios.post("/api/dashboard/video", val);
                    await push("/admin/pages/informationService/5/videogallery/38/VIDEOS");
                } catch (err) {
                    console.log(err);
                }
            }}
        >
            {({ values, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <InputsBlockMain title={"Заголовок"} arr={["titleRu", "titleUz", "title"]} />
                    <InputsFormik name={`link`} label={"ссылка"} />
                    <div>
                        <Button classN={"main"} submit={true}>Отправить</Button>
                    </div>
                </Form>
            )}
        </Formik>
    </FormWrapper>;
};