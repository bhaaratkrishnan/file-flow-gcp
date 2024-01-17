<script setup lang="ts">
import { copyToClipboard } from "~/composables/clipboard.js";
const { data, pending, refresh } = await useLazyFetch("/api/user", {
  method: "get",
});
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
  <div class="flex flex-col items-center justify-center py-12" id="get-started">
    <div class="text-center text-4xl font-bold text-zinc-950 dark:text-zinc-50">
      Get Started
    </div>
    <div class="mx-4 my-8 leading-8 dark:text-zinc-50 lg:mx-0">
      Simply upload your files here, and let FileFlow effortlessly generate
      shareable links for your convenience.
    </div>
    <div
      class="flex w-full flex-col space-y-16 lg:flex-row lg:space-x-28 lg:space-y-0"
    >
      <!-- form  -->
      <UploadFile
        @submitted="refresh"
        @notification="
          (text?: string) => {
            animateNotification(text!);
          }
        "
      />
      <!-- stats  -->
      <div
        class="m-2 flex flex-col items-start rounded-lg border-2 p-8 text-zinc-950 shadow-lg transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-zinc-50 dark:shadow-zinc-800 lg:m-0 lg:w-1/3"
      >
        <div class="mb-4 text-2xl font-bold">Today's Stats</div>
        <LoadingSpinner v-if="pending" />
        <div v-else>
          <div class="my-2 font-medium text-blue-600 dark:text-blue-300">
            Client IP Address :
            <span class="font-mono text-green-500 dark:text-green-400">{{
              data?.ip
            }}</span>
          </div>
          <div class="my-2 font-medium text-blue-600 dark:text-blue-300">
            File Usage :
            <span class="font-mono text-green-500 dark:text-green-400"
              >{{ data?.count }} / 5 Flows</span
            >
          </div>
          <div class="my-4 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
            File Flows
          </div>
          <div class="" v-if="data?.fileFlows.length === 0">
            Begin uploading to fill the void.
          </div>
          <div class="grid grid-cols-3 gap-x-8 gap-y-4" v-else>
            <button
              class="rounded-lg border-2 px-4 py-2 font-mono font-bold shadow-lg hover:bg-zinc-200 dark:border-gray-700 dark:shadow-zinc-800 dark:hover:bg-gray-700"
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
      <HomeNotification
        v-if="notification"
        :notification-text="notificationText"
      />
    </TransitionExpand>
  </div>
</template>
