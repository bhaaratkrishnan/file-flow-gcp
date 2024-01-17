<script setup lang="ts">
useHead({
  title: "Peer Portal",
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
      <PeerPortal />
      <!-- Tango walkthrough -->
      <div class="flex h-screen w-full flex-col items-center justify-center">
        <div class="my-8 text-2xl font-semibold gradient-accent bg-clip-text text-transparent">
          Tango walkthrough
        </div>
        <iframe
          src="https://app.tango.us/app/embed/6dabc7d3-563f-4dd2-8c82-ac85226fcd78?skipCover=false&defaultListView=false&skipBranding=true"
          sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
          security="restricted"
          title="Using Peer Portal to Share and Access Files: Step-by-Step Instructions"
          class="lg:w-1/2 w-5/6 h-3/4"
          referrerpolicy="strict-origin-when-cross-origin"
          frameborder="0"
          webkitallowfullscreen="webkitallowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          allowfullscreen="true"
        ></iframe>
      </div>
    </ClientOnly>

    <Footer />
  </div>
</template>
