import io from "socket.io";
import empDataUpload from "../empUploads/empDataUpload";

async function msgSocketConnect(httpServer) {
  let msgSocket = io(httpServer, {
    reconnection: true,
    cookie: false,
  });

  msgSocket.on("connect", (msgSocket) => {
    empDataUpload(msgSocket);
  });
}

export default msgSocketConnect;
