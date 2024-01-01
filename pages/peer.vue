<script setup lang="ts">
import { checkConnectivity } from "~/composables/network";

onMounted(() => {
  checkConnectivity();
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
