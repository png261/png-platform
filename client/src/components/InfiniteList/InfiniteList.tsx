import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { PATH } from 'src/constants/paths';

interface Props {
    getData: (options: GetCondition) => any;
    limitLength?: number;
    endMessage?: ReactElement;
}

export default function InfiniteList({
    getData,
    limitLength = 20,
    endMessage,
}: Props) {
    const [maxLength, setMaxLength] = useState(Infinity);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const next = async () => {
        const getCondition = { page, limit: limitLength };
        const { newData, count } = await getData(getCondition);
        if (newData == null || count == null) {
            setHasMore(false);
            return;
        }

        setData((prev): any => [...prev, ...newData]);
        setMaxLength(count);
        setPage((prev) => ++prev);
    };

    useEffect(() => {
        if (data.length < (limitLength || maxLength)) {
            setHasMore(false);
        }
    }, [data, maxLength]);

    useEffect(() => {
        next();
    }, []);

    return (
        <>
            {maxLength > 0 ? (
                <InfiniteScroll
                    dataLength={data.length}
                    next={next}
                    hasMore={hasMore}
                    loader={
                        <ul>
                            <li>Loading...</li>
                        </ul>
                    }
                    endMessage={endMessage}
                >
                    <ul>
                        {data.map((item: any) => (
                            <li>
                                <span>{item.createdAt}: </span>
                                <Link to={`${PATH.POST}/${item._id}`}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            ) : (
                <p>have no post to show</p>
            )}
        </>
    );
}
