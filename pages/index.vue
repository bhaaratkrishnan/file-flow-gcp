<script setup lang="ts">
const data = ref("");
async function handleClick() {
  const formData = new FormData();
  const files = (document.getElementById("upload") as HTMLInputElement).files;
  if (files === null) {
    return;
  }
  formData.append("upload", files[0]);
  data.value = await $fetch("/api/upload", {
    body: formData,
    method: "POST",
  });
}
</script>
<template>
  {{ data }}
  <h1>Share Safe</h1>
  <form @submit.prevent="handleClick">
    <input type="file" name="upload" id="upload" required />
    <button type="submit">Submit</button>
  </form>
</template>
