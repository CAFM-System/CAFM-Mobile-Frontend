export const tickets = [
    {
        "ticketId": "TKT-001",
        "title": "Leaking Kitchen Faucet",
        "createdDate": "2025-11-14T18:50:00",
        "complaintRequest": "The kitchen faucet has been dripping continuously for two days. Water is being wasted.",
        "location": "A-101 - Kitchen",
        "name": "Nimal Perera",
        "complaintCategory": "MEP",
        "jobType": "Plumbing",
        "complaintRecievdBy": "Kasun Bandara",
        "reportedTo": "Sunil Wickramasinghe",
        "completedDate": "2025-11-16T14:30:00",
        "status": "resolved",
        "priority": "high",
        "remarks": "Faucet washer replaced. Issue resolved.",
        "csat": 5,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 14, 2025, 06:50 PM",
                "message": "Ticket created",
                "author": "Kasun Bandara"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 14, 2025, 07:15 PM",
                "message": "Assigned to Sunil Wickramasinghe",
                "author": "Kasun Bandara"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 15, 2025, 09:30 AM",
                "message": "Work started on faucet repair",
                "author": "Sunil Wickramasinghe"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 16, 2025, 02:30 PM",
                "message": "Faucet washer replaced. Issue resolved.",
                "author": "Sunil Wickramasinghe"
            }
        ]
    },
    {
        "ticketId": "TKT-002",
        "title": "AC Not Cooling",
        "createdDate": "2025-11-15T09:20:00",
        "complaintRequest": "The air conditioner in the bedroom is blowing warm air even at the lowest temperature setting.",
        "location": "B-203 - Bedroom",
        "name": "Chamari Fernando",
        "complaintCategory": "MEP",
        "jobType": "Electrical",
        "complaintRecievdBy": "Dilshan Rajapaksa",
        "reportedTo": "Rohan Gunasekara",
        "completedDate": null,
        "status": "in_progress",
        "priority": "medium",
        "remarks": "Technician assigned. Refrigerant level being checked.",
        "csat": null,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 15, 2025, 09:20 AM",
                "message": "Ticket created",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 15, 2025, 10:00 AM",
                "message": "Assigned to Rohan Gunasekara",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 15, 2025, 02:45 PM",
                "message": "Technician dispatched. Checking refrigerant levels.",
                "author": "Rohan Gunasekara"
            }
        ]
    },
    {
        "ticketId": "TKT-003",
        "title": "Flickering Corridor Light",
        "createdDate": "2025-11-13T16:10:00",
        "complaintRequest": "The corridor light keeps flickering during the night. Possibly a loose connection.",
        "location": "C-310 - Corridor",
        "name": "Amaya Jayawardena",
        "complaintCategory": "MEP",
        "jobType": "Electrical",
        "complaintRecievdBy": "Nuwan Silva",
        "reportedTo": "Rohan Gunasekara",
        "completedDate": "2025-11-14T10:15:00",
        "status": "closed",
        "priority": "low",
        "remarks": "Loose wiring fixed. Light working normally.",
        "csat": 4,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 13, 2025, 04:10 PM",
                "message": "Ticket created",
                "author": "Nuwan Silva"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 13, 2025, 05:00 PM",
                "message": "Assigned to Rohan Gunasekara",
                "author": "Nuwan Silva"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 14, 2025, 08:30 AM",
                "message": "Electrician inspecting the wiring",
                "author": "Rohan Gunasekara"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 14, 2025, 10:15 AM",
                "message": "Loose wiring fixed. Light working normally.",
                "author": "Rohan Gunasekara"
            },
            {
                "status": "closed",
                "timestamp": "Nov 14, 2025, 11:00 AM",
                "message": "Resident confirmed resolution. Ticket closed.",
                "author": "Nuwan Silva"
            }
        ]
    },
    {
        "ticketId": "TKT-004",
        "title": "Gas Leak Smell",
        "createdDate": "2025-11-14T07:45:00",
        "complaintRequest": "A strong gas smell is present inside the kitchen. This could be dangerous and requires immediate attention.",
        "location": "D-112 - Kitchen",
        "name": "Ravi Dissanayake",
        "complaintCategory": "MEP",
        "jobType": "Plumbing",
        "complaintRecievdBy": "Kasun Bandara",
        "reportedTo": "Sunil Wickramasinghe",
        "completedDate": null,
        "status": "in_progress",
        "priority": "urgent",
        "remarks": "Emergency team dispatched. Gas pipe inspection underway.",
        "csat": null,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 14, 2025, 07:45 AM",
                "message": "Emergency ticket created - Gas leak reported",
                "author": "Kasun Bandara"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 14, 2025, 07:50 AM",
                "message": "Emergency assignment to Sunil Wickramasinghe",
                "author": "Kasun Bandara"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 14, 2025, 08:15 AM",
                "message": "Emergency team on site. Gas pipe inspection underway.",
                "author": "Sunil Wickramasinghe"
            }
        ]
    },
    {
        "ticketId": "TKT-005",
        "title": "Broken Balcony Door Lock",
        "createdDate": "2025-11-10T11:30:00",
        "complaintRequest": "The lock on the balcony sliding door is broken and not closing properly.",
        "location": "A-205 - Balcony",
        "name": "Meenuka Senanayake",
        "complaintCategory": "Management",
        "jobType": "Civil",
        "complaintRecievdBy": "Dilshan Rajapaksa",
        "reportedTo": "Pradeep Samaraweera",
        "completedDate": "2025-11-12T16:00:00",
        "status": "resolved",
        "priority": "medium",
        "remarks": "Lock mechanism replaced. Door functioning properly.",
        "csat": 5,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 10, 2025, 11:30 AM",
                "message": "Ticket created",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 10, 2025, 02:00 PM",
                "message": "Assigned to Pradeep Samaraweera",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 11, 2025, 10:00 AM",
                "message": "Lock inspection completed. Ordering replacement parts.",
                "author": "Pradeep Samaraweera"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 12, 2025, 04:00 PM",
                "message": "Lock mechanism replaced. Door functioning properly.",
                "author": "Pradeep Samaraweera"
            }
        ]
    },
    {
        "ticketId": "TKT-006",
        "title": "Low Water Pressure",
        "createdDate": "2025-11-16T08:15:00",
        "complaintRequest": "Water pressure is very low in the bathroom. Takes a long time to fill a bucket.",
        "location": "E-408 - Bathroom",
        "name": "Tharaka Wijesinghe",
        "complaintCategory": "MEP",
        "jobType": "Plumbing",
        "complaintRecievdBy": "Nuwan Silva",
        "reportedTo": "Sunil Wickramasinghe",
        "completedDate": null,
        "status": "open",
        "priority": "medium",
        "remarks": "Awaiting plumber availability.",
        "csat": null,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 16, 2025, 08:15 AM",
                "message": "Ticket created - Low water pressure complaint",
                "author": "Nuwan Silva"
            }
        ]
    },
    {
        "ticketId": "TKT-007",
        "title": "Loose Door Handle",
        "createdDate": "2025-11-11T14:20:00",
        "complaintRequest": "The main entrance door handle is loose and needs tightening.",
        "location": "B-104 - Main Door",
        "name": "Sanjay Gunaratne",
        "complaintCategory": "Management",
        "jobType": "Civil",
        "complaintRecievdBy": "Kasun Bandara",
        "reportedTo": "Pradeep Samaraweera",
        "completedDate": "2025-11-13T09:45:00",
        "status": "closed",
        "priority": "low",
        "remarks": "Door handle tightened and secured.",
        "csat": 4,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 11, 2025, 02:20 PM",
                "message": "Ticket created",
                "author": "Kasun Bandara"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 11, 2025, 03:00 PM",
                "message": "Assigned to Pradeep Samaraweera",
                "author": "Kasun Bandara"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 12, 2025, 09:00 AM",
                "message": "Technician scheduled for handle repair",
                "author": "Pradeep Samaraweera"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 13, 2025, 09:45 AM",
                "message": "Door handle tightened and secured.",
                "author": "Pradeep Samaraweera"
            },
            {
                "status": "closed",
                "timestamp": "Nov 13, 2025, 10:30 AM",
                "message": "Work verified and ticket closed.",
                "author": "Kasun Bandara"
            }
        ]
    },
    {
        "ticketId": "TKT-008",
        "title": "Noisy Ceiling Fan",
        "createdDate": "2025-11-15T17:30:00",
        "complaintRequest": "Ceiling fan making loud noise and wobbling. Might fall down if not fixed soon.",
        "location": "C-207 - Living Room",
        "name": "Priyanka Mendis",
        "complaintCategory": "MEP",
        "jobType": "Electrical",
        "complaintRecievdBy": "Dilshan Rajapaksa",
        "reportedTo": "Rohan Gunasekara",
        "completedDate": "2025-11-17T11:20:00",
        "status": "resolved",
        "priority": "high",
        "remarks": "Fan blades balanced and mounting bracket tightened.",
        "csat": 3,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 15, 2025, 05:30 PM",
                "message": "Ticket created - Ceiling fan safety concern",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 15, 2025, 06:00 PM",
                "message": "Urgent assignment to Rohan Gunasekara",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 16, 2025, 09:00 AM",
                "message": "Electrician inspecting ceiling fan",
                "author": "Rohan Gunasekara"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 17, 2025, 11:20 AM",
                "message": "Fan blades balanced and mounting bracket tightened.",
                "author": "Rohan Gunasekara"
            }
        ]
    },
    {
        "ticketId": "TKT-009",
        "title": "Toilet Flush Not Working",
        "createdDate": "2025-11-12T10:00:00",
        "complaintRequest": "Toilet flush not working properly. Water keeps running continuously.",
        "location": "D-315 - Bathroom",
        "name": "Upul Rathnayake",
        "complaintCategory": "MEP",
        "jobType": "Plumbing",
        "complaintRecievdBy": "Nuwan Silva",
        "reportedTo": "Sunil Wickramasinghe",
        "completedDate": "2025-11-14T15:10:00",
        "status": "closed",
        "priority": "high",
        "remarks": "Flush valve replaced. Working normally now.",
        "csat": 5,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 12, 2025, 10:00 AM",
                "message": "Ticket created",
                "author": "Nuwan Silva"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 12, 2025, 11:00 AM",
                "message": "Assigned to Sunil Wickramasinghe",
                "author": "Nuwan Silva"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 13, 2025, 09:00 AM",
                "message": "Plumber diagnosing flush mechanism",
                "author": "Sunil Wickramasinghe"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 14, 2025, 03:10 PM",
                "message": "Flush valve replaced. Working normally now.",
                "author": "Sunil Wickramasinghe"
            },
            {
                "status": "closed",
                "timestamp": "Nov 14, 2025, 04:00 PM",
                "message": "Resident satisfied. Ticket closed.",
                "author": "Nuwan Silva"
            }
        ]
    },
    {
        "ticketId": "TKT-010",
        "title": "Peeling Wall Paint",
        "createdDate": "2025-11-16T13:45:00",
        "complaintRequest": "Paint peeling off from the bedroom walls due to dampness.",
        "location": "E-501 - Bedroom",
        "name": "Sanduni Herath",
        "complaintCategory": "Management",
        "jobType": "Civil",
        "complaintRecievdBy": "Kasun Bandara",
        "reportedTo": "Pradeep Samaraweera",
        "completedDate": null,
        "status": "assigned",
        "priority": "low",
        "remarks": "Inspection scheduled for next week.",
        "csat": null,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 16, 2025, 01:45 PM",
                "message": "Ticket created",
                "author": "Kasun Bandara"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 16, 2025, 03:00 PM",
                "message": "Assigned to Pradeep Samaraweera. Inspection scheduled.",
                "author": "Kasun Bandara"
            }
        ]
    },
    {
        "ticketId": "TKT-011",
        "title": "Kitchen Exhaust Fan Failure",
        "createdDate": "2025-11-09T07:30:00",
        "complaintRequest": "Kitchen exhaust fan not working. Smoke and smell not getting ventilated.",
        "location": "A-303 - Kitchen",
        "name": "Mahesh Kumara",
        "complaintCategory": "MEP",
        "jobType": "Electrical",
        "complaintRecievdBy": "Dilshan Rajapaksa",
        "reportedTo": "Rohan Gunasekara",
        "completedDate": "2025-11-11T12:00:00",
        "status": "resolved",
        "priority": "medium",
        "remarks": "Motor replaced. Fan working efficiently.",
        "csat": 5,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 09, 2025, 07:30 AM",
                "message": "Ticket created",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 09, 2025, 09:00 AM",
                "message": "Assigned to Rohan Gunasekara",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 10, 2025, 10:00 AM",
                "message": "Motor diagnosis completed. Ordering replacement.",
                "author": "Rohan Gunasekara"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 11, 2025, 12:00 PM",
                "message": "Motor replaced. Fan working efficiently.",
                "author": "Rohan Gunasekara"
            }
        ]
    },
    {
        "ticketId": "TKT-012",
        "title": "Cracked Window Glass",
        "createdDate": "2025-11-17T09:00:00",
        "complaintRequest": "Window glass cracked. Needs replacement before it breaks completely.",
        "location": "B-406 - Bedroom",
        "name": "Achini Perera",
        "complaintCategory": "Management",
        "jobType": "Civil",
        "complaintRecievdBy": "Nuwan Silva",
        "reportedTo": "Pradeep Samaraweera",
        "completedDate": null,
        "status": "open",
        "priority": "high",
        "remarks": "Glass measurements taken. Ordering replacement.",
        "csat": null,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 17, 2025, 09:00 AM",
                "message": "Ticket created - Cracked window glass safety concern",
                "author": "Nuwan Silva"
            }
        ]
    },
    {
        "ticketId": "TKT-013",
        "title": "Water Heater Not Working",
        "createdDate": "2025-11-13T12:40:00",
        "complaintRequest": "Water heater not heating water. Family having to use cold water for bathing.",
        "location": "C-109 - Bathroom",
        "name": "Lakshan Wijemanne",
        "complaintCategory": "MEP",
        "jobType": "Electrical",
        "complaintRecievdBy": "Kasun Bandara",
        "reportedTo": "Rohan Gunasekara",
        "completedDate": "2025-11-15T14:30:00",
        "status": "closed",
        "priority": "high",
        "remarks": "Heating element replaced. Working properly.",
        "csat": 4,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 13, 2025, 12:40 PM",
                "message": "Ticket created",
                "author": "Kasun Bandara"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 13, 2025, 02:00 PM",
                "message": "Assigned to Rohan Gunasekara",
                "author": "Kasun Bandara"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 14, 2025, 09:30 AM",
                "message": "Electrician testing heating element",
                "author": "Rohan Gunasekara"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 15, 2025, 02:30 PM",
                "message": "Heating element replaced. Working properly.",
                "author": "Rohan Gunasekara"
            },
            {
                "status": "closed",
                "timestamp": "Nov 15, 2025, 03:15 PM",
                "message": "Verified by resident. Ticket closed.",
                "author": "Kasun Bandara"
            }
        ]
    },
    {
        "ticketId": "TKT-014",
        "title": "Blocked Drainage Pipe",
        "createdDate": "2025-11-08T15:20:00",
        "complaintRequest": "Drainage pipe blocked in the kitchen sink. Water not draining at all.",
        "location": "D-208 - Kitchen",
        "name": "Ruwan Sampath",
        "complaintCategory": "MEP",
        "jobType": "Plumbing",
        "complaintRecievdBy": "Dilshan Rajapaksa",
        "reportedTo": "Sunil Wickramasinghe",
        "completedDate": "2025-11-10T10:15:00",
        "status": "resolved",
        "priority": "high",
        "remarks": "Pipe cleaned and blockage removed. Draining properly.",
        "csat": 5,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 08, 2025, 03:20 PM",
                "message": "Ticket created",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 08, 2025, 04:00 PM",
                "message": "Assigned to Sunil Wickramasinghe",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 09, 2025, 09:00 AM",
                "message": "Plumber working on drainage blockage",
                "author": "Sunil Wickramasinghe"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 10, 2025, 10:15 AM",
                "message": "Pipe cleaned and blockage removed. Draining properly.",
                "author": "Sunil Wickramasinghe"
            }
        ]
    },
    {
        "ticketId": "TKT-015",
        "title": "Fire Alarm Beeping",
        "createdDate": "2025-11-17T16:00:00",
        "complaintRequest": "Fire alarm beeping continuously. Battery might need replacement.",
        "location": "E-302 - Living Room",
        "name": "Nimali Rodrigo",
        "complaintCategory": "MEP",
        "jobType": "Electrical",
        "complaintRecievdBy": "Nuwan Silva",
        "reportedTo": "Sunil Wickramasinghe",
        "completedDate": null,
        "status": "assigned",
        "priority": "medium",
        "remarks": "Technician will visit tomorrow morning.",
        "csat": null,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 17, 2025, 04:00 PM",
                "message": "Ticket created",
                "author": "Nuwan Silva"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 17, 2025, 04:30 PM",
                "message": "Assigned to Sunil Wickramasinghe. Scheduled for tomorrow.",
                "author": "Nuwan Silva"
            }
        ]
    },
    {
        "ticketId": "TKT-016",
        "title": "Garbage Collection Issue",
        "createdDate": "2025-11-10T11:00:00",
        "complaintRequest": "Common area garbage not being collected regularly. Bad smell spreading.",
        "location": "Ground Floor - Common Area",
        "name": "Kamal Jayasuriya",
        "complaintCategory": "Management",
        "jobType": "Housekeeping",
        "complaintRecievdBy": "Dilshan Rajapaksa",
        "reportedTo": "Pradeep Samaraweera",
        "completedDate": "2025-11-11T08:30:00",
        "status": "closed",
        "priority": "medium",
        "remarks": "Cleaning schedule revised. Issue resolved.",
        "csat": 3,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 10, 2025, 11:00 AM",
                "message": "Ticket created - Garbage collection complaint",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 10, 2025, 12:00 PM",
                "message": "Assigned to Pradeep Samaraweera",
                "author": "Dilshan Rajapaksa"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 10, 2025, 03:00 PM",
                "message": "Reviewing cleaning schedule with housekeeping team",
                "author": "Pradeep Samaraweera"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 11, 2025, 08:30 AM",
                "message": "Cleaning schedule revised. Issue resolved.",
                "author": "Pradeep Samaraweera"
            },
            {
                "status": "closed",
                "timestamp": "Nov 11, 2025, 09:00 AM",
                "message": "Ticket closed after verification.",
                "author": "Dilshan Rajapaksa"
            }
        ]
    },
    {
        "ticketId": "TKT-017",
        "title": "Elevator Malfunction",
        "createdDate": "2025-11-14T13:15:00",
        "complaintRequest": "Elevator making strange sounds and jerking during operation.",
        "location": "Tower B - Elevator",
        "name": "Hasini Wijesekara",
        "complaintCategory": "MEP",
        "jobType": "Mechanical",
        "complaintRecievdBy": "Kasun Bandara",
        "reportedTo": "Rohan Gunasekara",
        "completedDate": null,
        "status": "in_progress",
        "priority": "urgent",
        "remarks": "Maintenance company contacted. Inspection scheduled.",
        "csat": null,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 14, 2025, 01:15 PM",
                "message": "Urgent ticket created - Elevator safety concern",
                "author": "Kasun Bandara"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 14, 2025, 01:30 PM",
                "message": "Emergency assignment to Rohan Gunasekara",
                "author": "Kasun Bandara"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 14, 2025, 02:00 PM",
                "message": "Elevator maintenance company contacted. Inspection scheduled.",
                "author": "Rohan Gunasekara"
            }
        ]
    },
    {
        "ticketId": "TKT-018",
        "title": "Parking Barrier Not Working",
        "createdDate": "2025-11-12T16:45:00",
        "complaintRequest": "Parking barrier not opening with access card. Residents unable to enter.",
        "location": "Basement Parking - Entry",
        "name": "Thisara Gamage",
        "complaintCategory": "Management",
        "jobType": "Electrical",
        "complaintRecievdBy": "Nuwan Silva",
        "reportedTo": "Pradeep Samaraweera",
        "completedDate": "2025-11-13T10:30:00",
        "status": "resolved",
        "priority": "high",
        "remarks": "Card reader replaced. System working properly.",
        "csat": 4,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 12, 2025, 04:45 PM",
                "message": "Ticket created - Parking access issue",
                "author": "Nuwan Silva"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 12, 2025, 05:00 PM",
                "message": "Assigned to Pradeep Samaraweera",
                "author": "Nuwan Silva"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 13, 2025, 08:00 AM",
                "message": "Technician diagnosing card reader malfunction",
                "author": "Pradeep Samaraweera"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 13, 2025, 10:30 AM",
                "message": "Card reader replaced. System working properly.",
                "author": "Pradeep Samaraweera"
            }
        ]
    },
    {
        "ticketId": "TKT-019",
        "title": "Ceiling Cracks",
        "createdDate": "2025-11-16T10:20:00",
        "complaintRequest": "Cracks appearing on the living room ceiling. Looks serious.",
        "location": "F-205 - Living Room",
        "name": "Buddhika Amarasinghe",
        "complaintCategory": "Management",
        "jobType": "Civil",
        "complaintRecievdBy": "Dilshan Rajapaksa",
        "reportedTo": "Pradeep Samaraweera",
        "completedDate": null,
        "status": "open",
        "priority": "urgent",
        "remarks": "Structural engineer consultation required.",
        "csat": null,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 16, 2025, 10:20 AM",
                "message": "Urgent ticket created - Structural concern with ceiling cracks",
                "author": "Dilshan Rajapaksa"
            }
        ]
    },
    {
        "ticketId": "TKT-020",
        "title": "Internet Connection Problems",
        "createdDate": "2025-11-15T14:00:00",
        "complaintRequest": "Internet connection dropping frequently. Unable to work from home.",
        "location": "C-412 - Study Room",
        "name": "Anuradha Gunasekara",
        "complaintCategory": "MEP",
        "jobType": "Electrical",
        "complaintRecievdBy": "Kasun Bandara",
        "reportedTo": "Rohan Gunasekara",
        "completedDate": "2025-11-16T16:45:00",
        "status": "closed",
        "priority": "medium",
        "remarks": "Network cable replaced. Connection stable now.",
        "csat": 5,
        "ticket_updates": [
            {
                "status": "open",
                "timestamp": "Nov 15, 2025, 02:00 PM",
                "message": "Ticket created",
                "author": "Kasun Bandara"
            },
            {
                "status": "assigned",
                "timestamp": "Nov 15, 2025, 03:00 PM",
                "message": "Assigned to Rohan Gunasekara",
                "author": "Kasun Bandara"
            },
            {
                "status": "in_progress",
                "timestamp": "Nov 16, 2025, 09:00 AM",
                "message": "Technician testing network connection",
                "author": "Rohan Gunasekara"
            },
            {
                "status": "resolved",
                "timestamp": "Nov 16, 2025, 04:45 PM",
                "message": "Network cable replaced. Connection stable now.",
                "author": "Rohan Gunasekara"
            },
            {
                "status": "closed",
                "timestamp": "Nov 16, 2025, 05:30 PM",
                "message": "Resident confirmed stable connection. Ticket closed.",
                "author": "Kasun Bandara"
            }
        ]
    }
];