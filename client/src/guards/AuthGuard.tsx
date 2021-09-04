import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN_NAME } from 'src/constants/localStorage';
import { PATH } from 'src/constants/paths';

export default function AuthGuard({ children, ...props }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.loading);
    const isHaveToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const isRedirect = !isHaveToken && !isLoading && !isAuthenticated;

    return (
        <Route {...props}>
            {isRedirect ? <Redirect to={PATH.LOGIN} /> : children}
        </Route>
    );
}
