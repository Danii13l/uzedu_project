export interface initialValuesIint {
    id:number;
    titleRu: string;
    titleUz: string;
    title: string;
    descriptionRu: string;
    descriptionUz: string;
    description: string;
    videos: {
        "title": string;
        "titleRu": string;
        "titleUz": string;
        "url": string;
    }[],
    images: {
        "title": string;
        "titleRu": string;
        "titleUz": string;
        "url": string;
    }[],
    files: {
        "title": string;
        "titleRu": string;
        "titleUz": string;
        "url": string,
    }[]
}
