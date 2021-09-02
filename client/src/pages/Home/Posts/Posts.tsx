import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATH } from 'src/constants/paths';

export default function Posts({ posts, isLoading }) {
    let items;
    if (isLoading) {
        items = <li>...loading posts</li>;
    } else if (posts.length === 0) {
        items = <li>have no post</li>;
    } else {
        items = (
            <>
                {posts.slice(0, 10).map((post) => (
                    <li>
                        <span>{post.createdAt}: </span>
                        <Link to={`${PATH.POST}/${post._id}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
                {posts.length > 10 && (
                    <li>
                        <Link to={PATH.ARCHIVE}>view all</Link>
                    </li>
                )}
            </>
        );
    }

    return <ul>{items}</ul>;
}
