import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import * as socket from 'src/socket/socket';

interface Props {
    getData: (options: GetCondition) => any;
    limitLength?: number;
    endMessage?: ReactElement;
}

export default function InfiniteComments({
    getData,
    limitLength,
    endMessage,
}: Props) {
    const [maxLength, setMaxLength] = useState(Infinity);
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const LIMIT = 20;

    const next = async () => {
        const getCondition = { page, limit: LIMIT };
        const { newData, count } = await getData(getCondition);
        setComments((prev): any => [...prev, ...newData]);
        setMaxLength(count);
        setPage((prev) => ++prev);
    };

    useEffect(() => {
        if (comments.length >= (limitLength || maxLength)) {
            setHasMore(false);
        }
        socket.updateComments(comments, setComments);
    }, [comments]);

    useEffect(() => {
        next();
    }, []);

    return (
        <InfiniteScroll
            dataLength={comments.length}
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
                {comments.map((comment: any) => (
                    <li>
                        {comment.user.username}: {comment.content}
                    </li>
                ))}
            </ul>
        </InfiniteScroll>
    );
}
