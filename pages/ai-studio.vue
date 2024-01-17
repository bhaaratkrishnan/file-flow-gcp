<script setup lang="ts">
useHead({
  title: "AI Studio",
  meta: [
    {
      name: "description",
      content: "AI Studio",
    },
  ],
});
</script>
<template>
  <div>
    <VitePwaManifest />

    <Navbar />
    <ClientOnly>
      <div class="my-12 flex flex-col items-center justify-center">
        <div
          class="gradient-gemini bg-clip-text text-4xl font-bold text-transparent"
        >
          AI Studio
        </div>
        <div
          class="mt-4 flex flex-col items-center justify-center text-center text-base"
        >
          <div class="dark:text-zinc-50">Powered by</div>
          <div>
            <img
              src="/images/gemini-logo.png"
              alt=""
              class="h-10 w-28 object-contain"
            />
          </div>
        </div>
      </div>
      <div
        class="mx-2 mb-16 flex flex-col justify-center space-y-12 lg:mx-16 lg:flex-row lg:space-x-24 lg:space-y-0"
      >
        <AiStudioStats />
        <AiStudioPrompt />
      </div>
      <AiStudioPromptResult />
      <Notification />
    </ClientOnly>
    <GeminiFooter />
  </div>
</template>
