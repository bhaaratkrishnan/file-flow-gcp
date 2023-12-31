<script setup lang="ts"></script>
<template>
  <div>
    <Navbar />
    <ClientOnly>
      <div class="my-12 flex flex-col items-center justify-center">
        <div
          class="gradient-gemini bg-clip-text text-4xl font-bold text-transparent"
        >
          AI Studio
        </div>
        <div class="flex flex-col items-center justify-center text-center text-base mt-4">
          <div class="dark:text-zinc-50">Powered by</div>
          <div>
            <img src="~/assets/images/gemini-logo.png" alt="" class="w-28 h-10 object-contain">
          </div>
        </div>
      </div>
      <div class="mx-16 mb-16 flex flex-row justify-center space-x-24">
        <AiStudioStats />
        <AiStudioPrompt />
      </div>
      <AiStudioPromptResult />
      <Notification />
    </ClientOnly>

    <GeminiFooter />
  </div>
</template>
