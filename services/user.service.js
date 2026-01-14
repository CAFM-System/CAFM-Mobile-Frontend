import apiClient from "./apiclient";

const UserSevervice = {
    async getAllTechnicians(jobType){
        const response = await apiClient.get(`/users/technicians?jobType=${jobType}`);
        return response;
    }
}
export default UserSevervice;