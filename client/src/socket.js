import { io } from "socket.io-client";

const socket = io("/", {
  withCredentials: true, // cookie JWT-ისთვის
});

export default socket;