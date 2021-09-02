import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from 'src/constants/paths';
import MainLayout from 'src/layouts/MainLayout';
import { Navbar } from './Navbar/Navbar';
import Posts from './Posts/Posts';
import { useSelector } from 'react-redux';

export default function Home(): ReactElement {
    const { posts, isLoading } = useSelector((state) => state.post);

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
                <Posts posts={posts} isLoading={isLoading} />
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
