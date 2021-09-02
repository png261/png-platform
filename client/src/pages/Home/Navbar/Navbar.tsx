import { Link } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'src/action/auth';

export function Navbar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logoutUser());
    };

    return (
        <>
            <div className="inline">
                {isAuthenticated ? (
                    <>
                        <Link to={PATH.WRITTING}>write</Link>
                        <Link to={PATH.ACCOUNT}>account</Link>
                        <a href="" onClick={logout}>
                            logout
                        </a>
                    </>
                ) : (
                    <>
                        <Link to={PATH.LOGIN}>login</Link>
                        <Link to={PATH.REGISTER}>register</Link>
                    </>
                )}
            </div>
        </>
    );
}
