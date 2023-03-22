import { io } from "socket.io-client";

const WSURL = "http://127.0.0.1:8080";

const websocket = io(WSURL);

export const subWebsocketEvent = function (chanel: string, callfun: CallableFunction) {
  websocket.on(chanel, data => {
    callfun(data);
  });
};
