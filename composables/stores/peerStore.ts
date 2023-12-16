import Peer, { DataConnection, PeerOptions, PeerErrorType } from "peerjs";
import { defineStore } from "pinia";
import {
  peerDataMessageType,
  type fileDataType,
  type peerConnectionType,
  type peerDataType,
  type notificationType,
  notificationMessageType,
} from "~/composables/types/peerTypes";
import { saveAs } from "file-saver";
import { v4 as uuid4 } from "uuid";

const runtimeConfig = useRuntimeConfig();
const peerConfig: PeerOptions = {
  host: "peer-server-otcrggkcra-el.a.run.app",
  port: 443,
  path: "/",
  debug: 3,
  config: {
    iceServers: [
      {
        // urls: runtimeConfig.public.stunUrl,
        url: "stun:34.16.23.24:3478",
        urls: "stun:34.16.23.24:3478",
      },
      {
        url: "turn:34.16.23.24:3478",
        urls: "turn:34.16.23.24:3478",
        username: "guest",
        credential: "somepassword",
      },
      // {
      //   url: runtimeConfig.public.turnUrl,
      //   username: runtimeConfig.public.turnUsername,
      //   credential: runtimeConfig.public.turnPassword,
      // },
    ],
  },
};

export const usePeerStore = defineStore("peer", () => {
  const peer = ref<Peer>();
  const peerConnectionStatus = ref(false);
  const connectPeer = ({ id }: { id: string }) => {
    console.log(peerConfig);
    peer.value = new Peer(id, peerConfig);
    peer.value.on("open", (peerId) => {
      console.log("Peer Connected with ID : " + peerId);
      useNotificationStore().addNotification({
        type: notificationMessageType.success,
        data: "Peer Connected",
      });
      peerConnectionStatus.value = true;
    });
    peer.value.on("connection", (conn) => {
      console.log("Peer Connected with ID : " + conn.peer);
      usePeerConnectionsStore().addPeerConnection({ id: conn.peer, conn });
      useNotificationStore().addNotification({
        type: notificationMessageType.success,
        data: `Client ${id} Connected`,
      });
    });
    peer.value.on("disconnected", () => {
      peerConnectionStatus.value = false;
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
      console.log("Error here");

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
      console.log("Conn is undefined");

      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: "Peer not available",
      });
      return;
    }
    conn.on("open", () => {
      console.log("Conn open in peer store function");

      useNotificationStore().addNotification({
        type: notificationMessageType.success,
        data: `Connected to ${id}`,
      });
      usePeerConnectionsStore().addPeerConnection({ id: conn.peer, conn });
    });
    conn.on("error", (err) => {
      console.log(err);
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

export const usePeerConnectionsStore = defineStore("peerConnections", () => {
  const currentSelectedPeer = ref<string>("");
  const peerConnections = ref<peerConnectionType[]>([]);
  const filesShared = ref<
    {
      id: string;
      name: string;
      size: number;
      type: string;
      status: boolean;
      send: boolean;
      peerId: string;
    }[]
  >([]);

  function addPeerConnection({
    id,
    conn,
  }: {
    id: string;
    conn: DataConnection;
  }) {
    console.log("Peer Connection Function");

    peerConnections.value.push({
      id,
      conn,
      connected: true,
    });
    conn.on("data", async (data) => {
      console.log("Data Received");
      console.log(data);
      const peerMessage = data as peerDataType;
      if (peerMessage.type === peerDataMessageType.file) {
        const fileData = peerMessage.data as fileDataType;
        const fileObj = await toFile(fileData);
        saveAs(fileObj, fileData.name);
        filesShared.value.push({
          id: fileData.id,
          name: fileData.name,
          size: fileData.size,
          type: fileData.type,
          status: true,
          send: false,
          peerId: id,
        });
        filesShared.value.reverse();
        sendToPeer(id, {
          type: peerDataMessageType.ack,
          data: fileData.id,
        });
      } else if (peerMessage.type === peerDataMessageType.ack) {
        filesShared.value.forEach((e) => {
          if (e.id === peerMessage.data) {
            console.log(e);

            e.status = true;
          }
        });
      }
    });
    conn.on("error", (err) => {
      console.log(err.type);
      console.log(err.message);
    });
    conn.on("close", () => {
      peerConnections.value = peerConnections.value.filter((e) => {
        if (e.id === id) {
          return false;
        }
        return true;
      });
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `Client ${id} Disconnected`,
      });
    });
  }

  function sendToPeer(id: string, peerMessage: peerDataType) {
    if (id === "") {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `Please Select a Peer`,
      });
      return false;
    }
    if (!usePeerStore().peerConnectionStatus) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `Peer Not Connected`,
      });
      return false;
    }
    if (
      usePeerConnectionsStore().peerConnections.filter((e) => e.id === id)
        .length === 0
    ) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `Peer ID Not Connected`,
      });
      return false;
    }
    peerConnections.value.forEach(async (element) => {
      if (element.id === id) {
        element.conn?.send(peerMessage);
      }
    });
    return true;
  }
  async function sendFileToPeer({ data }: { data: File }) {
    const base64File = await toBase64(data);
    const fileData: fileDataType = {
      id: uuid4(),
      name: data.name,
      type: data.type,
      size: data.size,
      data: base64File,
    };
    const peerMessage: peerDataType = {
      type: peerDataMessageType.file,
      data: fileData,
    };
    const sendToPeerResponse = sendToPeer(
      currentSelectedPeer.value,
      peerMessage,
    );
    console.log(sendToPeerResponse);

    if (sendToPeerResponse) {
      filesShared.value.push({
        id: fileData.id,
        name: fileData.name,
        size: fileData.size,
        type: fileData.type,
        status: false,
        send: true,
        peerId: currentSelectedPeer.value,
      });
      filesShared.value.reverse();
    }
  }

  return {
    peerConnections,
    addPeerConnection,
    sendToPeer,
    sendFileToPeer,
    currentSelectedPeer,
    filesShared,
  };
});

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<notificationType[]>([]);
  const addNotification = ({ type, data }: notificationType) => {
    const id = uuid4();
    notifications.value = [{ id, type, data }, ...notifications.value];
    setTimeout(() => {
      notifications.value = notifications.value.filter((e) => {
        if (e.id === id) {
          return false;
        }
        return true;
      });
    }, 2000);
  };
  return { notifications, addNotification };
});
async function toBase64(file: File): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result!);
    reader.onerror = reject;
  });
}

async function toFile(fileData: fileDataType): Promise<File> {
  const res: Response = await fetch(fileData.data as string);
  const blob: Blob = await res.blob();
  const file: File = new File([blob], fileData.name, { type: fileData.type });
  return file;
}
