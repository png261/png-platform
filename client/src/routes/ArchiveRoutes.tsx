import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import Loading from 'src/components/Loading/Loading';
const Archive = lazy(() => import('src/pages/Archive/Archive'));

export default function ArchiveRoutes() {
    return (
        <Switch>
            <Route exact path={PATH.ARCHIVE}>
                <Suspense fallback={<Loading />}>
                    <Archive />
                </Suspense>
            </Route>
        </Switch>
    );
}
