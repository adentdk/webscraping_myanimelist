import jwt from 'jsonwebtoken'
import config from '../config/config'


const signToken = payload => {
  const token = jwt.sign(payload, config.jwt.accessSecretKey, {
    expiresIn: config.jwt.accessExpiredIn
  })

  return token
}

const verifyToken = token => {
  const encodedToken = jwt.verify(token, config.jwt.accessSecretKey)

  return encodedToken
}

export default {
  signToken,
  verifyToken
}