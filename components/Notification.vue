<script setup lang="ts">
import { useNotificationStore } from "~/composables/Peer/peerStore";
import { notificationMessageType } from "~/composables/Peer/peerTypes";
</script>

<template>
  <div
    class="fixed bottom-0 right-0 flex basis-1/2 flex-col items-end justify-end p-8"
  >
    <div
      class="my-2 flex flex-row space-x-4 rounded-lg p-3 shadow-lg"
      v-for="notification in useNotificationStore().notifications"
      :key="notification.id"
    >
      <div>
        <Icon
          name="ic:baseline-warning"
          class="text-yellow-600"
          v-if="notification.type === notificationMessageType.warning"
        />
        <Icon
          name="ic:baseline-dangerous"
          class="text-red-600"
          v-else-if="notification.type === notificationMessageType.error"
        />
        <Icon
          v-else
          name="clarity:success-standard-solid"
          class="text-blue-600"
        />
      </div>
      <div>
        {{ notification.data }}
      </div>
    </div>
  </div>
</template>
