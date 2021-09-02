import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import MainLayout from 'src/layouts/MainLayout';
import Editor from 'rich-markdown-editor';

export default function Post() {
    const { id } = useParams<{ id: string }>();
    const posts = useSelector((state) => state.post.posts);
    const post: any = posts.find(({ _id }) => _id === id);

    if (!post) return <Redirect to={PATH.PAGE404} />;

    return (
        <MainLayout>
            <article>
                <p className="post-meta">
                    <time>{post.createdAt}</time>
                </p>
                <h1>{post.title}</h1>
                <Editor value={post.content} readOnly />
            </article>
        </MainLayout>
    );
}
