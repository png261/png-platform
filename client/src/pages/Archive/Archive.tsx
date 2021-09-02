import { useSelector } from 'react-redux';
import MainLayout from 'src/layouts/MainLayout';
import Posts from 'src/components/Posts/Posts';
import { useEffect } from 'react';

export default function Archive() {
    const { posts, isLoading } = useSelector((state) => state.post);

    // useEffect(() => {
    //     const infinityLoad = () => {
    //         if (
    //             document.body.scrollHeight - document.body.scrollTop ===
    //             document.body.clientHeight
    //         ) {
    //             console.log('scrolled');
    //         }
    //     };
    //     document.body.addEventListener(infinityLoad, 'scroll');
    //     return () => document.body.removeEventListener(infinityLoad, 'scroll');
    // });

    return (
        <MainLayout>
            <h1>Archive</h1>
            <Posts posts={posts} isLoading={isLoading} />
        </MainLayout>
    );
}
