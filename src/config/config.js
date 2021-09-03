import os from 'os'
import * as dotenv from 'dotenv'
import serviceAccount from './serviceAccountKey.json'

dotenv.config()

export default {
  node_env: process.env.NODE_ENV,
  firebase: {
    use: false,
    serviceAccount,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  },
  server: {
    host: '0.0.0.0',
    port: process.env.SERVICE_PORT,
  },
  metrics: {
    heartbeatInterval: Number(process.env.HEARTBEAT_INTERVAL),
    commitSha: 'manual-build',
    dockerHost: os.hostname(),
    version: process.env.npm_package_version,
  },
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  jwt: {
    accessSecretKey: process.env.JWT_ACCESS_SECRET_KEY,
    accessExpiredIn: process.env.JWT_ACCESS_EXPIRED_IN,
    refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
    refreshExpiredIn: process.env.JWT_REFRESH_EXPIRED_IN,
  },
  websocket: {
    path: process.env.WEB_SOCKET_PATH,
    path_admin: process.env.WEB_SOCKET_SERVER_PATH,
    serverKey: process.env.WEB_SOCKET_SERVER_KEY
  }
}
