import { useState } from 'react';
import { votePost } from 'src/action/post';
import * as socket from 'src/socket/socket';

export default function Vote({ post, postId, userId }) {
    const [vote, setVote] = useState(post.vote.length);
    const [isVoted, setIsVoted] = useState(post.vote.includes(userId));

    socket.updateVote((votes: string[]) => {
        setIsVoted(votes.includes(userId));
        setVote(votes.length);
    });

    const handleVote = async (e) => {
        e.preventDefault();
        await votePost(postId);
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
