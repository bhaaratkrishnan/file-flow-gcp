<script setup lang="ts">
import { aiStudioStore } from "~/composables/stores/aiStudioStore";
import { useNotificationStore } from "~/composables/stores/peerStore";
import { notificationMessageType } from "~/composables/types/peerTypes";
</script>

<template>
  <div
    class="mb-16 flex items-center justify-center"
    v-if="aiStudioStore().promptResponse.length > 0"
  >
    <div
      class="mx-28 flex w-1/2 flex-col items-center justify-center rounded-lg border-2 bg-clip-text p-8 text-xl font-normal shadow-lg dark:border-gray-800 dark:bg-slate-900 dark:text-zinc-50 dark:shadow-zinc-800"
      markdown="1"
    >
      <div class="dark:text-zinc-50">
        {{ aiStudioStore().promptResponse }}
      </div>
      <div class="my-4">
        <button
          @click="
            () => {
              copyToClipboard(aiStudioStore().promptResponse);
              useNotificationStore().addNotification({
                type: notificationMessageType.success,
                data: 'Copied to Clipboard!',
              });
            }
          "
          class="rounded-lg border-2 bg-clip-text p-2 text-base font-semibold text-black shadow-lg hover:shadow dark:text-zinc-50"
        >
          <Icon name="material-symbols:content-copy" class="text-2xl" /> Copy
        </button>
      </div>
    </div>
  </div>
</template>
