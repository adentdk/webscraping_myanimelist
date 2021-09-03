import config from "@src/config/config";

const mustAuthenticatedAdmin = async (socket, next) => {
  const auth = socket.handshake.auth
  try {
    if (auth) {
      const appKey = auth.appKey;

      if (appKey !== config.websocket.adminKey) {
        throw new Error('ERROR')
      }

      return next();
    } else {
      throw new Error('ERROR')
    }
  } catch (error) {
    return next(new Error('Invalid authentication'))  
  }
}

export default mustAuthenticatedAdmin;
