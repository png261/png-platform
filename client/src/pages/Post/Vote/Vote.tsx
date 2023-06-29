import { useSelector } from 'react-redux';
import { useState } from 'react';
import { votePost } from 'src/action/post';
import * as socket from 'src/socket/socket';

export default function Vote({ post, postId }) {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [vote, setVote] = useState(post.vote.length);
    const [isVoted, setIsVoted] = useState(post.vote.includes(user._id));

    socket.updateVote((votes: string[]) => {
        setIsVoted(votes.includes(user._id));
        setVote(votes.length);
    });

    const handleVote = async (e) => {
        e.preventDefault();
        await votePost(postId);
    };

    if (!isAuthenticated) {
        return (
            <p>
                {vote}{' '}
                <button disabled>
                    <abbr title="Login to claps">claps</abbr>
                </button>
            </p>
        );
    }

    return (
        <p>
            {vote}{' '}
            <button onClick={handleVote}>
                {isVoted ? 'unclaps' : 'claps'}
            </button>
        </p>
    );
}
