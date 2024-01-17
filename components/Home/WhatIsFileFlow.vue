<script setup lang="ts"></script>
<template>
  <div
    class="mx-4 my-16 flex flex-col space-y-8 lg:mx-28"
    id="what-is-file-flow"
  >
    <div class="text-center text-4xl font-bold text-zinc-950 dark:text-zinc-50">
      <span class="gradient-primary bg-clip-text text-transparent"
        >FileFlow</span
      >
    </div>
    <div class="leading-8 text-zinc-950 dark:text-zinc-50">
      FileFlow simplifies file sharing by using the reliable Google Cloud
      Platform to securely store your files. With this, you can share links for
      uploaded files without the need to save them first. This straightforward
      approach makes collaboration easy, allowing teams to work together
      seamlessly, regardless of their locations.
    </div>
    <div class="text-center text-4xl font-bold text-zinc-950 dark:text-zinc-50">
      <span class="gradient-primary bg-clip-text text-transparent"
        >Peer Portal</span
      >
    </div>
    <div class="leading-8 text-zinc-950 dark:text-zinc-50">
      PeerPortal is a user-friendly platform that makes collaboration easy and
      real-time. It's an open-source tool that securely connects two clients for
      efficient file sharing and collaboration. Powered by WebRTC technology,
      PeerPortal ensures a smooth and secure connection without complicated
      setups. It prioritizes data security, using robust encryption protocols to
      safeguard shared files. With PeerPortal, you can confidently share
      sensitive information in a trustworthy and secure collaborative
      environment.
    </div>
    <div class="text-center text-4xl font-bold text-zinc-950 dark:text-zinc-50">
      <span class="gradient-gemini bg-clip-text text-transparent"
        >AI Studio</span
      >
    </div>
    <div class="leading-8 text-zinc-950 dark:text-zinc-50">
      AI Studio, an extension of FileFlow, takes file processing to new heights.
      It lets users do more with their files using artificial intelligence. Just
      input your file and tell it what you need—whether it's extracting
      characters or summarizing content. AI Studio uses Google's advanced
      multimodal technology called Gemini to intelligently enhance your files.
      It effortlessly refines and improves your documents by combining text and
      images for a comprehensive understanding. With AI Studio and Gemini, new
      possibilities for your files unfold.
    </div>
    <div
      class="py-4 text-center text-2xl font-semibold text-zinc-950 dark:text-zinc-50"
    >
      Tech Stack
    </div>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <!-- Tailwind  -->
      <div
        class="rounded-xl border-2 bg-gradient-to-r from-sky-300 to-sky-600 p-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-none dark:border-gray-900 dark:text-gray-900 dark:shadow-zinc-800"
      >
        <Icon
          name="teenyicons:tailwind-solid"
          class="dark:text-dark mx-2 text-3xl"
        />Tailwind CSS
      </div>
      <!-- Google Cloud  -->
      <div
        class="gradient-accent rounded-xl border-2 p-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-none dark:border-gray-900 dark:text-gray-900 dark:shadow-zinc-800"
      >
        <Icon
          name="mdi:google-cloud"
          class="dark:text-dark mx-2 text-3xl"
        />Google Cloud Storage
      </div>
      <!-- Nuxt  -->
      <div
        class="rounded-xl border-2 bg-gradient-to-r from-green-300 to-green-600 p-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-none dark:border-gray-900 dark:text-gray-900 dark:shadow-zinc-800"
      >
        <Icon
          name="tabler:brand-nuxt"
          class="dark:text-dark mx-2 text-3xl"
        />Nuxt.js
      </div>
      <!-- Web RTC  -->
      <div
        class="rounded-xl border-2 bg-gradient-to-r from-yellow-300 to-yellow-500 p-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-none dark:border-gray-900 dark:text-gray-900 dark:shadow-zinc-800"
      >
        <Icon
          name="simple-icons:webrtc"
          class="dark:text-dark mx-2 text-3xl"
        />WebRTC
      </div>
    </div>
    <div
      class="text-center text-2xl font-semibold text-zinc-950 dark:text-zinc-50"
    >
      Limitations
    </div>
    <div
      class="flex flex-col space-y-4 font-medium leading-8 text-red-600 dark:text-red-400"
    >
      <div>
        <span
          class="gradient-primary bg-clip-text pr-2 text-lg font-bold text-transparent"
        >
          FileFlow:
        </span>
        Users can access up to 5 daily File Flows, a unique feature that offers
        versatile and convenient file sharing. Each File Flow has a maximum file
        size limit of 10MB, ensuring seamless sharing of your documents, images,
        and more. Additionally, every FileFlow upload remains accessible for 24
      </div>
      <div>
        <span
          class="gradient-primary bg-clip-text pr-2 text-lg font-bold text-transparent"
        >
          PeerPortal:
        </span>
        The file size upload limit on PeerPortal is set at 20MB, optimizing the
        portal for efficient and quick file transfers.
      </div>
      <div>
        <span
          class="gradient-gemini bg-clip-text pr-2 text-lg font-bold text-transparent"
        >
          AI Studio:
        </span>
        It currently supports file processing for .txt, .pdf, .docx, .jpg, and
        .png document types. Ensure your files are in these formats to take full
        advantage of AI Studio's capabilities.
      </div>
    </div>
  </div>
</template>
