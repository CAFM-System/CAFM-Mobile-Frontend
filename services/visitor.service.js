import apiClient from "./apiclient";

const visitorService = {
  async getVisitorInfo() {
    const respone = await apiClient.get("/visitors");
    return respone;
  },
  async getVisitorInfoByResidentId() {
    const response = await apiClient.get("/visitors/my-visitors");
    return response;
  },
  async preRegisterVisitor(visitorData) {
    const response = await apiClient.post(
      "/visitors/pre-register",
      visitorData,
    );
    return response;
  },
  async onsiteRegisterVisitor(visitorData) {
    const response = await apiClient.post(
      "/visitors/onsite-register",
      visitorData,
    );
    return response;
  },
};

export default visitorService;
