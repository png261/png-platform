import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import Loading from 'src/components/Loading/Loading';
import AuthGuard from 'src/guards/AuthGuard';
const Account = lazy(() => import('src/pages/Account/Account'));
const UpdateAccount = lazy(
    () => import('src/pages/UpdateAccount/UpdateAccount')
);

export default function AccountRoutes() {
    return (
        <Switch>
            <AuthGuard exact path={PATH.ACCOUNT}>
                <Suspense fallback={<Loading />}>
                    <Account />
                </Suspense>
            </AuthGuard>
            <AuthGuard exact path={PATH.UPDATE_ACCOUNT}>
                <Suspense fallback={<Loading />}>
                    <UpdateAccount />
                </Suspense>
            </AuthGuard>
        </Switch>
    );
}
