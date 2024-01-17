<script setup lang="ts">
import { aiStudioStore } from "~/composables/stores/aiStudioStore";
let useAiStudioStore = aiStudioStore();
let currentHost = "";
let proto = "";
onMounted(() => {
  currentHost = window.location.host;
  proto = window.location.protocol;
});
</script>
<template>
  <div
    class="flex flex-col items-start rounded-lg border-2 p-8 text-zinc-950 shadow-lg transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-zinc-50 dark:shadow-zinc-800 lg:m-0 lg:w-1/3"
  >
    <div class="mb-4 text-2xl font-bold">AI Prompter</div>

    <div>
      <div class="mb-4 mt-2" v-if="useAiStudioStore.currentPromptType">
        Prompt Type :
        <span class="font-bold text-blue-600">
          {{ useAiStudioStore.currentPromptType }}
          <span class="text-green-500">
            ({{ useAiStudioStore.currentFileType }})
          </span>
        </span>
      </div>
      <div class="my-2 font-medium text-blue-600 dark:text-blue-300">
        <textarea
          @change="
            (event) =>
              (useAiStudioStore.currentPrompt = (
                event.target as HTMLInputElement
              ).value)
          "
          name=""
          id=""
          class="w-full rounded-lg border-2 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-gray-800 dark:bg-slate-900"
          rows="5"
          placeholder="Try out your prompts here!"
        ></textarea>
      </div>

      <div class="my-4 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
        File Flow :
        <span
          class="mx-2 text-base font-normal"
          v-if="useAiStudioStore.currentShortUrl === undefined"
        >
          Select File to see AI Options
        </span>
        <a
          :href="`${proto}//${currentHost}/api/upload/${useAiStudioStore.currentShortUrl}`"
          target="_blank"
          v-else
          class="mx-2 font-mono font-bold text-green-500 underline dark:text-green-400"
        >
          {{ useAiStudioStore.currentShortUrl }}
        </a>
      </div>
      <GeminiLoadingSpinner v-if="useAiStudioStore.loading" />
      <button
        v-else
        @click="useAiStudioStore.sendPrompt()"
        class="gradient-gemini rounded-lg px-4 py-2 font-bold text-white shadow-lg transition hover:shadow dark:text-blue-950"
      >
        Prompt
      </button>
    </div>
  </div>
</template>
