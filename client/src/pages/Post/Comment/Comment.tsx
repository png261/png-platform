import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as COMMENT_ACTION from 'src/action/comment';
import InfiniteComments from 'src/components/InfiniteComments/InfiniteComments';
import { PATH } from 'src/constants/paths';
export default function Comment({ postId }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [comment, setComment] = useState('');
    const [isSending, setIsSending] = useState(false);
    const getComments = async (getCondition: GetCondition) => {
        return await COMMENT_ACTION.getAll(postId, getCondition);
    };

    const sendComment = async () => {
        if (isSending) return;
        setIsSending(true);
        await COMMENT_ACTION.create(postId, comment);
        setComment('');
        setIsSending(false);
    };

    const onChange = (e) => setComment(e.target.value);

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <input type="text" onChange={onChange} value={comment} />
                    <button disabled={isSending} onClick={sendComment}>
                        {isSending ? '....sending' : 'send'}
                    </button>
                </>
            ) : (
                <span>
                    <Link to={PATH.LOGIN}>login</Link> to leave comments
                </span>
            )}
            <InfiniteComments getData={getComments} />
        </div>
    );
}
