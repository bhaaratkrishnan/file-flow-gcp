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
  <div class="flex flex-row my-4 mx-4 lg:mx-16 justify-between items-center">
    <div
      class="gradient-primary bg-clip-text text-transparent font-bold text-xl lg:px-8"
    >
      FileFlow
    </div>
    <div class="flex flex-row space-x-8">
      <a target="_blank" href="https://github.com/bhaaratkrishnan/file-flow-gcp">
        <button class="text-zinc-950 dark:text-zinc-50 font-mono font-medium">
          <Icon name="mdi:github" class="text-xl dark:text-zinc-50" /> Github
        </button>
      </a>
      <button @click="changeMode">
        <Icon :name="currentThemeModeIcon" class="text-xl dark:text-zinc-50" />
      </button>
    </div>
  </div>
</template>
