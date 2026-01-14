import apiClient from "./apiclient";

const TechnicianService = {
    async startWork (ticketId){
        const response = await apiClient.put("/technicians/update-time/"+ticketId);
        return response;
    },

    async resolveTickets(ticketId, data){
        const response = await apiClient.put("/technicians/resolve-ticket/"+ticketId, data);
        return response;
    }
}
export default TechnicianService;


