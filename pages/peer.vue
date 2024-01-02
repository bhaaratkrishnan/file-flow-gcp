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
    </ClientOnly>
    <Footer />
  </div>
</template>
