import MainLayout from 'src/layouts/MainLayout';
import InfinitePosts from 'src/components/InfinitePosts/InfinitePosts';
import { getPosts } from 'src/action/post';

export default function Archive() {
    return (
        <MainLayout>
            <h1>Archive</h1>
            <InfinitePosts getPosts={getPosts} />
        </MainLayout>
    );
}
