<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "dark:bg-gray-900",
  },
});
</script>

<template>
  <div
    class="relative flex min-h-screen bg-[url('~/assets/images/light-bg.webp')] bg-cover bg-center dark:bg-[url('~/assets/images/dark-bg.webp')]"
  >
    <div
      class="absolute inset-0 flex flex-col backdrop-blur-3xl backdrop-brightness-95"
    >
      <Navbar />
      <!-- heading  -->
      <slot />
      <!-- footer  -->
      <Footer />
    </div>
  </div>
</template>
