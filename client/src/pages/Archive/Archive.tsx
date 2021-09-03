import MainLayout from 'src/layouts/MainLayout';
import InfiniteList from 'src/components/InfiniteList/InfiniteList';
import { getPosts } from 'src/action/post';

export default function Archive() {
    return (
        <MainLayout>
            <h1>Archive</h1>
            <InfiniteList getData={getPosts} />
        </MainLayout>
    );
}
