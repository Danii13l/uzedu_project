import { FC, useEffect } from "react";

import Image from "next/image";

import s from "./index.module.scss";

import { FileInput } from "@/components/common/input/FileInput";

import { getAuthorizationHeader, myAxios } from "assets/axios/myAxios";

import FormData from "form-data";


interface PreviewImage {
    condit: any;
    imgUrl: string | null;
    formikSetFun: (field: string, value: any, shouldValidate?: boolean) => void;
    valueToSave: string,
    valueToDelete: any,
    isFile?: boolean,
    isToUpload?: boolean
}


export const PreviewImage: FC<PreviewImage> = ({
    condit,
    imgUrl,
    formikSetFun,
    valueToSave,
    isFile,
    valueToDelete,
    isToUpload
}): JSX.Element => {
    const formData = new FormData();
    const handleUploadFile = (clb: any, value: string) => {

        return async (ev: any) => {
            try {
                if (isToUpload) {
                    return clb(value, ev.target.files[0] as string);
                }

                formData.append(`image`, ev.target.files[0] as string);
                const { data } = await myAxios.post("/api/dashboard/upload", formData, {
                    headers: {
                        Authorization: getAuthorizationHeader()
                    }
                });
                await clb(value, data?.url);
            } catch (err) {
                console.log(err);
            }
        };
    };

    const handleDeleteFile = (clb: any, value: string, valueDel: any) => {
        return async () => {
            try {
                if (isToUpload) {
                    return clb(value, null);
                }
                formData.append(`url`, "public/" + valueDel);
                await myAxios.put(`/api/dashboard/upload`, formData, {
                    headers: {
                        Authorization: getAuthorizationHeader()
                    }
                });
                await clb(value, null);
            } catch (err) {
                console.log(err);
            }
        };
    };

    return <div>
        {condit ?
            <>
                {
                    isFile ?
                        <div className={s.choosen_file}>Файл:
                            <span className={s.delete} onClick={handleDeleteFile(formikSetFun, valueToSave, valueToDelete)}>
                                <Image
                                    src={"/images/header/close_search.svg"}
                                    layout={"fill"}
                                    objectFit={"contain"}
                                    alt={"picture"}
                                />
                            </span>
                            <span>{imgUrl}</span>
                        </div> :
                        <div className={s.img_wrapper}>
                            <Image
                                src={typeof imgUrl !== "string" ? URL.createObjectURL(imgUrl as any) : `${process.env.NEXT_PUBLIC_BASE_URL}/${imgUrl}`}
                                layout={"fill"}
                                objectFit={"cover"}
                                alt={"picture"}
                                unoptimized
                            />
                            <div className={s.delete} onClick={handleDeleteFile(formikSetFun, valueToSave, valueToDelete)}>
                                <Image
                                    src={"/images/header/close_search.svg"}
                                    layout={"fill"}
                                    objectFit={"contain"}
                                    alt={"close"}
                                />
                            </div>
                        </div>

                }
            </>
            :
            <FileInput labelText={"Загрузить"}
                name={valueToSave}
                isFile={isFile}
                changeFun={handleUploadFile(formikSetFun, valueToSave)} />

        }
    </div>;
};