import type { DataConnection } from "peerjs";
import {
  notificationMessageType,
  peerDataMessageType,
  type peerConnectionType,
  type fileDataType,
  type peerDataType,
} from "../types/peerTypes";
import saveAs from "file-saver";
import { usePeerStore } from "./peerStore";
import { v4 as uuid4 } from "uuid";
import { useNotificationStore } from "./notificationStore";

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

    peerConnections.value.push({
      id,
      conn,
      connected: true,
    });
    conn.on("data", async (data) => {
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
        useNotificationStore().addNotification({
          type: notificationMessageType.success,
          data: `File ${fileData.name} Received`,
        });
        sendToPeer(id, {
          type: peerDataMessageType.ack,
          data: fileData.id,
        });
      } else if (peerMessage.type === peerDataMessageType.ack) {
        filesShared.value.forEach((e) => {
          if (e.id === peerMessage.data) {
            useNotificationStore().addNotification({
              type: notificationMessageType.success,
              data: `File ${e.name} Sent Successfully`,
            });
            e.status = true;
          }
        });
      }
    });
    conn.on("error", (err) => {
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
  function $reset() {
    peerConnections.value.forEach((e) => {
      e.conn?.close();
    });
    peerConnections.value = [];
    filesShared.value = [];
    currentSelectedPeer.value = "";
  }
  return {
    peerConnections,
    addPeerConnection,
    sendToPeer,
    sendFileToPeer,
    currentSelectedPeer,
    filesShared,
    $reset,
  };
});

async function toFile(fileData: fileDataType): Promise<File> {
  const res: Response = await fetch(fileData.data as string);
  const blob: Blob = await res.blob();
  const file: File = new File([blob], fileData.name, { type: fileData.type });
  return file;
}

async function toBase64(file: File): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result!);
    reader.onerror = reject;
  });
}
