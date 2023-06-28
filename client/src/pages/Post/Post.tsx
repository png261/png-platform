import { Link, Redirect, useParams } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import MainLayout from 'src/layouts/MainLayout';
import Editor from 'rich-markdown-editor';
import { useEffect, useState } from 'react';
import { getPost } from 'src/action/post';
import { useSelector } from 'react-redux';
import Vote from './Vote/Vote';
import Comment from './Comment/Comment';
import Loading from 'src/components/Loading/Loading';
import * as socket from 'src/socket/socket';
import { formatTime } from 'src/utils/time';

export default function Post() {
    const user = useSelector((state) => state.auth.user);
    const { id } = useParams<{ id: string }>();
    const [post, setPost]: [any, any] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        socket.joinRoom(id);
        const handlePost = async () => {
            setIsLoading(true);
            const { post } = await getPost(id);
            setPost(post);
            setIsLoading(false);
        };
        handlePost();
    }, []);

    if (isLoading) return <Loading />;
    if (!post && !isLoading) return <Redirect to={PATH.PAGE404} />;

    return (
        <MainLayout>
            <article>
                <p className="post-meta">
                    <Link to={`${PATH.ACCOUNT}/${post.user._id}`}>
                        {post.user.username}
                    </Link>
                    {' - '}
                    <time>{formatTime(post.createdAt)}</time>
                </p>
                <h1>{post.title}</h1>
                <Editor value={post.content} readOnly />
            </article>
            <Vote post={post} postId={id} userId={user._id} />
            <Comment postId={id} />
        </MainLayout>
    );
}
