import { useParams } from 'react-router-dom';
import { getUserPosts } from 'src/action/post';
import InfinityList from 'src/components/InfiniteList/InfiniteList';
import MainLayout from 'src/layouts/MainLayout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Account() {
    const { id } = useParams<{ id: string }>();
    const user = useSelector((state) => state.auth.user);
    const [totalPosts, setTotalPost] = useState('...loading');

    const getPosts = async (getCondition: GetCondition) => {
        return await getUserPosts(id, getCondition);
    };

    useEffect(() => {
        const getTotalPosts = async () => {
            const { count } = await getUserPosts(id, { page: 0, limit: 0 });
            setTotalPost(count);
        };
        getTotalPosts();
    }, []);

    return (
        <MainLayout>
            <h1>user: {user.username}</h1>
            <q>be your self</q>
            <br />
            <br />
            <p>Joined: {user.createdAt}</p>
            <p>total posts: {totalPosts}</p>
            <h2>user's posts:</h2>
            <InfinityList getData={getPosts} />
        </MainLayout>
    );
}
