<script setup lang="ts">
import { useNotificationStore } from "~/composables/stores/notificationStore";
import { notificationMessageType } from "~/composables/types/peerTypes";
</script>

<template>
  <div
    class="fixed right-0 top-6 flex basis-1/2 flex-col items-end justify-end p-8"
  >
    <TransitionGroup name="list" tag="div">
      <div
        class="my-2 flex flex-row space-x-4 rounded-lg bg-white p-3 shadow-lg"
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
            name="material-symbols-light:info"
            class="text-blue-600"
            v-else-if="notification.type === notificationMessageType.info"
          />

          <Icon
            v-else
            name="clarity:success-standard-solid"
            class="text-green-600"
          />
        </div>
        <div class="text-lg">
          {{ notification.data }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
