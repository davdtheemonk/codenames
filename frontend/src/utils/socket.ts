import socketIOClient from "socket.io-client";
const WS = import.meta.env.VITE_BACKEND_URL;
export const socket = socketIOClient("13.53.49.118");
