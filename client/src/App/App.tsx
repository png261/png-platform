import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from 'src/action/auth';
import { getPosts } from 'src/action/post';
import Routes from 'src/routes/routes';

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
        dispatch(getPosts());
    }, []);

    return <Routes />;
}
