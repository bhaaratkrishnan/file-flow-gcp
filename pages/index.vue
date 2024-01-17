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

</script>
<template>
  <VitePwaManifest />
  <div
    class="relative flex min-h-screen bg-[url('~/assets/images/light-bg.webp')] bg-cover bg-center dark:bg-[url('~/assets/images/dark-bg.webp')]"
  >
    <div
      class="absolute inset-0 flex flex-col backdrop-blur-3xl backdrop-brightness-95"
    >
      <!-- heading  -->
      <Navbar />
      <div>
        <HomeHeroSection />
        <ClientOnly>
          <HomeGetStarted />
          <Notification />
        </ClientOnly>
        <HomeWhatIsFileFlow />
      </div>
      <!-- footer  -->
      <Footer />
    </div>
  </div>
</template>
