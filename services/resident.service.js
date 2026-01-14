import apiClient from "./apiclient"

const ResidentService = {
    async addRatingWithFeedback (ticketId, payload) {
        const response = await apiClient.post("/ticket-reviews/"+ticketId, payload);
        return response;
    },

    async getRatingWithFeedback (ticketId) {
        const response = await apiClient.get("/ticket-reviews/"+ticketId);
        return response;
    },

    async closeTicket(ticketId, payload){
        const response = await apiClient.put("/residents/close-ticket/"+ticketId, payload);
        return response;
    },
    async reopenTicket(ticketId, payload){
        const response = await apiClient.put("/residents/reopen-ticket/"+ticketId, payload);
        return response;
    }
}

export default ResidentService;