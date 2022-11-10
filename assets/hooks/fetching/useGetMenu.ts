import {useEffect, useState} from "react";
import {myAxios} from "assets/axios/myAxios";

export const useGetMenu = () => {

    const [menu, setMenu] = useState<{ id: number, name: string, subMenu: { id: 1; name: string, isGallery: boolean }[] }[]>();

    useEffect(() => {
        const fetcher = async () => {
            try {
                const {data} = await myAxios(`/api/menu`);
                setMenu(data.menu)
            } catch (err) {
                setMenu([]);
            }
        }
        fetcher()
    }, [])

    return {menu}
}