<script setup lang="ts">
import { usePeerStore } from "~/composables/stores/peerStore";
import { usePeerConnectionsStore } from "~/composables/stores/peerConnectionStore";
import { useNotificationStore } from "~/composables/stores/notificationStore";
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
    if (tempEvent.files[0].size >= 20 * 1024 * 1024) {
      useNotificationStore().addNotification({
        type: notificationMessageType.warning,
        data: "File is more than 10MB",
      });
      return;
    }
    fileSelected.value = tempEvent.files[0];
    useNotificationStore().addNotification({
      type: notificationMessageType.success,
      data: "File Selected",
    });
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
    useCookie("peerId", { maxAge: 1296000 }).value = currentPeerId.value; // 15 Days Validity
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
onMounted(() => {
  if (useCookie("peerId").value) {
    currentPeerId.value = useCookie("peerId").value ?? "";
  }
});
</script>

<template>
  <div class="mx-6 flex flex-col items-center justify-center lg:mx-16">
    <div
      class="gradient-primary my-6 bg-clip-text text-4xl font-bold text-transparent"
    >
      Peer Portal
    </div>
    <div
      class="my-8 flex flex-col items-center justify-center space-y-8 lg:my-0"
    >
      <div class="flex flex-row items-center justify-center space-x-4">
        <div
          class="h-4 w-4 animate-bounce rounded-full bg-red-600 dark:bg-red-500"
          v-if="!peerStore.peerConnectionStatus"
        ></div>
        <div
          class="h-4 w-4 animate-bounce rounded-full bg-green-600 dark:bg-green-400"
          v-else
        ></div>
        <input
          :readonly="peerStore.peerConnectionStatus"
          type="text"
          autofocus
          placeholder="Enter Peer ID"
          class="w-2/3 rounded-lg border-2 p-2 shadow-lg dark:border-zinc-600 dark:bg-slate-900 dark:text-white dark:shadow-zinc-800"
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
    <div
      class="flex min-w-full flex-col space-y-12 py-4 lg:flex-row lg:justify-between lg:space-x-24 lg:space-y-0 lg:p-8"
    >
      <!-- connected clients tab  -->
      <div
        class="flex w-full flex-col space-y-6 rounded-lg border-2 px-3 py-6 dark:border-gray-800 dark:shadow-zinc-800 lg:basis-1/2 lg:space-y-8 lg:p-8 lg:shadow-lg"
      >
        <div class="text-2xl font-bold text-zinc-950 dark:text-zinc-50 lg:mb-2">
          Connected Clients
        </div>
        <div
          class="flex flex-col space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0"
        >
          <input
            placeholder="Enter Client ID"
            type="text"
            class="h-fit rounded-lg border-2 p-2 shadow-lg dark:border-zinc-600 dark:bg-slate-900 dark:text-white dark:shadow-zinc-800"
            v-model="clientId"
            @keydown.enter="handleAddClient"
          />
          <button
            class="rounded-lg bg-blue-500 p-1 text-lg font-bold text-white hover:bg-blue-800 dark:shadow-zinc-800 lg:p-2 lg:text-xl"
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
          :class="`flex flex-row justify-between rounded-lg border-blue-600 px-4 py-3 text-start font-mono font-bold text-blue-600 shadow-lg hover:shadow-md dark:shadow-zinc-800 lg:w-2/3 ${
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
        class="flex w-full flex-col items-center justify-center space-y-8 lg:basis-1/2"
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
            class="flex flex-col space-y-4 rounded-lg border-2 p-16 text-center text-zinc-950 dark:border-gray-800 dark:bg-slate-900 dark:shadow-zinc-800 lg:m-0 lg:shadow-lg"
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
    <!-- Portal Logs -->
    <div
      class="my-6 flex min-w-full flex-col lg:my-0 lg:flex-row lg:space-x-24 lg:p-8"
    >
      <div
        class="flex flex-col space-y-4 rounded-lg border-2 px-5 py-6 dark:border-gray-800 dark:shadow-zinc-800 lg:basis-1/2 lg:space-y-8 lg:p-8 lg:shadow-lg"
      >
        <div
          class="mb-2 text-2xl font-bold text-zinc-950 dark:text-zinc-50 lg:mb-4"
        >
          Portal Logs
        </div>
        <div
          class="dark:text-zinc-50"
          v-if="usePeerConnectionsStore().filesShared.length === 0"
        >
          Send Files to Fill this Void
        </div>
        <div v-else class="flex flex-col space-y-4">
          <div
            class="flex flex-col justify-between space-y-4 rounded-lg border-2 p-4 shadow-lg dark:border-gray-800 dark:shadow-zinc-800"
            v-for="file in usePeerConnectionsStore().filesShared"
          >
            <div class="font-bold">
              <span
                class="text-green-600 dark:text-green-500"
                v-if="file.status"
              >
                {{ file.send ? "Sent" : "Recieved" }}
              </span>
              <span class="text-yellow-600" v-else>
                {{ file.send ? "Sending" : "Recieving" }}
              </span>
            </div>
            <div class="font-semibold text-blue-600 dark:text-blue-500">
              File :
              <span class="font-normal">
                {{ file.name }}
              </span>
            </div>
            <div class="text-ellipsis font-semibold dark:text-zinc-50">
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
