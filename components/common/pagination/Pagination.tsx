import ReactPaginate from "react-paginate";

import React, { FC, useCallback, } from "react";
import { useRouter } from "next/router";

interface paginationInt {
    pageCount: number;
}

export const Pagination: FC<paginationInt> = ({

    pageCount,
}): JSX.Element => {
    const { pathname, push, query: { slug } } = useRouter();

    const handlePage = useCallback((ev: any) => {
        slug && push(`${pathname.slice(0, 11)}${slug[0]}/${slug[1]}/${slug[2]}/${slug[3]}/${ev.nextSelectedPage}/`);
    }, [slug]);

    return (
        <div className="pagination_bottom">
            <ReactPaginate
                onClick={handlePage}
                pageCount={pageCount ? +pageCount : 0}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                initialPage={slug && slug[4] ? +slug[4] : 0}
            />
        </div>
    );
};
