import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import Loading from 'src/components/Loading/Loading';
const Page404 = lazy(() => import('src/pages/Page404/Page404'));

export default function Route404() {
    return (
        <Switch>
            <Route exact path={PATH.PAGE404}>
                <Suspense fallback={<Loading />}>
                    <Page404 />
                </Suspense>
            </Route>
        </Switch>
    );
}
