const initSocket = (io) => {
    const rooms = {};
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
    });
};

module.exports = initSocket;
