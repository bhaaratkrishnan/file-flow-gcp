import { notificationMessageType } from "~/composables/types/peerTypes";
import { useNotificationStore } from "~/composables/stores/notificationStore";

export const aiStudioStore = defineStore("aiStudioStore", () => {
  const currentPrompt = ref<string>("");
  const currentPromptType = ref<string | undefined>(undefined);
  const currentShortUrl = ref<string | undefined>(undefined);
  const loading = ref(false);
  const currentFileType = ref<string | undefined>(undefined);
  const currrentFileContents = ref<string | undefined>(undefined);
  const promptResponse = ref<string>("");
  async function getFileType() {
    if (currentShortUrl.value === undefined) {
      return;
    }
    const type = await $fetch<string>(`/api/file/${currentShortUrl.value}`, {
      params: {
        type: true,
      },
    });
    return type;
  }
  async function getImageContents(): Promise<string | undefined> {
    if (currentShortUrl.value === undefined) {
      return;
    }
    const { contents, type } = await $fetch(`/api/file/image`, {
      params: {
        id: currentShortUrl.value,
      },
      method: "GET",
    });
    return contents;
  }

  async function getTextContents(): Promise<string | undefined> {
    if (currentShortUrl.value === undefined) {
      return;
    }
    const contents = await $fetch<string>(
      `/api/file/${currentFileType.value}`,
      {
        params: {
          id: currentShortUrl.value,
        },
      },
    );
    return contents;
  }
  function changeCurrentShortUrl(shortUrl: string) {
    useNotificationStore().addNotification({
      type: notificationMessageType.info,
      data: `Selected ${shortUrl} FileFlow`,
    });
    currentShortUrl.value = shortUrl;
  }

  async function getFile(shortUrl: string) {
    if (
      shortUrl === currentShortUrl.value &&
      currrentFileContents.value !== undefined
    ) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `Already Selected ${shortUrl} FileFlow`,
      });
      return;
    }
    currentFileType.value = undefined;
    currentPromptType.value = undefined;
    currrentFileContents.value = undefined;
    changeCurrentShortUrl(shortUrl);
    // Getting file type
    useNotificationStore().addNotification({
      type: notificationMessageType.info,
      data: `Getting File Type`,
    });
    loading.value = true;
    currentFileType.value = await getFileType();
    // Check file type
    let promptType;
    switch (currentFileType.value) {
      case "jpg":
        promptType = "image";
        break;
      case "png":
        promptType = "image";
        break;
      case "docx":
        promptType = "text";
        break;
      case "pdf":
        promptType = "text";
        break;
      case "txt":
        promptType = "text";
        break;
      default:
        promptType = undefined;
    }
    currentPromptType.value = promptType ? promptType.toUpperCase() : undefined;
    // If file type is not supported, return
    if (promptType === undefined) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `${currentFileType.value} not supported`,
      });
      loading.value = false;
      currentShortUrl.value = undefined;
      currentFileType.value = undefined;
      return;
    }
    useNotificationStore().addNotification({
      type: notificationMessageType.info,
      data: `File Type Supported`,
    });
    // Get file contents
    useNotificationStore().addNotification({
      type: notificationMessageType.info,
      data: `Getting File Contents`,
    });
    if (currentPromptType.value === "IMAGE") {
      currrentFileContents.value = await getImageContents();
    } else {
      currrentFileContents.value = await getTextContents();
    }
    useNotificationStore().addNotification({
      type: notificationMessageType.info,
      data: `File Contents Received`,
    });
    loading.value = false;
    // Get File Data and Store it
  }

  async function sendPrompt() {
    // Prompt is empty
    if (currentPrompt.value === "") {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `Prompt is empty`,
      });
      return;
    }
    // Short url is underfined
    if (currentShortUrl.value === undefined) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `No file selected`,
      });
      return;
    }
    // Prompt type is undefined
    if (currentPromptType.value === undefined) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `File type not supported`,
      });
      return;
    }
    // File Contents is undefined
    if (currrentFileContents.value === undefined) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `File contents not loaded`,
      });
      return;
    }
    promptResponse.value = "";
    useNotificationStore().addNotification({
      type: notificationMessageType.info,
      data: `Prompting Gemini`,
    });
    loading.value = true;
    let response: Response = {} as Response;
    // If promptType is image
    try {
      if (currentPromptType.value === "IMAGE") {
        // If file type is supported, send prompt
        response = await imagePrompt({
          imageData: currrentFileContents.value,
          imageType: currentFileType.value!,
          prompt: currentPrompt.value,
        });
      } else {
        response = await textPrompt(
          currentPrompt.value,
          currrentFileContents.value,
        );
      }
    } catch (err) {
      useNotificationStore().addNotification({
        type: notificationMessageType.error,
        data: `Error in sending prompt`,
      });
      loading.value = false;
      return;
    }
    const reader = response.body!.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = new TextDecoder("utf-8").decode(value, { stream: true });
      promptResponse.value += "\n" + chunk ?? ("" as string);
    }
    loading.value = false;
  }
  return {
    currentShortUrl,
    loading,
    getFileType,
    changeCurrentShortUrl,
    getFile,
    currentPrompt,
    currentPromptType,
    sendPrompt,
    promptResponse,
    currentFileType,
  };
});

async function imagePrompt({
  imageData,
  imageType,
  prompt,
}: {
  imageType: string;
  imageData: string;
  prompt: string;
}) {
  try {
    const response = await fetch(`/api/ai/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageType: imageType,
        imageData: imageData,
        prompt: prompt,
      }),
    });
    return response;
  } catch (err) {
    throw err;
  }
}

async function textPrompt(prompt: string, fileContents: string) {
  try {
    const response = await fetch(`/api/ai/text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt + "\n" + fileContents),
    });
    return response;
  } catch (err) {
    throw err;
  }
}
