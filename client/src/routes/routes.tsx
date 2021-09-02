import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import HomeRoutes from './HomeRoutes';
import PostRoutes from './PostRoutes';
import ArchiveRoutes from './ArchiveRoutes';
import WrittingRoutes from './WrittingRoutes';
import AccountRoutes from './AccountRoutes';
import Route404 from './Route404';

export default function Routes() {
    return (
        <BrowserRouter>
            <HomeRoutes />
            <AuthRoutes />
            <AccountRoutes />
            <PostRoutes />
            <ArchiveRoutes />
            <WrittingRoutes />
            <Route404 />
        </BrowserRouter>
    );
}
