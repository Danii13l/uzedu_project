import {Form, Formik} from "formik";
import {useRouter} from "next/router";

import s from "./index.module.scss";

import {Button} from "@/components/common/button/Button";
import {InputsBlockMain} from "@/components/pages/admin/form_items/InputsBlockMain";
import Image from "next/image";

import {useImagesToServer} from "assets/hooks/useImagesToServer";
import {myAxios} from "assets/axios/myAxios";




export const GalleryForm = () => {
    const {imagesServer, handleImages, setImagesServer, handleDeleteImg} = useImagesToServer();

    const {push} = useRouter();
    return <div className={s.form}>
        <Formik
            initialValues={{
                titleRu: "",
                titleUz: "",
                title: "",
                descriptionRu: "",
                descriptionUz: "",
                description: "",
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
                    for (let i = 0; i < imagesServer.length; i++) formData.append("images", imagesServer[i].file as any);

                    await myAxios.post("/api/dashboard/gallery", formData, {
                        headers: {
                            'Content-Type': "multipart/form-data"
                        }
                    });
                    await push("/admin");
                } catch (err) {
                    console.log(err);
                }
            }}
        >
            {({values, setFieldValue, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>

                    <InputsBlockMain title={"Заголовок галереи"} arr={["titleRu", "titleUz", "title"]}/>
                    <InputsBlockMain title={"Описание галереи"}
                                     arr={["descriptionRu", "descriptionUz", "description"]} textarea={true}/>


                    <div className={s.load_wr}>
                        <label className={s.label_file} htmlFor={"input_label"}>Загрузить фотографии</label>
                        <input className={s.file_input} type={"file"} id={"input_label"}
                               multiple={true} accept="image/*"
                               onChange={handleImages}/>
                    </div>

                    <div className={s.images_wr}>
                        {
                            imagesServer && imagesServer.map(item => {
                                return <div className={s.img_wr} key={item.orderFronted}>
                                    <Image src={URL.createObjectURL(item.file as any)} alt={"picture"} layout={"fill"}/>
                                    <div className={s.close} onClick={handleDeleteImg(item.orderFronted)}>
                                        <Image src={"/images/header/close_search.svg"} width={20} height={20}
                                               alt={"close"}/>
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
    </div>;
};