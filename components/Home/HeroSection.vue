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
const fileNamesArray = [
  "Files",
  ".txt",
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".zip",
  ".mp4",
  ".mkv",
  ".mp3",
];
const currentFileIndex = ref(0);
function changeFileNames() {
  if (currentFileIndex.value === fileNamesArray.length - 1) {
    currentFileIndex.value = 0;
  } else {
    currentFileIndex.value += 1;
  }
  setTimeout(() => changeFileNames(), 1000);
}

onMounted(() => {
  setTimeout(() => changeFileNames(), 2000);
});
</script>
<template>
  <div class="flex flex-col space-y-8 justify-center items-center min-h-screen">
    <div
      class="text-6xl text-transparent text-center font-bold gradient-primary bg-clip-text"
    >
      FileFlow
    </div>
    <div class="text-zinc-950 dark:text-zinc-50">
      powered by Google Cloud <Icon name="logos:google-cloud" class="text-xl" />
    </div>
    <!-- tagline  -->
    <div class="text-xl lg:text-2xl text-zinc-950 dark:text-zinc-50 text-center mx-2">
      Share and Quickly Distribute your <br />
        <span
          :key="currentFileIndex"
          class="font-mono font-bold gradient-accent bg-clip-text text-transparent"
        >
            {{ fileNamesArray[currentFileIndex] }}
        </span>
    </div>
    <!-- button row  -->
    <div class="flex flex-row space-x-4 lg:space-x-8">
      <button
        @click="scrollToGetStarted"
        class="text-white gradient-accent px-4 py-2 font-bold rounded-lg shadow-lg"
      >
        Get Started
      </button>
      <button
        @click="scrollToWhatIsFileFlow"
        class="text-zinc-950 dark:text-zinc-50 shadow-lg font-bold border-[3px] px-4 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-transparent dark:border-slate-800 dark:bg-slate-950 dark:shadow-zinc-800"
      >
        What is FileFlow?
      </button>
    </div>
  </div>
</template>
