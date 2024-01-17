<script setup lang="ts">
import { setDarkTheme, setLightTheme } from "~/composables/theme";

const lightModeIcon = "material-symbols:light-mode-outline";
const darkModedIcon = "ph:moon-stars";
const currentThemeMode = ref("light");
const navbarOpen = ref(false);
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

function toggleNavbar() {
  navbarOpen.value = !navbarOpen.value;
}
onMounted(() => {
  currentThemeMode.value = localStorage.getItem("themeMode") ?? "light";
});
</script>
<template>
  <div class="mx-4 my-4 flex flex-row items-center justify-between lg:mx-16">
    <div class="flex flex-row items-center justify-center space-x-4">
      <div class="lg:hidden">
        <Icon
          @click="toggleNavbar"
          name="material-symbols:menu-rounded"
          class="text-2xl dark:text-zinc-50"
        />
        <TransitionExpand>
          <div
            key="navbar"
            v-if="navbarOpen"
            class="fixed left-0 top-14 mx-2 w-1/2 rounded-lg border-2 bg-white bg-opacity-50 shadow-lg dark:border-gray-800 dark:bg-slate-900 dark:shadow-zinc-800"
          >
            <div>
              <NuxtLink to="/peer">
                <button
                  class="gradient-primary bg-clip-text p-2 text-xl font-bold text-transparent"
                >
                  Peer Portal
                </button>
              </NuxtLink>
            </div>
            <hr class="mx-2 border-zinc-400" />
            <div>
              <NuxtLink to="/ai-studio">
                <button
                  class="gradient-gemini bg-clip-text p-2 text-xl font-bold text-transparent"
                >
                  AI Studio
                </button>
              </NuxtLink>
            </div>
          </div>
        </TransitionExpand>
      </div>
      <NuxtLink to="/">
        <div
          class="gradient-primary bg-clip-text text-xl font-bold text-transparent lg:px-8"
        >
          FileFlow
        </div>
      </NuxtLink>
    </div>

    <div class="hidden flex-row items-center space-x-8 lg:flex">
      <NuxtLink to="/peer">
        <button
          class="rounded-lg p-2 text-xl font-bold text-zinc-950 hover:text-zinc-600 dark:text-zinc-50"
        >
          Peer Portal
        </button>
      </NuxtLink>
      <NuxtLink to="/ai-studio">
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
          <Icon name="mdi:github" class="text-2xl dark:text-zinc-50" /> Github
        </button>
      </a>
      <button @click="changeMode" class="dark:text-zinc-50">
        <Icon :name="currentThemeModeIcon" class="text-2xl dark:text-zinc-50" />
        Theme
      </button>
    </div>
  </div>
  <hr class="mx-4 border-zinc-200" />
</template>
