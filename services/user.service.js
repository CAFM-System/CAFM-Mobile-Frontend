import apiClient from "./apiclient";

const UserSevervice = {
  async getAllTechnicians(jobType) {
    const response = await apiClient.get(
      `/users/technicians?jobType=${jobType}`,
    );
    return response;
  },
  async getResidents() {
    const response = await apiClient.get("/users/residents");
    return response;
  },
};
export default UserSevervice;
