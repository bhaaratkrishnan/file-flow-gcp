<script setup lang="ts">
const loading = ref(false);
const data = ref<String | undefined>(undefined);
const emits = defineEmits(["submitted", "notification"]);
const fileName = ref("");
function handleFileChange() {
  const files = (document.getElementById("upload-file") as HTMLInputElement)
    .files;
  if (files === null) {
    return;
  }
  fileName.value = files[0].name;
}
async function handleClick() {
  loading.value = true;
  const formData = new FormData();
  const files = (document.getElementById("upload-file") as HTMLInputElement)
    .files;
  if (files === null) {
    return;
  }
  if (files[0].size >= 10 * 1024 * 1024) {
    emits("notification", "File is more than 10MB");
    loading.value = false;
    return;
  }
  formData.append("upload", files[0]);
  const response = await $fetch("/api/upload", {
    body: formData,
    method: "POST",
  });
  data.value = response.detail as String;
  loading.value = false;
  if (response.code === 200) {
    copyToClipboard(data.value as string);
    emits("notification");
    emits("submitted");
  }
}
</script>
<template>
  <div class="mx-2 flex flex-col items-center justify-center lg:basis-1/2">
    <form
      @submit.prevent="handleClick"
      class="flex w-full flex-col items-center space-y-8"
    >
      <div class="relative flex w-full flex-col lg:w-fit">
        <label for="upload-file" hidden>Upload File Label</label>
        <input
          type="file"
          class="absolute inset-0 cursor-pointer opacity-0"
          name="upload-file"
          id="upload-file"
          required
          @change="handleFileChange"
        />
        <div
          class="flex w-full flex-col space-y-4 rounded-lg border-2 p-16 text-center text-zinc-950 shadow-lg dark:border-gray-800 dark:bg-slate-900 dark:shadow-zinc-800 lg:m-0"
        >
          <div class="rounded-2xl bg-blue-500 p-2 text-xl font-bold text-white">
            <Icon
              name="material-symbols:drive-folder-upload-outline"
              class="text-3xl"
            />
            Upload File
          </div>
          <div class="text-zinc-600 dark:text-zinc-400">
            Or drop your files here
          </div>
          <div class="text-zinc-950 dark:text-zinc-50">{{ fileName }}</div>
        </div>
      </div>
      <button
        class="gradient-accent rounded-lg px-3 py-2 text-xl font-bold text-white shadow-lg dark:shadow-zinc-600"
      >
        Upload
      </button>
    </form>
    <button
      class="my-8 rounded-xl border-2 p-4 dark:border-gray-900 dark:bg-gray-800 dark:text-zinc-50"
      v-if="data || loading"
      @click="
        () => {
          if (!loading) {
            copyToClipboard(data as string);
            emits('notification');
          }
        }
      "
    >
      <LoadingSpinner v-if="loading" />
      <span v-else>{{ data }}</span>
    </button>
  </div>
</template>
