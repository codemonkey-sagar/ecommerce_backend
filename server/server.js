import http from "node:http";
import app from "./app/app.js";

// Create a server 
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
})