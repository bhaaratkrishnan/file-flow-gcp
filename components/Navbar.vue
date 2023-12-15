<script setup lang="ts">
import { setDarkTheme, setLightTheme } from "~/composables/theme";

const lightModeIcon = "material-symbols:light-mode-outline";
const darkModedIcon = "ph:moon-stars";
const currentThemeMode = ref("light");
const currentThemeModeIcon = computed(() => {
  if (currentThemeMode.value === "light") {
    return darkModedIcon;
  }
  return lightModeIcon;
});

function changeMode() {
  if (currentThemeMode.value === "light") {
    currentThemeMode.value = "dark";
    setDarkTheme();
  } else {
    currentThemeMode.value = "light";
    setLightTheme();
  }
}

onMounted(() => {
  currentThemeMode.value = localStorage.getItem("themeMode") ?? "light";
});
</script>
<template>
  <div class="mx-4 my-4 flex flex-row items-center justify-between lg:mx-16">
    <NuxtLink to="/">
      <div
        class="gradient-primary bg-clip-text text-xl font-bold text-transparent lg:px-8"
      >
        FileFlow
      </div>
    </NuxtLink>
    <div class="flex flex-row items-center space-x-8">
      <NuxtLink to="/peer">
        <button
          class="rounded-lg p-2 text-xl font-bold text-zinc-950 hover:text-zinc-600 dark:text-zinc-50"
        >
          Peer Portal
        </button>
      </NuxtLink>
      <NuxtLink to="/">
        <button
          class="rounded-lg p-2 text-xl font-bold text-zinc-950 hover:text-zinc-600 dark:text-zinc-50"
        >
          AI Studio
        </button>
      </NuxtLink>
    </div>
    <div class="flex flex-row space-x-8">
      <a
        target="_blank"
        href="https://github.com/bhaaratkrishnan/file-flow-gcp"
      >
        <button class="font-mono font-medium text-zinc-950 dark:text-zinc-50">
          <Icon name="mdi:github" class="text-xl dark:text-zinc-50" /> Github
        </button>
      </a>
      <button @click="changeMode">
        <Icon :name="currentThemeModeIcon" class="text-xl dark:text-zinc-50" />
      </button>
    </div>
  </div>
  <hr class="border-zinc-200 mx-4" />
</template>
