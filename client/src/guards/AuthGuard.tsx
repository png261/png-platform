import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { PATH } from 'src/constants/paths';

export default function AuthGuard({ children, ...props }) {
    const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

    if (!isLoading && !isAuthenticated) {
        return <Redirect to={PATH.LOGIN} />;
    }

    return <Route {...props}>{children}</Route>;
}
