import { useParams } from 'react-router-dom';
import { getUserPosts } from 'src/action/post';
import InfinityList from 'src/components/InfiniteList/InfiniteList';
import MainLayout from 'src/layouts/MainLayout';
import { useEffect, useState } from 'react';
import { formatTime } from 'src/utils/time';
import * as USER_ACTION from 'src/action/user';
import { useDispatch } from 'react-redux';
import { startLoading, endLoading } from 'src/store/loading';

export default function Account() {
    const { id } = useParams<{ id: string }>();
    const [totalPosts, setTotalPost] = useState('...loading');
    const [user, setUser]: [any, any] = useState({});
    const dispatch = useDispatch();

    const getPosts = async (getCondition: GetCondition) => {
        return await getUserPosts(user._id, getCondition);
    };

    const getUser = async () => {
        dispatch(startLoading());
        const data = await USER_ACTION.get(id);
        const { count } = await getUserPosts(data.user.id, {
            page: 0,
            limit: 0,
        });
        setUser(data.user);
        setTotalPost(count);
        dispatch(endLoading());
    };
    getUser();

    return (
        <MainLayout>
            <h1>user: {user.username}</h1>
            <q>be your self</q>
            <br />
            <br />
            <p>Joined: {formatTime(user.createdAt)}</p>
            <p>total posts: {totalPosts}</p>
            <h2>user's posts:</h2>
            <InfinityList getData={getPosts} />
        </MainLayout>
    );
}
