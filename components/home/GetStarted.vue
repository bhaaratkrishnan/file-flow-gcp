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
</script>

<template>
  <div class="flex flex-col py-12 justify-center items-center" id="get-started">
    <div class="text-center font-bold text-4xl text-zinc-950">Get Started</div>
    <div class="leading-8 my-8 mx-4 lg:mx-0">
      Simply upload your files here, and let FileFlow effortlessly generate
      shareable links for your convenience.
    </div>
    <div class="flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-28 w-full">
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
        class="flex flex-col text-zinc-950 items-start border-2 p-8 m-2 lg:m-0 rounded-lg lg:w-1/3 shadow-lg hover:shadow-md transition"
      >
        <div class="text-2xl font-bold mb-4">Today's Stats</div>
        <LoadingSpinner v-if="pending" />
        <div v-else>
          <div class="text-blue-600 font-medium my-2">
            Client IP Address :
            <span class="font-mono text-green-500">{{ data?.ip }}</span>
          </div>
          <div class="text-blue-600 font-medium my-2">
            File Usage :
            <span class="font-mono text-green-500"
              >{{ data?.count }} / 5 Flows</span
            >
          </div>
          <div class="my-2 text-zinc-950 font-bold text-2xl">File Flows</div>
          <div class="" v-if="data?.fileFlows.length === 0">
            Begin uploading to fill the void.
          </div>
          <div class="grid grid-cols-3 gap-y-4 gap-x-8" v-else>
            <button
              class="shadow-lg font-bold border-2 px-4 py-2 rounded-lg hover:bg-zinc-200 font-mono"
              v-for="link in data?.fileFlows"
              @click="
                () => {
                  copyToClipboard(
                    `${useAppConfig().baseUrl}/api/upload/${link}`
                  );
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
      <div
        key="notification"
        v-if="notification"
        class="relative bottom-0 right-0 p-4 m-4 h-fit w-fit bg-white shadow-md rounded-md"
      >
        <!-- Your notification content goes here -->
        <p class="text-black">{{ notificationText }}</p>
      </div>
    </TransitionExpand>
  </div>
</template>
