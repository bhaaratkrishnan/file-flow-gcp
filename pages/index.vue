<script setup lang="ts">
import { checkConnectivity } from '~/composables/network';

onMounted(() => {
  checkConnectivity();
})
useHead({
  title: "FileFlow",
});
definePageMeta({
  layout: "home-layout",
});
</script>
<template>
  <div>
    <VitePwaManifest />
    <HomeHeroSection />
    <ClientOnly>
      <HomeGetStarted />
      <Notification />
    </ClientOnly>
    <HomeWhatIsFileFlow />
  </div>
</template>
