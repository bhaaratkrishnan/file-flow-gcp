<script setup lang="ts">
const loading = ref(false);
const data = ref<String | undefined>(undefined);
const emits = defineEmits(["submitted", "notification"]);
const fileName = ref("");
function handleFileChange() {
  const files = (document.getElementById("upload") as HTMLInputElement).files;
  if (files === null) {
    return;
  }
  fileName.value = files[0].name;
}
async function handleClick() {
  loading.value = true;
  const formData = new FormData();
  const files = (document.getElementById("upload") as HTMLInputElement).files;
  if (files === null) {
    return;
  }
  if (files[0].size >= 2 * 1024 * 1024) {
    emits("notification", "File is more than 2mB");
    loading.value = false
    return;
  }
  console.log("Exited");
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
    emits("submitted")
  }
}
</script>
<template>
  <div class="basis-1/2 items-center justify-center flex flex-col">
    <form
      @submit.prevent="handleClick"
      class="space-y-8 flex flex-col items-center"
    >
      <div class="relative flex flex-col">
        <input
          type="file"
          class="absolute opacity-0 cursor-pointer inset-0"
          name="upload"
          id="upload"
          required
          @change="handleFileChange"
        />
        <div
          class="flex flex-col p-16 text-zinc-950 shadow-lg text-center space-y-4 border-2 rounded-lg"
        >
          <div class="p-2 text-xl text-white font-bold bg-blue-500 rounded-2xl">
            <Icon
              name="material-symbols:drive-folder-upload-outline"
              class="text-3xl"
            />
            Upload File
          </div>
          <div class="text-zinc-600">Or drop your files here</div>
          <div class="text-zinc-950">{{ fileName }}</div>
        </div>
      </div>
      <button
        class="gradient-accent text-white font-bold px-3 py-2 text-xl rounded-lg"
      >
        Submit
      </button>
    </form>
    <button
      class="my-4 p-4 border-2 rounded-xl"
      v-if="data || loading"
      @click="() => {if(!loading){
          copyToClipboard(data as string);
          emits('notification');
        }}"
    >
      <LoadingSpinner v-if="loading" />
      <span v-else>{{ data }}</span>
    </button>
  </div>
</template>
