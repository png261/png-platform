import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import Loading from 'src/components/Loading/Loading';
import AuthGuard from 'src/guards/AuthGuard';
const Writting = lazy(() => import('src/pages/Writting/Writting'));

export default function LoginRoutes() {
    return (
        <Switch>
            <AuthGuard exact path={PATH.WRITTING}>
                <Suspense fallback={<Loading />}>
                    <Writting />
                </Suspense>
            </AuthGuard>
        </Switch>
    );
}
