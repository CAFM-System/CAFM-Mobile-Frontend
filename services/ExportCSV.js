const exportTicketsToCSV = (tickets) => {
    const date = new Date(Date.now()).toISOString();

    //get only the required fields for export(remove ticket_updates)
    const ticketsExport = tickets.map(ticket => {
        const { ticket_updates, ...rest } = ticket;
        return rest;
    });

    // Convert ticket data to CSV format
    const headers = Object.keys(ticketsExport[0]).join(',');
    const rows = ticketsExport.map(ticket =>
        Object.values(ticket).map(value => {
            if (value === null || value === undefined) return '';

            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }

            return value;
        }).join(',')
    );

    const csv = [headers, ...rows].join('\n');

    // Create a Blob from the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link to download the CSV file
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tickets_export-${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default exportTicketsToCSV;