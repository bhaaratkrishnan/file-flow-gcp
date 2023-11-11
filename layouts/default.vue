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
      <div
        class="flex flex-col bg-gradient-to-b from-white dark:from-gray-900 via-red-200  dark:to-blue-950 to-blue-200 px-12 lg:px-24 py-32 items-center"
      >
        <div
          class="border-[3px] hover:-translate-y-4 transition border-white dark:border-zinc-800 rounded-lg shadow-lg p-4 bg-opacity-30 bg-white dark:bg-gray-800"
        >
          <div class="text-zinc-950 dark:text-zinc-50">
            Made by
            <span
              class="gradient-primary font-semibold bg-clip-text text-transparent"
              >Bhaarat Krishnan</span
            >
            <br />
            Powered by
            <span class="">Google Cloud <Icon name="logos:google-cloud" class="text-xl" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
