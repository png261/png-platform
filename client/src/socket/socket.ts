import { io } from 'socket.io-client';
const socket = io(
    process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:5000'
);

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

/* export const isTyping = (status: boolean) => {
    socket.emit('isTyping', status);
}; */
