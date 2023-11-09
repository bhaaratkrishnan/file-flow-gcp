<script setup lang="ts">
const lightModeIcon = "material-symbols:light-mode-outline";
const darkModedIcon = "ph:moon-stars";
const currentThemeMode = ref("light");
const currentThemeModeIcon = computed(() => {
  if (currentThemeMode.value === "light") {
    return darkModedIcon;
  }
  return lightModeIcon;
});
function changeMode () {
  if(currentThemeMode.value === "light") {
    currentThemeMode.value = "dark"
    document.documentElement.classList.add("dark");
  }else{
    currentThemeMode.value = "light";
    document.documentElement.classList.remove("dark");
  }
  
}
</script>
<template>
  <div class="flex flex-row my-4 mx-4 lg:mx-16 justify-between items-center">
    <div
      class="gradient-primary bg-clip-text text-transparent font-bold text-xl lg:px-8"
    >
      FileFlow
    </div>
    <div class="flex flex-row space-x-8">
      <button class="text-zinc-950 dark:text-zinc-50 font-mono font-medium">
        <Icon name="mdi:github" class="text-xl dark:text-zinc-50" /> Github
      </button>
      <button @click="changeMode">
        <Icon :name="currentThemeModeIcon" class="text-xl dark:text-zinc-50" />
      </button>
    </div>
  </div>
</template>
