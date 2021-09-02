import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import Loading from 'src/components/Loading/Loading';
const Home = lazy(() => import('src/pages/Home/Home'));

export default function HomeRoutes() {
    return (
        <Switch>
            <Route exact path={PATH.HOME}>
                <Suspense fallback={<Loading />}>
                    <Home />
                </Suspense>
            </Route>
        </Switch>
    );
}
