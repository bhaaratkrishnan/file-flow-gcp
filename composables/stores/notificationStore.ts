import { defineStore } from "pinia";
import type { notificationType } from "../types/peerTypes";
import { v4 as uuid4 } from "uuid";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<notificationType[]>([]);
  const addNotification = ({ type, data }: notificationType) => {
    const id = uuid4();
    notifications.value = [{ id, type, data }, ...notifications.value];
    setTimeout(() => {
      notifications.value = notifications.value.filter((e) => {
        if (e.id === id) {
          return false;
        }
        return true;
      });
    }, 3500);
  };
  return { notifications, addNotification };
});
