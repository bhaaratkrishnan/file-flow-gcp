<script setup lang="ts">
const { notificationText } = defineProps({
  notificationText: String,
});
</script>

<template>
  <div
    key="notification"
    class="relative bottom-0 right-0 m-4 h-fit w-fit rounded-md border-2 bg-white p-4 shadow-md dark:border-gray-800 dark:bg-slate-900 dark:shadow-zinc-800"
  >
    <!-- Your notification content goes here -->
    <p class="text-black dark:text-zinc-50">{{ notificationText }}</p>
  </div>
</template>
