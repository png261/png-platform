const initSocket = (io) => {
    const rooms = {};
    let userTyping = [];
    io.on('connection', function (socket) {
        socket.on('joinRoom', (roomId) => {
            const userId = socket.id;
            const oldRoom = rooms[userId];

            if (oldRoom) {
                socket.leave(oldRoom);
            }

            socket.join(roomId);
            rooms[userId] = roomId;
        });

        socket.on('isTyping', ({ postId, status }) => {
            if (status) {
                userTyping =
                    userTyping.indexOf(socket.id) !== -1
                        ? userTyping
                        : [...userTyping, socket.id];
            } else {
                userTyping = userTyping.filter((id) => id !== socket.id);
            }
            const isSomeOneTyping = userTyping.length > 0;
            return socket.to(postId).emit('someOneIsTyping', isSomeOneTyping);
        });

        socket.on('disconnect', () => {
            const userId = socket.id;
            const oldRoom = rooms[userId];
            userTyping = userTyping.filter((id) => id !== socket.id);
            socket.leave(oldRoom);
        });
    });
};

module.exports = initSocket;
