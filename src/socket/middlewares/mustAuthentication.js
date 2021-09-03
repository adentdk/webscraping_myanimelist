import jwt from "@src/utils/jwt";

const mustAuthenticated = async (socket, next) => {
  const auth = socket.handshake.auth
  try {
    if (auth) {
      const token = auth.token;
      const decodedToken = jwt.verifyToken(token);
      
      const {id: userID} = decodedToken;
  
      socket.userID = userID;
      return next();
    } else {
      throw new Error('ERROR')
    }
  } catch (error) {
    return next(new Error('Invalid authentication'))  
  }
}

export default mustAuthenticated;
