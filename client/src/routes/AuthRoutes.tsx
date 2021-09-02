import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import GuestGuard from 'src/guards/GuestGuard';
import Loading from 'src/components/Loading/Loading';
const Login = lazy(() => import('src/pages/Login/Login'));
const Register = lazy(() => import('src/pages/Register/Register'));

export default function AuthRoutes() {
    return (
        <Switch>
            <GuestGuard exact path={PATH.LOGIN}>
                <Suspense fallback={<Loading />}>
                    <Login />
                </Suspense>
            </GuestGuard>
            <GuestGuard exact path={PATH.REGISTER}>
                <Suspense fallback={<Loading />}>
                    <Register />
                </Suspense>
            </GuestGuard>
        </Switch>
    );
}
