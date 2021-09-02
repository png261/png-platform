import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PATH } from 'src/constants/paths';

export default function MainLayout({ children }) {
    const location = useLocation();

    return (
        <div className="w">
            {location.pathname !== PATH.HOME && (
                <>
                    <Link to={PATH.HOME}>..</Link>
                    <br />
                    <br />
                </>
            )}
            {children}
        </div>
    );
}
