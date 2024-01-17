<script setup>
</script>
<template>
  <div>
    <Navbar />
    <div>
      <!-- Error Page  -->
      <div class="flex h-screen flex-col items-center justify-center">
        <div
          class="text-center text-4xl font-bold text-gray-800 dark:text-gray-100"
        >
          503
        </div>
        <div
          class="text-center text-2xl font-bold text-gray-600 dark:text-gray-400"
        >
          You are in Offline
        </div>
        <div class="text-center text-xl text-gray-500 dark:text-gray-300">
          Please check your Internet Connection and Try Again
        </div>
        <div class="mt-8">
          <NuxtLink to="/">
            <button
              class="gradient-primary bg-clip-text text-xl font-bold text-transparent"
            >
              Go Back Home
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
