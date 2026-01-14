import apiClient from "./apiclient";

const NotificationService = {
  getMyNotifications() {
    return apiClient.get("/notifications");
  },

  clearNotification(notificationId) {
    return apiClient.post(`/notifications/${notificationId}`);
  }
};

export default NotificationService;
