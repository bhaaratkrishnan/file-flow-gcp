<script setup lang="ts"></script>

<template>
  <div
    class="flex relative min-h-screen dark:bg-[url('~/assets/images/dark-bg.jpg')] bg-[url('~/assets/images/light-bg.jpg')] bg-center bg-cover"
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
        class="flex flex-col bg-gradient-to-b from-white via-red-200 to-blue-200 px-12 lg:px-24 py-32 items-center"
      >
        <div
          class="border-[3px] hover:-translate-y-4 transition border-white rounded-lg shadow-lg p-4 bg-opacity-30 bg-white"
        >
          <div class="text-zinc-950">
            Made by
            <span
              class="gradient-primary font-semibold bg-clip-text text-transparent"
              >Bhaarat Krishnan</span
            >
            <br />
            Powered by
            <span class="">Google Cloud</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
