<script setup lang="ts">
const data = ref("");
useHead({
  title:"FileFlow"
})
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
