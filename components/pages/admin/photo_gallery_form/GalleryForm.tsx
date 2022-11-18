import { Form, Formik } from "formik";
import { useRouter } from "next/router";

import s from "./index.module.scss";

import { Button } from "@/components/common/button/Button";
import { InputsBlockMain } from "@/components/pages/admin/form_items/InputsBlockMain";
import Image from "next/image";

import { useImagesToServer } from "assets/hooks/useImagesToServer";
import { myAxios } from "assets/axios/myAxios";
import { FormWrapper } from "@/components/pages/admin/form_items/FormWrapper";
import { FC, useEffect, useState } from "react";
import { FormActions } from './../form_items/FormActions';


export const GalleryForm: FC<{ id?: string }> = ({ id }) => {
    const { imagesServer, handleImages, setImagesServer, handleDeleteImg } = useImagesToServer();

    const [dataOut, setData] = useState<{
        id: number;
        titleRu: string;
        titleUz: string;
        title: string;
        descriptionRu: string;
        descriptionUz: string;
        description: string;
        images: string[],
    } | null>(null);

    useEffect(() => {
        (async function () {
            try {
                if (id) {
                    const { data } = await myAxios(`/api/dashboard/gallery/${id}`);
                    setData(data);
                    setImagesServer(data.images);
                }

            } catch (err) {
                console.log(err);
            }
        }());
    }, []);

    const { push } = useRouter();
    return <FormWrapper>
        <FormActions isDelete={true} data={dataOut} typeOfPage={"Фото Галерея"} deleteType={"фото галерею"} deleteFetch="dashboard/gallery" pushTo="/admin/pages/informationService/5/gallery/37/PHOTOS" />
        <Formik
            initialValues={{
                titleRu: dataOut?.titleRu ?? "",
                titleUz: dataOut?.titleUz ?? "",
                title: dataOut?.title ?? "",
                descriptionRu: dataOut?.descriptionRu ?? "",
                descriptionUz: dataOut?.descriptionUz ?? "",
                description: dataOut?.description ?? "",
                images: [],
            }}
            enableReinitialize={true}
            onSubmit={async (val) => {
                try {
                    const formData = new FormData();
                    formData.append("title", val.title);
                    formData.append("titleRu", val.titleRu);
                    formData.append("titleUz", val.titleUz);
                    formData.append("description", val.description);
                    formData.append("descriptionRu", val.descriptionRu);
                    formData.append("descriptionUz", val.descriptionUz);

                    // @ts-ignore
                    dataOut?.id && formData.append("id", dataOut?.id);

                    for (let i = 0; i < imagesServer.length; i++) formData.append("images", imagesServer[i].file as any);


                    await myAxios[dataOut?.id ? "put" : "post"]("/api/dashboard/gallery", formData, {
                        headers: {
                            'Content-Type': "multipart/form-data"
                        }
                    });
                    await push("/admin/pages/informationService/5/gallery/37/PHOTOS");
                } catch (err) {
                    console.log(err);
                }
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>

                    <InputsBlockMain title={"Заголовок галереи"} arr={["titleRu", "titleUz", "title"]} />
                    <InputsBlockMain title={"Описание галереи"}
                        arr={["descriptionRu", "descriptionUz", "description"]} textarea={true} />


                    <div className={s.load_wr}>
                        <label className={s.label_file} htmlFor={"input_label"}>Загрузить фотографии</label>
                        <input className={s.file_input} type={"file"} id={"input_label"}
                            multiple={true} accept="image/*"
                            onChange={handleImages} />
                    </div>

                    <div className={s.images_wr}>
                        {
                            imagesServer && imagesServer.map(item => {
                                return <div className={s.img_wr} key={item.id}>
                                    {/* @ts-ignore */}
                                    <Image unoptimized src={item?.url ? `${process.env.NEXT_PUBLIC_BASE_URL}/${item?.url}` : URL.createObjectURL(item.file as any)} alt={"picture"} layout={"fill"} />
                                    <div className={s.close} onClick={handleDeleteImg(item.id)}>
                                        <Image src={"/images/header/close_search.svg"} width={20} height={20}
                                            alt={"close"} />
                                    </div>
                                </div>;
                            })
                        }
                    </div>


                    <div className={s.submit}>
                        <Button classN={"main"} submit={true}>Отправить</Button>
                    </div>


                </Form>
            )}
        </Formik>
    </FormWrapper>;
};