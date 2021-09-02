import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { PATH } from 'src/constants/paths';

export default function GuestGuard({ children, ...props }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <>
            {!isAuthenticated ? (
                <Route {...props}>{children}</Route>
            ) : (
                <Redirect to={PATH.HOME} />
            )}
        </>
    );
}
