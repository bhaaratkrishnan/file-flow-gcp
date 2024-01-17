<script setup lang="ts">
import { aiStudioStore } from "~/composables/stores/aiStudioStore";
const useAiStudioStore = aiStudioStore();
const { data: userData, pending } = await useLazyFetch("/api/user");
const currentHost = ref("");
onMounted(() => {
  currentHost.value = window.location.host;
});
</script>

<template>
  <div
    class="flex flex-col items-start rounded-lg border-2 px-5 py-6 text-zinc-950 transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-zinc-50 dark:shadow-zinc-800 lg:m-0 lg:w-1/3 lg:p-8 lg:shadow-lg"
  >
    <LoadingSpinner v-if="pending" />
    <div v-else>
      <div class="my-2 text-xl font-medium text-blue-600 dark:text-blue-300">
        Client IP Address :
        <span class="font-mono text-green-500 dark:text-green-400">{{
          userData?.ip
        }}</span>
      </div>
      <div class="my-4 text-2xl font-bold text-zinc-950 dark:text-zinc-50">
        File Flows
      </div>
      <div class="" v-if="userData?.fileFlows.length === 0">
        Upload Files to use AI Studio
      </div>
      <div class="grid grid-cols-3 gap-x-8 gap-y-4" v-else>
        <button
          class="rounded-lg border-2 px-4 py-2 font-mono font-bold shadow-lg hover:bg-zinc-200 dark:border-gray-700 dark:shadow-zinc-800 dark:hover:bg-gray-700"
          v-for="shortUrl in userData?.fileFlows"
          @click="useAiStudioStore.getFile(shortUrl)"
        >
          {{ shortUrl }}
        </button>
      </div>
    </div>
  </div>
</template>
