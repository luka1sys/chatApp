import { io } from "socket.io-client";

const socket = io(VITE_API_URL, {
  withCredentials: true, // cookie JWT-ისთვის
});

export default socket;