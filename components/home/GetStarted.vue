<script setup lang="ts">
import { copyToClipboard } from "~/composables/clipboard.js";
const { data, pending, error, status, refresh } = await useLazyFetch(
  "/api/user",
  {
    method: "get",
  }
);
const notification = ref(false);
const notificationText = ref("");
async function animateNotification(text?: string) {
  notificationText.value = text ?? "Link have been copied to clipboard";
  if (notification.value === false) {
    notification.value = true;
    setTimeout(() => animateNotification(), 4000);
  } else {
    notification.value = false;
    return;
  }
}
const currentHost = window.location.host;
</script>

<template>
  <div class="flex flex-col py-12 justify-center items-center" id="get-started">
    <div class="text-center font-bold text-4xl text-zinc-950 dark:text-zinc-50">
      Get Started
    </div>
    <div class="leading-8 my-8 mx-4 lg:mx-0 dark:text-zinc-50">
      Simply upload your files here, and let FileFlow effortlessly generate
      shareable links for your convenience.
    </div>
    <div
      class="flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-28 w-full"
    >
      <!-- form  -->
      <UploadFile
        @submitted="refresh"
        @notification="
          (text?:string) => {
            animateNotification(text!);
          }
        "
      />
      <!-- stats  -->
      <div
        class="flex flex-col text-zinc-950 dark:bg-slate-900 dark:text-zinc-50 items-start border-2 dark:border-slate-800 dark:shadow-zinc-800 p-8 m-2 lg:m-0 rounded-lg lg:w-1/3 shadow-lg hover:shadow-md transition"
      >
        <div class="text-2xl font-bold mb-4">Today's Stats</div>
        <LoadingSpinner v-if="pending" />
        <div v-else>
          <div class="text-blue-600 dark:text-blue-300 font-medium my-2">
            Client IP Address :
            <span class="font-mono text-green-500 dark:text-green-400">{{
              data?.ip
            }}</span>
          </div>
          <div class="text-blue-600 dark:text-blue-300 font-medium my-2">
            File Usage :
            <span class="font-mono text-green-500 dark:text-green-400"
              >{{ data?.count }} / 5 Flows</span
            >
          </div>
          <div class="my-4 text-zinc-950 font-bold text-2xl dark:text-zinc-50">
            File Flows
          </div>
          <div class="" v-if="data?.fileFlows.length === 0">
            Begin uploading to fill the void.
          </div>
          <div class="grid grid-cols-3 gap-y-4 gap-x-8" v-else>
            <button
              class="shadow-lg dark:shadow-zinc-800 font-bold border-2 px-4 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-gray-700 dark:border-gray-700 font-mono"
              v-for="link in data?.fileFlows"
              @click="
                () => {
                  copyToClipboard(`${currentHost}/api/upload/${link}`);
                  animateNotification();
                }
              "
            >
              {{ link }}
            </button>
          </div>
        </div>
      </div>
      <!-- modal  -->
    </div>
    <TransitionExpand>
      TODO:Fix this notification component 
      <Notification v-if="notification" :text="notificationText" />
    </TransitionExpand>
  </div>
</template>
