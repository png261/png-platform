import { useState } from 'react';
import { votePost } from 'src/action/post';

export default function Vote({ post, postId, userId }) {
    const [vote, setVote] = useState(post.vote.length);
    const [isVoted, setIsVoted] = useState(post.vote.includes(userId));

    const updateVoteCount = (newPost) => {
        if (userId) {
            setIsVoted(newPost.vote.includes(userId));
        }
        setVote(newPost.vote.length);
    };

    const handleVote = async (e) => {
        if (!userId) {
            return;
        }
        e.preventDefault();
        const { post } = await votePost(postId);
        updateVoteCount(post);
    };

    return (
        <p>
            {vote}{' '}
            <button disabled={!userId} onClick={handleVote}>
                {isVoted ? (
                    'unclaps'
                ) : userId ? (
                    'claps'
                ) : (
                    <abbr title="Login to claps">claps</abbr>
                )}
            </button>
        </p>
    );
}
