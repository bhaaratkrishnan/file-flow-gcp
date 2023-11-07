<script setup lang="ts">
const data = ref("");
</script>
<template>
  <!-- <h1>Share Safe</h1>
  
  {{ data }} -->
  <HomeHeroSection />
  <ClientOnly>
    <HomeGetStarted />
  </ClientOnly>
  <HomeWhatIsFileFlow />
</template>
