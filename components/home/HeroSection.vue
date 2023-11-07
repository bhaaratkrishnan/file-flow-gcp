<script setup lang="ts">
function scrollToSection(section: string) {
  var scrollDiv = document.getElementById(section)?.offsetTop;
  window.scrollTo({ top: scrollDiv, behavior: "smooth" });
}
function scrollToGetStarted() {
  scrollToSection("get-started");
}
function scrollToWhatIsFileFlow() {
  scrollToSection("what-is-file-flow");
}
</script>
<template>
  <div class="flex flex-col space-y-8 justify-center items-center min-h-screen">
    <div
      class="text-6xl text-transparent text-center font-bold gradient-primary bg-clip-text"
    >
      FileFlow
    </div>
    <div class="">
      powered by Google Cloud <Icon name="logos:google-cloud" class="text-xl" />
    </div>
    <!-- tagline  -->
    <div class="text-2xl text-zinc-950 text-center">
      Share and Quickly Distribute your
      <span class="font-mono font-bold"> Files </span>
    </div>
    <!-- button row  -->
    <div class="flex flex-row space-x-8">
      <button
        @click="scrollToGetStarted"
        class="text-white gradient-accent px-4 py-2 font-bold rounded-lg shadow-lg"
      >
        Get Started
      </button>
      <button
      @click="scrollToWhatIsFileFlow"
        class="text-zinc-950 shadow-lg font-bold border-[3px] px-4 py-2 rounded-lg hover:bg-zinc-200"
      >
        What is FileFlow?
      </button>
    </div>
  </div>
</template>
