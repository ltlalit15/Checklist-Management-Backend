import Permission from '../Models/PermissionModel.js';

export const handleSocketConnection = (io) => {
    io.on('connection', (socket) => {
        console.log('🟢 Socket connected:', socket.id);

        socket.on('get_permissions', async (roleId) => {
            try {
                const PermissionData = await Permission.find(roleId);
                socket.emit('permissions', PermissionData);
            } catch (err) {
                socket.emit('message_error', { error: 'Fetching permissions failed', details: err.message });
            }
        });

        socket.on('disconnect', () => {
            console.log('🔴 Socket disconnected:', socket.id);
        });
    });
};