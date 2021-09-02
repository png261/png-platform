import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import Loading from 'src/components/Loading/Loading';
const Post = lazy(() => import('src/pages/Post/Post'));

export default function PostRoutes() {
    return (
        <Switch>
            <Route exact path={`${PATH.POST}/:id`}>
                <Suspense fallback={<Loading />}>
                    <Post />
                </Suspense>
            </Route>
        </Switch>
    );
}
