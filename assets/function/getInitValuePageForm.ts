import {initialValuesIint} from "../interfaces/pageFormInt";

export const getInitValuePageForm = (data: initialValuesIint| null) => {
    return {
        titleRu: data?.titleRu ?? "",
        titleUz: data?.titleUz ?? "",
        title: data?.title ?? "",
        descriptionRu: data?.descriptionRu ?? "",
        descriptionUz: data?.descriptionUz ?? "",
        description: data?.description ?? "",
        videos: data?.videos ?? [],
        images: data?.images ?? [],
        files: data?.files ?? []
    };
};