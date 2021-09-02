import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { PATH } from 'src/constants/paths';

interface Props {
    getPosts: (options: GetCondititon) => any;
    limitLength?: number;
    endMessage?: ReactElement;
}

export default function InfinitePosts({
    getPosts,
    limitLength,
    endMessage,
}: Props) {
    const [maxLength, setMaxLength] = useState(Infinity);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const LIMIT = 20;

    const next = async () => {
        const getCondititon = { page, limit: LIMIT };
        const { posts, count } = await getPosts(getCondititon);
        setData((state): any => [...state, ...posts]);
        setMaxLength(count);
        setPage((state) => ++state);
    };

    useEffect(() => {
        if (data.length >= (limitLength || maxLength)) {
            setHasMore(false);
        }
    }, [data]);

    useEffect(() => {
        next();
    }, []);

    return (
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
                {data.slice(0, limitLength).map((post: any) => (
                    <li>
                        <span>{post.createdAt}: </span>
                        <Link to={`${PATH.POST}/${post._id}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </InfiniteScroll>
    );
}
