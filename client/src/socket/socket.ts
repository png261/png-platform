import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

export const joinRoom = (postId: string) => {
    socket.emit('joinRoom', postId);
};

export const updateVote = (cb: (votes: string[]) => any) => {
    socket.on('updateVote', cb);
};

export const updateComments = (
    comments: any[],
    setComments: (comments: any) => any
) => {
    socket.on('createdComment', (newComment) => {
        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
    });
};

export const isTyping = ({
    postId,
    status,
}: {
    postId: string;
    status: boolean;
}) => {
    socket.emit('isTyping', { postId, status });
};

export const someOneIsTyping = (cb: (status: boolean) => any) => {
    socket.on('someOneIsTyping', cb);
};
