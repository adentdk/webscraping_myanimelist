import config from '@src/config/config';
import io from 'socket.io-client';

const socketAdmin = io(`http://localhost:${config.server.port}${config.websocket.path_admin}`, {
  auth: {
    adminKey: config.websocket.serverKey
  },
  autoConnect: false,
})

export default socketAdmin