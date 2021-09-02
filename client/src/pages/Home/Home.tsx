import MainLayout from 'src/layouts/MainLayout';
import { Navbar } from './Navbar/Navbar';
import { getPosts } from 'src/action/post';
import InfinitePosts from 'src/components/InfinitePosts/InfinitePosts';
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
                <InfinitePosts
                    getPosts={getPosts}
                    limitLength={10}
                    endMessage={
                        <ul>
                            <li>
                                <Link to={PATH.ARCHIVE}>see archive...</Link>
                            </li>
                        </ul>
                    }
                />
                <li>category</li>
                <ul>
                    <li>
                        <a href="/no-style-please/post-example-with-headings-and-toc.html">
                            lifer styles
                        </a>
                    </li>
                    <li>
                        <a href="/no-style-please/language-tests.html">
                            language learning
                        </a>
                    </li>
                    <li>
                        <a href="/no-style-please/language-tests.html">
                            coding
                        </a>
                    </li>
                </ul>
            </ul>
        </MainLayout>
    );
}
