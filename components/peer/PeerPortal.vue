<script setup lang="ts">
import {
  usePeerStore,
  usePeerConnectionsStore,
  useNotificationStore,
} from "~/composables/stores/peerStore";
import { notificationMessageType } from "~/composables/types/peerTypes";
const currentPeerId = ref("");
const clientId = ref("");
const fileSelected = ref<File>();
const peerStore = usePeerStore();
onUnmounted(() => {
  peerStore.disconnectPeer();
});

function handleFileChange(event: Event) {
  const tempEvent = event.target as HTMLInputElement;
  if (tempEvent.files) {
    fileSelected.value = tempEvent.files[0];
    console.log(fileSelected.value.name);
  }
}

function handleConnectToPeer() {
  if (currentPeerId.value === "") {
    useNotificationStore().addNotification({
      type: notificationMessageType.warning,
      data: "Please Enter a Peer ID",
    });
    return;
  }
  if (!peerStore.peerConnectionStatus) {
    peerStore.connectPeer({ id: currentPeerId.value });
  }
}

function handleAddClient() {
  if (clientId.value === "") {
    useNotificationStore().addNotification({
      type: notificationMessageType.warning,
      data: "Please Enter a Client ID",
    });
    return;
  }
  peerStore.connectToAnotherPeer({ id: clientId.value });
}
</script>

<template>
  <div class="mx-16 flex flex-col items-center justify-center py-12">
    <div
      class="gradient-primary my-6 bg-clip-text text-4xl font-bold text-transparent"
    >
      Peer Portal
    </div>
    <div class="flex flex-col items-center justify-center space-y-8">
      <div class="flex flex-row items-center space-x-4">
        <div
          class="h-4 w-4 animate-bounce rounded-full bg-red-600"
          v-if="!peerStore.peerConnectionStatus"
        ></div>
        <div
          class="h-4 w-4 animate-bounce rounded-full bg-green-600"
          v-else
        ></div>
        <input
          :readonly="peerStore.peerConnectionStatus"
          type="text"
          autofocus
          placeholder="Enter Peer ID"
          class="rounded-lg border-2 p-2 shadow-lg"
          name="peer-client-name"
          v-model="currentPeerId"
          @keydown.enter="handleConnectToPeer"
        />
        <div
          class="rounded-lg p-2 shadow-lg transition ease-in-out hover:shadow"
          :hidden="!peerStore.peerConnectionStatus"
          @click="
            () => {
              copyToClipboard(currentPeerId);
              useNotificationStore().addNotification({
                type: notificationMessageType.success,
                data: 'Peer ID Copied to Clipboard',
              });
            }
          "
        >
          <Icon
            name="material-symbols:content-copy"
            class="text-2xl text-zinc-500"
          />
        </div>
      </div>
      <button
        :disabled="peerStore.peerConnectionStatus"
        class="gradient-accent rounded-lg px-3 py-2 text-xl font-bold text-white shadow-lg dark:shadow-zinc-600"
        @click="handleConnectToPeer"
      >
        Start Peer Server
      </button>
    </div>
    <!-- row flex  -->
    <div class="flex w-full flex-row justify-between space-x-24 p-8">
      <!-- connected clients tab  -->
      <div
        class="flex basis-1/2 flex-col space-y-8 rounded-lg border-2 p-8 shadow-lg"
      >
        <div class="mb-2 text-2xl font-bold text-zinc-950">
          Connected Clients
        </div>
        <div class="flex flex-row space-x-8">
          <input
            placeholder="Enter Client ID"
            type="text"
            class="rounded-lg border-2 p-2 shadow-lg"
            v-model="clientId"
            @keydown.enter="handleAddClient"
          />
          <button
            class="rounded-lg bg-blue-500 p-2 text-xl font-bold text-white hover:bg-blue-800"
            @click="handleAddClient"
          >
            Add Client
          </button>
        </div>
        <!-- clients list buttons -->
        <button
          v-for="peer of usePeerConnectionsStore().peerConnections"
          @click="
            () => (usePeerConnectionsStore().currentSelectedPeer = peer.id)
          "
          :class="`flex w-2/3 flex-row justify-between rounded-lg border-blue-600 px-4 py-3 text-start font-mono font-bold text-blue-600 shadow-lg hover:shadow-md ${
            usePeerConnectionsStore().currentSelectedPeer === peer.id
              ? `border-2 `
              : ``
          }}`"
        >
          <span>
            {{ peer.id }}
          </span>
          <span class="text-green-600" v-if="peer.connected">
            "Connected"
          </span>
          <span class="text-red-600" v-else> Disconnected </span>
        </button>
      </div>
      <!-- files tag  -->
      <div
        class="flex w-full basis-1/2 flex-col items-center justify-center space-y-8"
      >
        <div class="relative flex w-full flex-col">
          <input
            type="file"
            class="absolute inset-0 cursor-pointer opacity-0"
            name="upload-file"
            id="upload-file"
            required
            @change="handleFileChange"
          />
          <div
            class="m-2 flex flex-col space-y-4 rounded-lg border-2 p-16 text-center text-zinc-950 shadow-lg dark:border-gray-800 dark:bg-slate-900 dark:shadow-zinc-800 lg:m-0"
          >
            <div
              class="rounded-2xl bg-blue-500 p-2 text-xl font-bold text-white"
            >
              <Icon
                name="material-symbols:drive-folder-upload-outline"
                class="text-3xl"
              />
              Upload File
            </div>
            <div class="text-zinc-600 dark:text-zinc-400">
              Or drop your files here
            </div>
            <div class="text-zinc-950 dark:text-zinc-50">
              {{ fileSelected?.name }}
            </div>
          </div>
        </div>
        <button
          @click="
            () => {
              if (fileSelected !== undefined) {
                usePeerConnectionsStore().sendFileToPeer({
                  data: fileSelected!,
                });
              } else {
                useNotificationStore().addNotification({
                  type: notificationMessageType.warning,
                  data: 'No File Selected',
                });
              }
            }
          "
          class="gradient-accent w-1/3 rounded-lg px-4 py-2 text-2xl font-bold text-white shadow-lg dark:shadow-zinc-600"
        >
          Share
        </button>
      </div>
    </div>
    <div class="flex w-full flex-row space-x-24 p-8">
      <div class="flex basis-1/2 flex-col rounded-lg border-2 p-8 shadow-lg">
        <div class="mb-2 text-2xl font-bold text-zinc-950">Portal Logs</div>
        <div v-if="usePeerConnectionsStore().filesShared.length === 0">
          Send Files to Fill this Void
        </div>
        <div v-else class="flex flex-col space-y-4">
          <div
            class="flex flex-col justify-between space-y-4 rounded-lg p-4 shadow-lg"
            v-for="file in usePeerConnectionsStore().filesShared"
          >
            <div class="font-bold">
              <span class="text-green-600" v-if="file.status">
                {{ file.send ? "Sent" : "Recieved" }}
              </span>
              <span class="text-yellow-600" v-else>
                {{ file.send ? "Sending" : "Recieving" }}
              </span>
            </div>
            <div class="font-semibold text-blue-600">
              File :
              <span class="font-normal">
                {{ file.name }}
              </span>
            </div>
            <div class="text-ellipsis font-semibold">
              Client ID :
              <span class="font-normal">
                {{ file.peerId }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex basis-1/2 flex-col"></div>
    </div>
    <Notification />
  </div>
</template>
