import apiClient from "./apiclient"

const ReportService = {

    async downloadTicketExcel(filters) {
        const response = await apiClient.post("/utility/excel",
            filters,
            { responseType: 'blob' }
        );
        return response.data;
    },

    async downloadTicketPDF(filters) {
        const response = await apiClient.post("/utility/pdf",
            filters,
            { responseType: 'blob' }
        );
        return response.data;
    }

}

export default ReportService;