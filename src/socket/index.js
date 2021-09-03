import { logger } from "@src/utils/logger";
import config from '@src/config/config'
import {Server} from "socket.io";
import mustAuthenticated from "./middlewares/mustAuthentication";
import mustAuthenticatedAdmin from "./middlewares/mustAuthenticatedAdmin";

import constant from "@src/constants";

export function initSocket(httpServer) {
  logger.info("Socket initiated");

  const io = new Server(httpServer);

  const ioServer = io.of(config.websocket.path);

  const ioAdmin = io.of(config.websocket.path_admin)

  onConnection(ioServer);
  onAdminConnection(ioAdmin, ioServer);
}

const onConnection = (io) => {

  io.use(mustAuthenticated)

  io.on(constant.socketEvent.CONNECTION, (socket) => {

  });
};

const onAdminConnection = (ioAdmin, ioServer) => {

  ioAdmin.use(mustAuthenticatedAdmin)
  
  ioAdmin.on(constant.socketEvent.CONNECTION, (socket) => {

  })
}
