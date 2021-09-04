import { Link, useHistory, useLocation } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import { useSelector } from 'react-redux';

export default function MainLayout({ children }) {
    const isLoading = useSelector((state) => state.loading);
    const location = useLocation();
    const history = useHistory();
    const goToPreviousPath = (e) => {
        e.preventDefault();
        history.goBack();
    };

    return (
        <div className="w">
            {location.pathname !== PATH.HOME && (
                <>
                    <Link to={PATH.HOME}>./</Link>
                    <a href="" className="ml" onClick={goToPreviousPath}>
                        ../
                    </a>
                    <br />
                    <br />
                </>
            )}
            {isLoading ? 'loading...' : children}
        </div>
    );
}
