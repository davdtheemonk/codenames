import socketIOClient from "socket.io-client";
const WS = import.meta.env.VITE_BACKEND_URL;
export const socket = socketIOClient(
  "http://ec2-13-53-49-118.eu-north-1.compute.amazonaws.com"
);
