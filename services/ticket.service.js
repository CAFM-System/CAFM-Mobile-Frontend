import apiClient from "./apiclient.js";

const TicketService = {
    async getTicket(){
        const response = await apiClient.get("/tickets");
        return response;
    },

    async createTicket(payload){
        const response = await apiClient.post("/tickets", payload);
        return response;
    },

    async updateStatusHistory(payload){
        const response = await apiClient.get("/progress-history/"+payload);
        return response;
    },

    async assignPriority(ticketId, priority){
        const response = await apiClient.put("/tickets/assign-priority/"+ticketId, { 
            priority 
        });
        return response;
    },
    async getTicketById(ticketId){
        const response = await apiClient.get("/tickets/"+ticketId);
        return response;
    }

}

export default TicketService;