import { Link } from 'react-router-dom';
import { PATH } from 'src/constants/paths';

export default function Posts({ posts, isLoading }) {
    let items;
    if (isLoading) {
        items = <li>...loading</li>;
    } else if (posts.length === 0) {
        items = <li>have no post</li>;
    } else {
        items = (
            <>
                {posts.map((post) => (
                    <li>
                        <span>{post.createdAt}: </span>
                        <Link to={`${PATH.POST}/${post._id}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
                {isLoading && <li>...loading</li>}
            </>
        );
    }

    return <ul>{items}</ul>;
}
