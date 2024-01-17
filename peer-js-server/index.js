import { PeerServer } from "peer";

const peerServer = PeerServer({
  port: 9000,
  path: "/",
  allow_discovery: true,
  proxied: true,
  corsOptions: {
    origin: "*",
    allowedHeaders: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});
