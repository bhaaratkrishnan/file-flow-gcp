<script setup></script>
<template>
  <div
    class="mx-4 lg:mx-28 my-16 flex flex-col space-y-8"
    id="what-is-file-flow"
  >
    <div class="text-zinc-950 dark:text-zinc-50 font-bold text-4xl text-center">
      What is
      <span class="gradient-primary bg-clip-text text-transparent"
        >FileFlow</span
      >
    </div>
    <div class="leading-8 dark:text-zinc-50 text-zinc-950">
      FileFlow is an Open Source file-sharing platform that redefines the art of
      sending, receiving, and managing your files. Our solution leverages the
      robust Google Cloud Platform to ensure the secure storage and transmission
      of your data. Experience a new era of file sharing with FileFlow, where
      efficiency and security come together seamlessly.
    </div>
    <div
      class="text-center text-zinc-950 dark:text-zinc-50 font-semibold text-2xl py-4"
    >
      Tech Stack
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div
        class="border-2 dark:border-gray-900 dark:shadow-zinc-800 p-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-none hover:scale-105 transition text-white bg-gradient-to-r from-sky-300 to-sky-600 dark:text-gray-900"
      >
        <Icon
          name="teenyicons:tailwind-solid"
          class="dark:text-dark text-3xl mx-2"
        />Tailwind CSS
      </div>
      <div
        class="border-2 p-4 text-lg font-bold dark:border-gray-900 dark:shadow-zinc-800 dark:text-gray-900 text-white gradient-accent rounded-xl shadow-lg hover:shadow-none hover:scale-105 transition"
      >
        <Icon
          name="mdi:google-cloud"
          class="dark:text-dark text-3xl mx-2"
        />Google Cloud Storage
      </div>
      <div
        class="border-2 p-4 dark:border-gray-900 dark:shadow-zinc-800 dark:text-gray-900 text-lg font-bold text-white bg-gradient-to-r from-green-300 to-green-600 rounded-xl shadow-lg hover:shadow-none hover:scale-105 transition"
      >
        <Icon
          name="tabler:brand-nuxt"
          class="dark:text-dark text-3xl mx-2"
        />Nuxt.js
      </div>
    </div>
    <div
      class="text-center text-zinc-950 dark:text-zinc-50 font-semibold text-2xl"
    >
      Limitations
    </div>
    <div class="text-red-600 leading-8 font-medium dark:text-red-400">
      Users can access up to 5 daily File Flows, a unique feature that offers
      versatile and convenient file sharing. Each File Flow has a maximum file
      size limit of 2MB, ensuring seamless sharing of your documents, images,
      and more. Additionally, every FileFlow upload remains accessible for 24
      hours, guaranteeing secure and time-sensitive sharing.
    </div>
  </div>
</template>
