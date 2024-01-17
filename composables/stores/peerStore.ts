import Peer, { PeerOptions, PeerErrorType } from "peerjs";
import { defineStore } from "pinia";
import { notificationMessageType } from "~/composables/types/peerTypes";
import { usePeerConnectionsStore } from "./peerConnectionStore";
import { useNotificationStore } from "./notificationStore";

const runtimeConfig = useRuntimeConfig();
const peerConfig: PeerOptions = {
  host: runtimeConfig.public.peerServerUrl,
  port: 443,
  path: "/",
  config: {
    iceServers: [
      {
        url: runtimeConfig.public.stunUrl,
        urls: runtimeConfig.public.stunUrl,
      },
      {
        url: runtimeConfig.public.turnUrl,
        urls: runtimeConfig.public.turnUrl,
        username: runtimeConfig.public.turnUsername,
        credential: runtimeConfig.public.turnPassword,
      },
    ],
  },
};
export const usePeerStore = defineStore("peer", () => {
  const peer = ref<Peer>();
  const peerConnectionStatus = ref(false);
  const connectPeer = ({ id }: { id: string }) => {
    peer.value = new Peer(id, peerConfig);
    peer.value.on("open", (peerId) => {
      useNotificationStore().addNotification({
        type: notificationMessageType.success,
        data: "Peer Connected",
      });
      peerConnectionStatus.value = true;
    });
    peer.value.on("connection", (conn) => {
      usePeerConnectionsStore().addPeerConnection({ id: conn.peer, conn });
      useNotificationStore().addNotification({
        type: notificationMessageType.success,
        data: `Client ${id} Connected`,
      });
    });
    peer.value.on("disconnected", () => {
      peerConnectionStatus.value = false;
      usePeerConnectionsStore().$reset();
    });

    peer.value.on("error", (err) => {
      if (err.type === PeerErrorType.PeerUnavailable) {
        useNotificationStore().addNotification({
          type: notificationMessageType.error,
          data: "Peer Not Available",
        });
      } else if (err.type === PeerErrorType.UnavailableID) {
        useNotificationStore().addNotification({
          type: notificationMessageType.error,
          data: "ID Not Available",
        });
      } else {
        useNotificationStore().addNotification({
          type: notificationMessageType.error,
          data: "Error Occured",
        });
      }
    });
  };
  const connectToAnotherPeer = ({ id }: { id: string }) => {
    if (peer.value?.id === id) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: "Cannot connect to self",
      });
      return;
    }
    if (
      usePeerConnectionsStore().peerConnections.filter((e) => e.id === id)
        .length > 0
    ) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `Already Connected to ${id}`,
      });
      return;
    }

    const conn = peer.value?.connect(id, { reliable: true });
    useNotificationStore().addNotification({
      type: notificationMessageType.info,
      data: `Connecting to ${id}`,
    });

    if (conn === undefined) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: "Peer not available",
      });
      return;
    }
    conn.on("open", () => {
      useNotificationStore().addNotification({
        type: notificationMessageType.success,
        data: `Connected to ${id}`,
      });
      usePeerConnectionsStore().addPeerConnection({ id: conn.peer, conn });
    });
    conn.on("error", (err) => {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: "Cannot connect to peer",
      });
    });
  };
  const disconnectPeer = () => {
    peer.value?.disconnect();
    peerConnectionStatus.value = false;
  };
  return {
    peer,
    peerConnectionStatus,
    connectToAnotherPeer,
    connectPeer,
    disconnectPeer,
  };
});
