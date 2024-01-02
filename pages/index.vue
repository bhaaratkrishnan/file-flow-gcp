<script setup lang="ts">
useHead({
  title: "FileFlow",
});
useSeoMeta({
  title: "FileFlow",
  description:
    "FileFlow is a file sharing platform powered by Google Cloud Platform.",
  ogTitle: "FileFlow",
  ogDescription:
    "FileFlow is a file sharing platform powered by Google Cloud Platform.",
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
