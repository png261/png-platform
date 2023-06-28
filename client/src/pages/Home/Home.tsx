import MainLayout from 'src/layouts/MainLayout';
import { Navbar } from './Navbar/Navbar';
import { getPosts } from 'src/action/post';
import InfiniteList from 'src/components/InfiniteList/InfiniteList';
import { Link } from 'react-router-dom';
import { PATH } from 'src/constants/paths';

export default function Home() {
    return (
        <MainLayout>
            <Navbar />
            <br />
            <ul>
                <li>info</li>
                <ul>
                    <li>a (nearly) no-CSS, fast, minimalist website.</li>
                </ul>
                <li>all posts</li>
                <InfiniteList
                    getData={getPosts}
                    limitLength={10}
                    endMessage={
                        <ul>
                            <li>
                                <Link to={PATH.ARCHIVE}>see archive...</Link>
                            </li>
                        </ul>
                    }
                />
            </ul>
        </MainLayout>
    );
}
