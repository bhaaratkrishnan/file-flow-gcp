<script setup lang="ts">
useHead({
  title:"FileFlow",
})
definePageMeta({
  layout:"home-layout"
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
