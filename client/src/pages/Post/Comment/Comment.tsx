import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as COMMENT_ACTION from 'src/action/comment';
import InfiniteComments from 'src/components/InfiniteComments/InfiniteComments';
import { PATH } from 'src/constants/paths';
import * as socket from 'src/socket/socket';

export default function Comment({ postId }) {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [comment, setComment] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [someOneIsTyping, setSomeOneIsTyping] = useState(false);
    const getComments = async (getCondition: GetCondition) => {
        return await COMMENT_ACTION.getAll(postId, getCondition);
    };

    const sendComment = async () => {
        if (isSending || !comment) return;
        setIsSending(true);
        await COMMENT_ACTION.create(postId, comment);
        setComment('');
        setIsSending(false);
        setIsTyping(false);
    };

    const handleTyping = () => {
        if (!comment) return setIsTyping(false);

        const typingTimeOut = setTimeout(() => {
            setIsTyping(false);
        }, 3000);
        if (isTyping) {
            clearTimeout(typingTimeOut);
        }
        setIsTyping(true);
    };

    useEffect(() => {
        socket.isTyping({ postId, status: isTyping });
    }, [isTyping]);

    socket.someOneIsTyping((status) => setSomeOneIsTyping(status));

    const onChange = (e) => setComment(e.target.value);

    return (
        <div>
            <h4>comment:</h4>
            {isAuthenticated ? (
                <>
                    <textarea
                        onChange={onChange}
                        onKeyDown={handleTyping}
                        value={comment}
                        cols={50}
                    />
                    <br />
                    <button
                        disabled={isSending || !comment}
                        onClick={sendComment}
                    >
                        {isSending ? 'sending...' : 'send'}
                    </button>
                    <br />
                    <br />
                </>
            ) : (
                <p>
                    <Link to={PATH.LOGIN}>login</Link> to leave comments
                </p>
            )}
            {someOneIsTyping && <p>...some one is typing</p>}
            <InfiniteComments getData={getComments} />
        </div>
    );
}
