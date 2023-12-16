<script setup lang="ts">
useHead({
  bodyAttrs:{
    class:"dark:bg-gray-900"
  }
})
</script>

<template>
  <div
    class="flex relative min-h-screen  dark:bg-[url('~/assets/images/dark-bg.jpg')] bg-[url('~/assets/images/light-bg.jpg')] bg-center bg-cover"
  >
    <!-- <img src="~/assets/images/light-bg.jpg" alt="" /> -->
    <div
      class="absolute backdrop-blur-3xl backdrop-brightness-95 inset-0 flex flex-col"
    >
      <Navbar />
      <!-- heading  -->
      <slot />
      <!-- footer  -->
     <Footer />
    </div>
  </div>
</template>
