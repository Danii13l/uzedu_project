import { useState } from "react";
import { randomId } from "../function/randomId";


export const useImagesToServer = () => {
    const [imagesServer, setImagesServer] = useState<{
        file: File[] | Blob;
        id: number;
    }[]>([]);

    // const file = imagesServer.length > 0 ? imagesServer[0].file : null;


    const handleDeleteImg = (idOut: number) => {
        return () => setImagesServer((prev) => prev.filter((fileObj) => fileObj.id !== idOut));
    };


    const handleImages = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = ev?.target.files;
        const selectedFilesArray = Array.from(selectedFiles as any).slice(0, 10);

        const arr = selectedFilesArray.map((img) => ({
            file: img as File[],
            id: randomId(),
        }));

        setImagesServer((prevArr) => prevArr.concat(arr).slice(0, 10));
    };

    return { imagesServer, handleImages, setImagesServer, handleDeleteImg };
};
