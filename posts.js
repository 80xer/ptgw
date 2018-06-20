"use strict";
const business = require("./controllers/posts");

class posts extends require("./tcpServer") {
  constructor() {
    super("posts", process.argv[2] ? Number(process.argv[2]) : 9010, [
      "POST/posts",
      "GET/posts",
      "GET/posts/name"
    ]);

    this.connectToDistributor("127.0.0.1", 9000, data => {
      console.log("Distributor Notification", data);
    });
  }

  onRead(socket, data) {
    console.log("onRead", socket.remoteAddress, socket.remotePort, data);
    business.onRequest(
      socket,
      data.method,
      data.uri,
      data.params,
      (s, packet) => {
        socket.write(JSON.stringify(packet) + "¶");
      }
    );
  }
}

new posts();
