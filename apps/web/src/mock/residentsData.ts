/**
 * HAVEN — Elderly Care & Facility Management System
 * Comprehensive Resident Management Mock Dataset (58 Canonical Indian Residents)
 *
 * Fully reconciled with:
 * - Administrator Command Centre occupancy: exactly 58 occupied beds across 4 wings
 * - 2 maintenance beds (Room 108-B, Room 304-A) + 4 available beds = 64 total beds
 * - Canonical incidents: INC-2026-088 (Raghavendra Kulkarni), INC-2026-087 (Vikram Hegde), INC-2026-086 (Nandini Iyer)
 * - Diverse Indian identities across residents, staff, doctors, caregivers and families
 * - Timeline: Tuesday, November 10, 2026
 */

import type { FullResident } from '../types/resident.ts';

export const MOCK_FULL_RESIDENTS: FullResident[] = [
  {
    "id": "RES-044",
    "fullName": "Raghavendra Kulkarni",
    "preferredName": "Raghav",
    "dateOfBirth": "March 14, 1935",
    "age": 91,
    "gender": "Male",
    "status": "in-clinic",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 108-A",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "August 12, 2023"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatric Physician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "visitingSpecialist": {
        "name": "Dr. Arjun Rao, MD",
        "specialty": "Cardiovascular Consultant",
        "hospital": "Manipal Hospital, Bengaluru"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Clinical Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Skilled Nursing Cluster A",
      "physicalTherapist": "Kavya Reddy, DPT"
    },
    "emergencyContacts": [
      {
        "name": "Manoj Kulkarni",
        "relationship": "Son",
        "phone": "+91 98201 34567",
        "email": "manoj.kulkarni@haven-care.in.example",
        "address": "442 Deccan Enclave, 12th Main, Indiranagar, Bengaluru, Karnataka 560038",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "High Fall Risk — Unassisted transfer slip at 08:45 AM today (INC-2026-088). Requires 2-person assist.",
      "Allergy Alert — Severe Latex & Aspirin intolerance on file.",
      "DNR Directive Active — Documented Resuscitation Preferences on file.",
      "Dietary — Pureed diet, thickened nectar liquids (Level 2)."
    ],
    "mobilityStatus": "Wheelchair / 2-person transfer assist required",
    "dietaryProtocol": "Dysphagia Diet Level 2 (Mechanically Altered, Thickened Liquids)",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Requires 2-person assist with standing transfer belt and wheelchair.",
      "fallRiskLevel": "High",
      "transferAssistance": "2-person transfer assist; bed alarm active.",
      "nutritionDietary": "Pureed texture meals, nectar-thickened water and herbal tea.",
      "hydrationGoal": "1,500 mL daily recorded on fluid balance log.",
      "personalCareHygiene": "Total assist with morning bathing, grooming and dressing.",
      "bathingSchedule": "Tuesdays and Fridays (Morning round)",
      "continenceCare": "Scheduled toileting every 2 hours with standby assistance.",
      "dailyRoutineInstructions": "Keep walker within direct reach. Ensure call pendant is around neck at all times.",
      "sensoryAids": [
        "Reading spectacles",
        "Bedside motion sensor"
      ],
      "caregiverActionChecklist": [
        "Confirm bed position in lowest setting with floor mat",
        "Verify thickener consistency prior to serving liquids",
        "Record vitals round at 08:00 and 14:00"
      ],
      "nextCarePlanReviewDate": "November 28, 2026"
    },
    "allergies": [
      {
        "allergen": "Latex",
        "severity": "severe",
        "reaction": "Contact dermatitis and acute bronchospasm",
        "diagnosedDate": "June 2012"
      },
      {
        "allergen": "Aspirin (ASA)",
        "severity": "moderate",
        "reaction": "Gastrointestinal bleeding and severe dyspepsia",
        "diagnosedDate": "November 2018"
      }
    ],
    "conditions": [
      {
        "condition": "Osteoarthritis of Hip and Knee",
        "icdCode": "M16.1",
        "diagnosedDate": "March 2015",
        "status": "chronic",
        "notes": "Significant bilateral joint degradation; limited weight-bearing tolerance."
      },
      {
        "condition": "Essential Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "September 2010",
        "status": "managed",
        "notes": "Maintained on Metoprolol; morning vitals recorded 138/82."
      },
      {
        "condition": "Mild Vascular Cognitive Impairment",
        "icdCode": "F01.50",
        "diagnosedDate": "January 2024",
        "status": "monitoring",
        "notes": "Occasional short-term memory lapses; alert and oriented x2."
      }
    ],
    "clinicalNotes": [
      {
        "id": "CN-881",
        "author": "Deepak Gowda, NP",
        "authorRole": "Clinical Nurse Practitioner",
        "date": "Today, 08:50 AM",
        "type": "Fall Incident Review",
        "summary": "Resident experienced an unassisted transfer slip from bedside armchair to bathroom. Slipped on low rug. Vitals stable immediately post-fall (BP 138/82, HR 74). Ice compress applied to left knee as precaution.",
        "recommendations": "Keep resident in clinic recovery room until on-call physician Dr. Anita Mehta signs off. Bedside walker reminder signage installed."
      }
    ],
    "medications": [
      {
        "id": "MED-4401",
        "name": "Metoprolol Tartrate",
        "strength": "25mg",
        "frequency": "Twice daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "August 15, 2024",
        "timing": [
          "08:00",
          "20:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with food. Monitor resting pulse prior to dose.",
        "pharmacyBatch": "MTP-2026-X1"
      },
      {
        "id": "MED-4402",
        "name": "Acetaminophen (Extended)",
        "strength": "650mg",
        "frequency": "Every 8 hours PRN",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "September 10, 2025",
        "timing": [
          "08:00",
          "16:00",
          "00:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "For osteoarthritic joint pain. Do not exceed 3,000mg/day.",
        "pharmacyBatch": "TYL-992-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-901",
        "date": "Today, Nov 10, 2026",
        "time": "08:45 AM",
        "location": "Clinic Examination Room B",
        "status": "clinic",
        "verifiedBy": "Deepak Gowda, NP",
        "notes": "Post-incident vitals and clinical monitoring following morning transfer fall."
      }
    ],
    "visitorLogs": [
      {
        "id": "VIS-401",
        "visitorName": "Manoj Kulkarni",
        "relationship": "Son",
        "date": "Sunday, Nov 8, 2026",
        "checkInTime": "14:15 PM",
        "checkOutTime": "16:45 PM",
        "badgeNumber": "V-8821",
        "escortedBy": "Deepak Gowda, NP"
      }
    ],
    "documents": [
      {
        "id": "DOC-101",
        "title": "Master Skilled Nursing Residency Agreement",
        "category": "Agreement",
        "uploadDate": "Aug 12, 2023",
        "fileSize": "2.4 MB PDF",
        "signedBy": "Manoj Kulkarni (POA) & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-2023-044"
      },
      {
        "id": "DOC-102",
        "title": "Advance Care Plan and Resuscitation Directive (DNR / Comfort Care)",
        "category": "Directives",
        "uploadDate": "Aug 14, 2023",
        "fileSize": "1.1 MB PDF",
        "signedBy": "Dr. Anita Mehta, MD",
        "status": "verified",
        "referenceNumber": "ACP-IN-8823"
      }
    ],
    "incidents": [
      {
        "id": "INC-001",
        "reference": "INC-2026-088",
        "date": "Today, 08:45 AM",
        "category": "Fall / Slip",
        "severity": "high",
        "status": "clinical_review",
        "reporter": "Deepak Gowda, NP",
        "summary": "Unassisted transfer from armchair to bathroom. Slipped on low rug. Vitals stable; awaiting Dr. Mehta clinical review."
      }
    ],
    "transferHistory": [
      {
        "id": "TR-01",
        "date": "Oct 14, 2024",
        "from": "Garden Terrace (Room 214)",
        "to": "Orchard Meadow (Room 108-A)",
        "reason": "Care level escalation to Skilled Nursing following mobility decline.",
        "authorizedBy": "Devika Ramanathan (Facility Director)"
      }
    ]
  },
  {
    "id": "RES-041",
    "fullName": "Ananya Sharma",
    "preferredName": "Ananya",
    "dateOfBirth": "July 22, 1942",
    "age": 84,
    "gender": "Female",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 204-B",
      "bed": "Bed 2",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "April 04, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatric Physician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "visitingSpecialist": {
        "name": "Dr. Arjun Rao, MD",
        "specialty": "Visiting Cardiologist",
        "hospital": "Manipal Hospital, Bengaluru"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Day Shift Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Team 2"
    },
    "emergencyContacts": [
      {
        "name": "Rajesh Sharma",
        "relationship": "Son",
        "phone": "+91 98860 98765",
        "email": "rajesh.sharma@haven-care.in.example",
        "address": "814 Gulmohar Marg, Bandra West, Mumbai, Maharashtra 400050",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Cardio Adherence Critical — Lisinopril 10mg scheduled for 10:00 AM (30m overdue review).",
      "Allergy Alert — Penicillin & Strawberries.",
      "Dietary — Low-sodium cardiac diet (<2g sodium daily)."
    ],
    "mobilityStatus": "Ambulatory with rolling walker; independent transfer",
    "dietaryProtocol": "Cardiac Low Sodium Diet (<2g daily)",
    "dnrStatus": false,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Uses rolling walker independently; standby cueing on stairs.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent transfer with grab bars.",
      "nutritionDietary": "Low sodium, heart-healthy diabetic diet.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Minimal assist with shower setup; independent grooming.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Independent continence care.",
      "dailyRoutineInstructions": "Check blood pressure daily prior to morning Lisinopril.",
      "sensoryAids": [
        "Corrective glasses"
      ],
      "caregiverActionChecklist": [
        "Check resting BP before 10:00 AM medication round",
        "Inspect ankles for dependent edema during evening tuck-in"
      ],
      "nextCarePlanReviewDate": "December 15, 2026"
    },
    "allergies": [
      {
        "allergen": "Penicillin",
        "severity": "severe",
        "reaction": "Hives, facial angioedema and throat tightness",
        "diagnosedDate": "May 1974"
      },
      {
        "allergen": "Strawberries",
        "severity": "mild",
        "reaction": "Localized perioral rash",
        "diagnosedDate": "August 1990"
      }
    ],
    "conditions": [
      {
        "condition": "Congestive Heart Failure (NYHA Class II)",
        "icdCode": "I50.22",
        "diagnosedDate": "November 2021",
        "status": "managed",
        "notes": "Under active cardiology review with Dr. Arjun Rao."
      },
      {
        "condition": "Type 2 Diabetes Mellitus",
        "icdCode": "E11.9",
        "diagnosedDate": "February 2016",
        "status": "managed",
        "notes": "Maintained on Metformin 500mg ER with evening meal."
      }
    ],
    "clinicalNotes": [
      {
        "id": "CN-712",
        "author": "Dr. Arjun Rao, MD",
        "authorRole": "Visiting Cardiologist",
        "date": "Nov 02, 2026",
        "type": "Geriatric Assessment",
        "summary": "Outpatient cardiology consult. Ejection fraction 48%. Peripheral edema minimal (+1 at ankles). Lisinopril dosage stable at 10mg PO daily.",
        "recommendations": "Continue daily weight checks. Outpatient echocardiogram scheduled for December."
      }
    ],
    "medications": [
      {
        "id": "MED-4101",
        "name": "Lisinopril",
        "strength": "10mg",
        "frequency": "Once daily (Morning)",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Arjun Rao, MD",
        "prescribedDate": "March 14, 2024",
        "timing": [
          "10:00"
        ],
        "status": "active",
        "todayAdherence": "overdue",
        "instructions": "Check BP prior to dose; hold if systolic < 100.",
        "pharmacyBatch": "LIS-884-A"
      },
      {
        "id": "MED-4102",
        "name": "Metformin Hydrochloride ER",
        "strength": "500mg",
        "frequency": "Once daily (Evening)",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "April 10, 2024",
        "timing": [
          "18:00"
        ],
        "status": "active",
        "todayAdherence": "pending",
        "instructions": "Take with evening meal.",
        "pharmacyBatch": "MTF-2026-B4"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-811",
        "date": "Today, Nov 10, 2026",
        "time": "10:15 AM",
        "location": "Garden Terrace Library Lounge",
        "status": "present",
        "verifiedBy": "Priya Shetty, RN",
        "notes": "Resident reading morning newspaper; BP checked 126/78."
      }
    ],
    "visitorLogs": [
      {
        "id": "VIS-311",
        "visitorName": "Rajesh Sharma",
        "relationship": "Son",
        "date": "Saturday, Nov 7, 2026",
        "checkInTime": "10:00 AM",
        "checkOutTime": "12:30 PM",
        "badgeNumber": "V-8802",
        "escortedBy": "Priya Shetty, RN"
      }
    ],
    "documents": [
      {
        "id": "DOC-041",
        "title": "Assisted Living Residency Agreement",
        "category": "Agreement",
        "uploadDate": "Apr 04, 2024",
        "fileSize": "1.9 MB PDF",
        "signedBy": "Ananya Sharma & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-2024-041"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-042",
    "fullName": "Vikram Hegde",
    "preferredName": "Vikram",
    "dateOfBirth": "December 02, 1936",
    "age": 89,
    "gender": "Male",
    "status": "resting",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 112",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "January 18, 2025"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatric Physician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Assistant Supervisor",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Memory Care Specialist Pod"
    },
    "emergencyContacts": [
      {
        "name": "Kavitha Hegde",
        "relationship": "Daughter",
        "phone": "+91 94480 54321",
        "email": "kavitha.hegde@haven-care.in.example",
        "address": "522 7th Cross, Malleshwaram, Bengaluru, Karnataka 560003",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "WhatsApp"
      }
    ],
    "alerts": [
      "Sundowning & Wandering Risk — Requires secured memory pavilion exit monitoring.",
      "Allergy Alert — Sulfa drugs (Bactrim/Septra).",
      "Sensory Routine — Respond to anxiety with chamomile tea and acoustic melodies."
    ],
    "mobilityStatus": "Ambulatory with standby supervision; uses cane outdoors",
    "dietaryProtocol": "Regular consistency, finger foods preferred during restless periods",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Ambulatory with 1-person escort in communal areas.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Standby cueing.",
      "nutritionDietary": "Nutritious soft foods, high calorie snacks between meals.",
      "hydrationGoal": "1,600 mL daily; offers fruit-infused water.",
      "personalCareHygiene": "Guided assistance with personal hygiene.",
      "bathingSchedule": "Wednesdays and Saturdays",
      "continenceCare": "Routine bathroom reminders every 2 hours.",
      "dailyRoutineInstructions": "Transition to quiet sensory room at 17:00 to reduce sundowning agitation.",
      "sensoryAids": [
        "Calming music player",
        "Aromatherapy diffuser"
      ],
      "caregiverActionChecklist": [
        "Ensure wandering monitor wristband is charged and active",
        "Offer herbal chamomile tea at 16:30"
      ],
      "nextCarePlanReviewDate": "January 10, 2027"
    },
    "allergies": [
      {
        "allergen": "Sulfonamides (Sulfa)",
        "severity": "moderate",
        "reaction": "Maculopapular drug eruption and fever",
        "diagnosedDate": "October 2005"
      }
    ],
    "conditions": [
      {
        "condition": "Alzheimer’s Dementia (Moderate Stage)",
        "icdCode": "G30.1",
        "diagnosedDate": "June 2022",
        "status": "chronic",
        "notes": "Disorientation to time and place; calm in sensory garden."
      }
    ],
    "clinicalNotes": [
      {
        "id": "CN-504",
        "author": "Rahul Patil, LPN",
        "authorRole": "LPN · Assistant Supervisor",
        "date": "Yesterday, 19:45 PM",
        "type": "Nursing Evaluation",
        "summary": "Sundowning agitation during dinner seating in communal pavilion (INC-2026-087). Guided to sensory garden; calmed within 15 minutes with herbal chamomile tea and low acoustic music. No injury.",
        "recommendations": "Transition resident to sensory lounge 30 minutes prior to evening dining."
      }
    ],
    "medications": [
      {
        "id": "MED-4201",
        "name": "Donepezil Hydrochloride",
        "strength": "10mg",
        "frequency": "Once daily at bedtime",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "January 20, 2025",
        "timing": [
          "21:00"
        ],
        "status": "active",
        "todayAdherence": "pending",
        "instructions": "Administer before sleep.",
        "pharmacyBatch": "DNP-114-A"
      },
      {
        "id": "MED-4202",
        "name": "Carboxymethylcellulose 0.5% (Artificial Tears)",
        "strength": "1 drop",
        "frequency": "Twice daily",
        "route": "Ophthalmic",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "March 11, 2025",
        "timing": [
          "10:15",
          "18:00"
        ],
        "status": "active",
        "todayAdherence": "refused",
        "instructions": "Resident declined morning dose citing slight stinging. Nurse Rahul verified clear sclera.",
        "pharmacyBatch": "EYE-772-D"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-701",
        "date": "Today, Nov 10, 2026",
        "time": "10:30 AM",
        "location": "Sunrise Sensory Garden",
        "status": "activity",
        "verifiedBy": "Rahul Patil, LPN",
        "notes": "Engaged in tactile floral sensory therapy; calm and communicative."
      }
    ],
    "visitorLogs": [
      {
        "id": "VIS-201",
        "visitorName": "Kavitha Hegde",
        "relationship": "Daughter",
        "date": "Nov 06, 2026",
        "checkInTime": "15:00 PM",
        "checkOutTime": "17:00 PM",
        "badgeNumber": "V-8750",
        "escortedBy": "Sneha Joshi, RN"
      }
    ],
    "documents": [
      {
        "id": "DOC-042",
        "title": "Memory Care Admission & Secured Unit Consent",
        "category": "Agreement",
        "uploadDate": "Jan 18, 2025",
        "fileSize": "2.1 MB PDF",
        "signedBy": "Kavitha Hegde (POA)",
        "status": "verified",
        "referenceNumber": "AGR-2025-042"
      }
    ],
    "incidents": [
      {
        "id": "INC-002",
        "reference": "INC-2026-087",
        "date": "Yesterday, 19:30 PM",
        "category": "Behavioural",
        "severity": "medium",
        "status": "monitoring",
        "reporter": "Rahul Patil, LPN",
        "summary": "Sundowning agitation during dinner seating in communal pavilion. Sensory de-escalation successful."
      }
    ],
    "transferHistory": []
  },
  {
    "id": "RES-043",
    "fullName": "Nandini Iyer",
    "preferredName": "Nandini",
    "dateOfBirth": "May 18, 1947",
    "age": 79,
    "gender": "Female",
    "status": "with-family",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 301",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "September 01, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98401 23456",
        "license": "KMC-77123"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Independent Living Coordinator",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Concierge Support"
    },
    "emergencyContacts": [
      {
        "name": "Sundaram Iyer",
        "relationship": "Spouse",
        "phone": "+91 98450 01017",
        "email": "sundaram.iyer@haven-care.in.example",
        "address": "Suite 301, Highland Haven, HAVEN Anandam Care Residence, Bengaluru",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Call Cord Maintenance — Bathroom call bell cord had intermittent connectivity (INC-2026-086); work order WO-8812 active.",
      "Active Family Pass — Off-site with family for afternoon lunch (expected return 16:00)."
    ],
    "mobilityStatus": "Fully independent ambulatory",
    "dietaryProtocol": "Standard healthy adult vegetarian diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Fully independent; walks in gardens daily.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent.",
      "nutritionDietary": "Traditional South Indian vegetarian diet.",
      "hydrationGoal": "2,000 mL daily.",
      "personalCareHygiene": "Fully independent.",
      "bathingSchedule": "Daily independent",
      "continenceCare": "Independent.",
      "dailyRoutineInstructions": "Active in book club and afternoon tea circles.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Weekly concierge check-in on Mondays",
        "Check bathroom call cord replacement status"
      ],
      "nextCarePlanReviewDate": "March 01, 2027"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Osteopenia",
        "icdCode": "M85.8",
        "diagnosedDate": "August 2023",
        "status": "managed",
        "notes": "Takes Vitamin D supplements; regular morning walks."
      }
    ],
    "clinicalNotes": [
      {
        "id": "CN-312",
        "author": "Sneha Joshi, RN",
        "authorRole": "RN · Independent Living Coordinator",
        "date": "Nov 08, 2026",
        "type": "Nursing Evaluation",
        "summary": "Overhead bathroom call cord showed intermittent connectivity (INC-2026-086). Backup wall push-button verified fully functional. Work order WO-8812 assigned to facilities electrician.",
        "recommendations": "Follow up with facilities team upon completion."
      }
    ],
    "medications": [
      {
        "id": "MED-4301",
        "name": "Cholecalciferol (Vitamin D3)",
        "strength": "2000 IU",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Priya Nair, MD",
        "prescribedDate": "September 05, 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Self-administered with morning breakfast.",
        "pharmacyBatch": "VIT-551-A"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-601",
        "date": "Today, Nov 10, 2026",
        "time": "09:30 AM",
        "location": "Front Reception Lobby",
        "status": "leave",
        "verifiedBy": "Sneha Joshi, RN",
        "notes": "Signed out on day pass with family; destination local cafe."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-043",
        "title": "Independent Living Suite Lease Agreement",
        "category": "Agreement",
        "uploadDate": "Sep 01, 2024",
        "fileSize": "3.1 MB PDF",
        "signedBy": "Nandini Iyer & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-2024-043"
      }
    ],
    "incidents": [
      {
        "id": "INC-003",
        "reference": "INC-2026-086",
        "date": "Nov 8, 11:20 AM",
        "category": "Equipment",
        "severity": "low",
        "status": "under_investigation",
        "reporter": "Sneha Joshi, RN",
        "summary": "Overhead bathroom call cord showed intermittent connectivity. Facilities inspection queued."
      }
    ],
    "transferHistory": []
  },
  {
    "id": "RES-001",
    "fullName": "Meera Krishnan",
    "preferredName": "Meera",
    "dateOfBirth": "July 5, 1942",
    "age": 82,
    "gender": "Female",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 201-A",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Meera's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01034",
        "email": "family@haven-care.in.example",
        "address": "442 Deccan Enclave, 12th Main, Indiranagar, Bengaluru, Karnataka 560038",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-201",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-201",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-201",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 201-A"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-002",
    "fullName": "Parvati Sundararajan",
    "preferredName": "Parvati",
    "dateOfBirth": "July 17, 1939",
    "age": 85,
    "gender": "Female",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 201-B",
      "bed": "Bed 2",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Parvati's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01051",
        "email": "family@haven-care.in.example",
        "address": "814 Gulmohar Marg, Bandra West, Mumbai, Maharashtra 400050",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-201",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-201",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-201",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 201-B"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-003",
    "fullName": "Sunita Verma",
    "preferredName": "Sunita",
    "dateOfBirth": "July 3, 1944",
    "age": 80,
    "gender": "Female",
    "status": "with-family",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 202",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Sunita's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01068",
        "email": "family@haven-care.in.example",
        "address": "522 7th Cross, Malleshwaram, Bengaluru, Karnataka 560003",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-202",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-202",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "leave",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-202",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 202"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-004",
    "fullName": "Ashok Gokhale",
    "preferredName": "Ashok",
    "dateOfBirth": "July 13, 1941",
    "age": 83,
    "gender": "Male",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 203",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Ashok's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01085",
        "email": "family@haven-care.in.example",
        "address": "18 Jubilee Hills, Road No. 36, Hyderabad, Telangana 500033",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-203",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-203",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-203",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 203"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-005",
    "fullName": "Revathi Sampath",
    "preferredName": "Revathi",
    "dateOfBirth": "July 24, 1941",
    "age": 83,
    "gender": "Female",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 204-A",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Revathi's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01102",
        "email": "family@haven-care.in.example",
        "address": "29 Jayanagar 4th Block, Bengaluru, Karnataka 560011",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-204",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-204",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-204",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 204-A"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-006",
    "fullName": "Pratibha Patil",
    "preferredName": "Pratibha",
    "dateOfBirth": "July 2, 1939",
    "age": 85,
    "gender": "Female",
    "status": "resting",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 205",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Pratibha's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01119",
        "email": "family@haven-care.in.example",
        "address": "63 Prabhat Road, Erandwane, Pune, Maharashtra 411004",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-205",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-205",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-205",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 205"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-007",
    "fullName": "Harpreet Singh",
    "preferredName": "Harpreet",
    "dateOfBirth": "July 13, 1942",
    "age": 82,
    "gender": "Male",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 206",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Harpreet's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01136",
        "email": "family@haven-care.in.example",
        "address": "19 Poes Garden, Kasturi Ranga Road, Chennai, Tamil Nadu 600086",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-206",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-206",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-206",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 206"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-008",
    "fullName": "Mohanlal Shah",
    "preferredName": "Mohanlal",
    "dateOfBirth": "July 15, 1937",
    "age": 87,
    "gender": "Male",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 207",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Mohanlal's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01153",
        "email": "family@haven-care.in.example",
        "address": "52 2nd Avenue, Anna Nagar, Chennai, Tamil Nadu 600040",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-207",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-207",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-207",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 207"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-009",
    "fullName": "Nirmala Pandey",
    "preferredName": "Nirmala",
    "dateOfBirth": "July 21, 1941",
    "age": 83,
    "gender": "Female",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 208",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Nirmala's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01170",
        "email": "family@haven-care.in.example",
        "address": "40 Banjara Hills, Road No. 12, Hyderabad, Telangana 500034",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-208",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-208",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-208",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 208"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-010",
    "fullName": "Dilip Kadam",
    "preferredName": "Dilip",
    "dateOfBirth": "July 9, 1939",
    "age": 85,
    "gender": "Male",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 209",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Dilip's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01187",
        "email": "family@haven-care.in.example",
        "address": "16 Panampilly Nagar, Kochi, Kerala 682036",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-209",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-209",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-209",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 209"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-011",
    "fullName": "Amarjit Kaur",
    "preferredName": "Amarjit",
    "dateOfBirth": "July 17, 1937",
    "age": 87,
    "gender": "Female",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 210",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Amarjit's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01204",
        "email": "family@haven-care.in.example",
        "address": "27 Golf Links, New Delhi, Delhi 110003",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-210",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-210",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-210",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 210"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-012",
    "fullName": "Om Prakash Gupta",
    "preferredName": "Om",
    "dateOfBirth": "July 16, 1938",
    "age": 86,
    "gender": "Male",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 211",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Om's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01221",
        "email": "family@haven-care.in.example",
        "address": "61 Southern Avenue, Ballygunge, Kolkata, West Bengal 700029",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-211",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-211",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-211",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 211"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-013",
    "fullName": "Biswanath Das",
    "preferredName": "Biswanath",
    "dateOfBirth": "July 23, 1940",
    "age": 84,
    "gender": "Male",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 212",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Biswanath's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01238",
        "email": "family@haven-care.in.example",
        "address": "92 Navrangpura, Ahmedabad, Gujarat 380009",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-212",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-212",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-212",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 212"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-014",
    "fullName": "Hemlata Solanki",
    "preferredName": "Hemlata",
    "dateOfBirth": "July 17, 1941",
    "age": 83,
    "gender": "Female",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 213",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Hemlata's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01255",
        "email": "family@haven-care.in.example",
        "address": "104 5th Block, Koramangala, Bengaluru, Karnataka 560095",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-213",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-213",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-213",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 213"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-015",
    "fullName": "Kusumakar Prabhakar",
    "preferredName": "Kusumakar",
    "dateOfBirth": "July 18, 1939",
    "age": 85,
    "gender": "Male",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Garden Terrace",
      "room": "Room 214",
      "bed": "Bed 1",
      "floor": "Floor 2",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Priya Shetty, RN",
        "role": "Lead RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Garden Terrace Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Kusumakar's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01272",
        "email": "family@haven-care.in.example",
        "address": "35 Boat Club Road, Sangamvadi, Pune, Maharashtra 411001",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-214",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-214",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Garden Terrace Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-214",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 214"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-016",
    "fullName": "Aarav Deshmukh",
    "preferredName": "Aarav",
    "dateOfBirth": "July 7, 1936",
    "age": 88,
    "gender": "Male",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 111",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Aarav's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01289",
        "email": "family@haven-care.in.example",
        "address": "22 Kalyani Nagar, Pune, Maharashtra 411006",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-111",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-111",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-111",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 111"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-017",
    "fullName": "Padmavathi Rao",
    "preferredName": "Padmavathi",
    "dateOfBirth": "July 21, 1938",
    "age": 86,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 113",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Padmavathi's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01306",
        "email": "family@haven-care.in.example",
        "address": "14 Linking Road, Khar West, Mumbai, Maharashtra 400052",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-113",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-113",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-113",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 113"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-018",
    "fullName": "Shailaja Joshi",
    "preferredName": "Shailaja",
    "dateOfBirth": "July 4, 1937",
    "age": 87,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 114",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Shailaja's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01323",
        "email": "family@haven-care.in.example",
        "address": "83 Vasant Vihar, New Delhi, Delhi 110057",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-114",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-114",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-114",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 114"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-019",
    "fullName": "Chetna Mehta",
    "preferredName": "Chetna",
    "dateOfBirth": "July 17, 1940",
    "age": 84,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 115",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Chetna's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01340",
        "email": "family@haven-care.in.example",
        "address": "34 Alipore Road, Kolkata, West Bengal 700027",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-115",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-115",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-115",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 115"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-020",
    "fullName": "Sushma Bhatia",
    "preferredName": "Sushma",
    "dateOfBirth": "July 11, 1938",
    "age": 86,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 116",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Sushma's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01357",
        "email": "family@haven-care.in.example",
        "address": "48 Lavelle Road, Shanthala Nagar, Bengaluru, Karnataka 560001",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-116",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-116",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-116",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 116"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-021",
    "fullName": "Jayant Marathe",
    "preferredName": "Jayant",
    "dateOfBirth": "July 21, 1938",
    "age": 86,
    "gender": "Male",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 117",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Jayant's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01374",
        "email": "family@haven-care.in.example",
        "address": "442 Deccan Enclave, 12th Main, Indiranagar, Bengaluru, Karnataka 560038",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-117",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-117",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-117",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 117"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-022",
    "fullName": "Anjali Roy",
    "preferredName": "Anjali",
    "dateOfBirth": "July 14, 1936",
    "age": 88,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 118",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Anjali's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01391",
        "email": "family@haven-care.in.example",
        "address": "814 Gulmohar Marg, Bandra West, Mumbai, Maharashtra 400050",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-118",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-118",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-118",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 118"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-023",
    "fullName": "Tarabai Shinde",
    "preferredName": "Tarabai",
    "dateOfBirth": "July 21, 1940",
    "age": 84,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 119",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Tarabai's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01408",
        "email": "family@haven-care.in.example",
        "address": "522 7th Cross, Malleshwaram, Bengaluru, Karnataka 560003",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-119",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-119",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-119",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 119"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-024",
    "fullName": "Usha Chawla",
    "preferredName": "Usha",
    "dateOfBirth": "July 10, 1939",
    "age": 85,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 121",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Usha's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01425",
        "email": "family@haven-care.in.example",
        "address": "18 Jubilee Hills, Road No. 36, Hyderabad, Telangana 500033",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-121",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-121",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-121",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 121"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-025",
    "fullName": "Madhuri Bhattacharya",
    "preferredName": "Madhuri",
    "dateOfBirth": "July 12, 1937",
    "age": 87,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 122",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Madhuri's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01442",
        "email": "family@haven-care.in.example",
        "address": "29 Jayanagar 4th Block, Bengaluru, Karnataka 560011",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-122",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-122",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-122",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 122"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-026",
    "fullName": "Sarojini Naidu Cherian",
    "preferredName": "Sarojini",
    "dateOfBirth": "July 18, 1938",
    "age": 86,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 123",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Sarojini's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01459",
        "email": "family@haven-care.in.example",
        "address": "63 Prabhat Road, Erandwane, Pune, Maharashtra 411004",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-123",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-123",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-123",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 123"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-027",
    "fullName": "Kalyanasundaram Pillai",
    "preferredName": "Kalyanasundaram",
    "dateOfBirth": "July 25, 1935",
    "age": 89,
    "gender": "Male",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 124",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Kalyanasundaram's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01476",
        "email": "family@haven-care.in.example",
        "address": "19 Poes Garden, Kasturi Ranga Road, Chennai, Tamil Nadu 600086",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-124",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-124",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-124",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 124"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-028",
    "fullName": "Kamala Narayanan",
    "preferredName": "Kamala",
    "dateOfBirth": "July 5, 1941",
    "age": 83,
    "gender": "Female",
    "status": "active",
    "careLevel": "Memory Care",
    "placement": {
      "wing": "Sunrise Pavilion",
      "room": "Room 125",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Shared Memory Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Consultant Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Rahul Patil, LPN",
        "role": "Supervisor LPN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Sunrise Pavilion Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Kamala's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01493",
        "email": "family@haven-care.in.example",
        "address": "52 2nd Avenue, Anna Nagar, Chennai, Tamil Nadu 600040",
        "isPrimary": true,
        "isLegalGuardian": true,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Secured Pavilion Monitoring — Wander guard protocol active."
    ],
    "mobilityStatus": "Ambulatory with supervision",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Medium",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Assisted grooming and bathing.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Age-related Cognitive Decline",
        "icdCode": "F03.90",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-125",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-125",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Sunrise Pavilion Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-125",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 125"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-029",
    "fullName": "Suresh Menon",
    "preferredName": "Suresh",
    "dateOfBirth": "July 20, 1939",
    "age": 85,
    "gender": "Male",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 101-A",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Suresh's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01510",
        "email": "family@haven-care.in.example",
        "address": "40 Banjara Hills, Road No. 12, Hyderabad, Telangana 500034",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-101",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-101",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-101",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 101-A"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-030",
    "fullName": "Ramesh Malhotra",
    "preferredName": "Ramesh",
    "dateOfBirth": "July 12, 1932",
    "age": 92,
    "gender": "Male",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 101-B",
      "bed": "Bed 2",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Ramesh's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01527",
        "email": "family@haven-care.in.example",
        "address": "16 Panampilly Nagar, Kochi, Kerala 682036",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-101",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-101",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-101",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 101-B"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-031",
    "fullName": "Lakshmi Narasimhan",
    "preferredName": "Lakshmi",
    "dateOfBirth": "July 3, 1935",
    "age": 89,
    "gender": "Female",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 102-A",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Lakshmi's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01544",
        "email": "family@haven-care.in.example",
        "address": "27 Golf Links, New Delhi, Delhi 110003",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-102",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-102",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-102",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 102-A"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-032",
    "fullName": "Balakrishna Pillai",
    "preferredName": "Balakrishna",
    "dateOfBirth": "July 22, 1934",
    "age": 90,
    "gender": "Male",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 102-B",
      "bed": "Bed 2",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Balakrishna's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01561",
        "email": "family@haven-care.in.example",
        "address": "61 Southern Avenue, Ballygunge, Kolkata, West Bengal 700029",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-102",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-102",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-102",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 102-B"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-033",
    "fullName": "Subhash Chandra",
    "preferredName": "Subhash",
    "dateOfBirth": "July 25, 1936",
    "age": 88,
    "gender": "Male",
    "status": "in-clinic",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 103-A",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Subhash's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01578",
        "email": "family@haven-care.in.example",
        "address": "92 Navrangpura, Ahmedabad, Gujarat 380009",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-103",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-103",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "clinic",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-103",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 103-A"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-034",
    "fullName": "Hansaben Patel",
    "preferredName": "Hansaben",
    "dateOfBirth": "July 6, 1935",
    "age": 89,
    "gender": "Female",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 103-B",
      "bed": "Bed 2",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Hansaben's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01595",
        "email": "family@haven-care.in.example",
        "address": "104 5th Block, Koramangala, Bengaluru, Karnataka 560095",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-103",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-103",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-103",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 103-B"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-035",
    "fullName": "Rajeshwari Kapoor",
    "preferredName": "Rajeshwari",
    "dateOfBirth": "July 14, 1933",
    "age": 91,
    "gender": "Female",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 104-A",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Rajeshwari's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01612",
        "email": "family@haven-care.in.example",
        "address": "35 Boat Club Road, Sangamvadi, Pune, Maharashtra 411001",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-104",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-104",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-104",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 104-A"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-036",
    "fullName": "Devendra Tiwari",
    "preferredName": "Devendra",
    "dateOfBirth": "July 14, 1931",
    "age": 93,
    "gender": "Male",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 104-B",
      "bed": "Bed 2",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Devendra's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01629",
        "email": "family@haven-care.in.example",
        "address": "22 Kalyani Nagar, Pune, Maharashtra 411006",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-104",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-104",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-104",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 104-B"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-037",
    "fullName": "Ramachandra Murthy",
    "preferredName": "Ramachandra",
    "dateOfBirth": "July 18, 1935",
    "age": 89,
    "gender": "Male",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 105-A",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Ramachandra's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01646",
        "email": "family@haven-care.in.example",
        "address": "14 Linking Road, Khar West, Mumbai, Maharashtra 400052",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-105",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-105",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-105",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 105-A"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-038",
    "fullName": "Jayashree Venkatesh",
    "preferredName": "Jayashree",
    "dateOfBirth": "July 4, 1936",
    "age": 88,
    "gender": "Female",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 105-B",
      "bed": "Bed 2",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Jayashree's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01663",
        "email": "family@haven-care.in.example",
        "address": "83 Vasant Vihar, New Delhi, Delhi 110057",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-105",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-105",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-105",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 105-B"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-039",
    "fullName": "Birendra Kumar Jha",
    "preferredName": "Birendra",
    "dateOfBirth": "July 7, 1934",
    "age": 90,
    "gender": "Male",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 106-A",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Birendra's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01680",
        "email": "family@haven-care.in.example",
        "address": "34 Alipore Road, Kolkata, West Bengal 700027",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-106",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-106",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-106",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 106-A"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-040",
    "fullName": "Sumitra Rane",
    "preferredName": "Sumitra",
    "dateOfBirth": "July 16, 1935",
    "age": 89,
    "gender": "Female",
    "status": "active",
    "careLevel": "Assisted Living",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 106-B",
      "bed": "Bed 2",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Sumitra's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01697",
        "email": "family@haven-care.in.example",
        "address": "48 Lavelle Road, Shanthala Nagar, Bengaluru, Karnataka 560001",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-106",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-106",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-106",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 106-B"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-045",
    "fullName": "Vidyadhar Oak",
    "preferredName": "Vidyadhar",
    "dateOfBirth": "July 14, 1933",
    "age": 91,
    "gender": "Male",
    "status": "active",
    "careLevel": "Skilled Nursing",
    "placement": {
      "wing": "Orchard Meadow",
      "room": "Room 107-A",
      "bed": "Bed 1",
      "floor": "Floor 1",
      "roomType": "Standard Room",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Anita Mehta, MD",
        "specialty": "Lead Geriatrician",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Deepak Gowda, NP",
        "role": "Nurse Practitioner",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Orchard Meadow Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Vidyadhar's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01714",
        "email": "family@haven-care.in.example",
        "address": "442 Deccan Enclave, 12th Main, Indiranagar, Bengaluru, Karnataka 560038",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [
      "Fall Risk Protocol Active."
    ],
    "mobilityStatus": "Wheelchair / 1-person assist",
    "dietaryProtocol": "Soft diet with nutritional supplements",
    "dnrStatus": true,
    "polstOnRecord": true,
    "carePlan": {
      "mobilitySupport": "Walker assistance with staff standby.",
      "fallRiskLevel": "High",
      "transferAssistance": "1-person assist",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-107",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-107",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Orchard Meadow Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-107",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Room 107-A"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-046",
    "fullName": "Kavya Reddy",
    "preferredName": "Kavya",
    "dateOfBirth": "July 9, 1947",
    "age": 77,
    "gender": "Female",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 302",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Kavya's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01731",
        "email": "family@haven-care.in.example",
        "address": "814 Gulmohar Marg, Bandra West, Mumbai, Maharashtra 400050",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-302",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-302",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-302",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 302"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-047",
    "fullName": "Dr. Venkatraman Swaminathan",
    "preferredName": "Venkatraman",
    "dateOfBirth": "July 10, 1940",
    "age": 84,
    "gender": "Male",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 303",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Venkatraman's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01748",
        "email": "family@haven-care.in.example",
        "address": "522 7th Cross, Malleshwaram, Bengaluru, Karnataka 560003",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-303",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-303",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-303",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 303"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-048",
    "fullName": "Radhakrishnan Nair",
    "preferredName": "Radhakrishnan",
    "dateOfBirth": "July 25, 1943",
    "age": 81,
    "gender": "Male",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 304",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Radhakrishnan's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01765",
        "email": "family@haven-care.in.example",
        "address": "18 Jubilee Hills, Road No. 36, Hyderabad, Telangana 500033",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-304",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-304",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-304",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 304"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-049",
    "fullName": "Anupama Sengupta",
    "preferredName": "Anupama",
    "dateOfBirth": "July 14, 1943",
    "age": 81,
    "gender": "Female",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 305",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Anupama's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01782",
        "email": "family@haven-care.in.example",
        "address": "29 Jayanagar 4th Block, Bengaluru, Karnataka 560011",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-305",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-305",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-305",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 305"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-050",
    "fullName": "Aparna Sen",
    "preferredName": "Aparna",
    "dateOfBirth": "July 4, 1945",
    "age": 79,
    "gender": "Female",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 306",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Aparna's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01799",
        "email": "family@haven-care.in.example",
        "address": "63 Prabhat Road, Erandwane, Pune, Maharashtra 411004",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-306",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-306",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-306",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 306"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-051",
    "fullName": "Debashis Mukherjee",
    "preferredName": "Debashis",
    "dateOfBirth": "July 11, 1943",
    "age": 81,
    "gender": "Male",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 307",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Debashis's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01816",
        "email": "family@haven-care.in.example",
        "address": "19 Poes Garden, Kasturi Ranga Road, Chennai, Tamil Nadu 600086",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-307",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-307",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-307",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 307"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-052",
    "fullName": "Baldev Saxena",
    "preferredName": "Baldev",
    "dateOfBirth": "July 4, 1946",
    "age": 78,
    "gender": "Male",
    "status": "temporary-leave",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 308",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Baldev's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01833",
        "email": "family@haven-care.in.example",
        "address": "52 2nd Avenue, Anna Nagar, Chennai, Tamil Nadu 600040",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-308",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-308",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "leave",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-308",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 308"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-053",
    "fullName": "Subhashini Chettiar",
    "preferredName": "Subhashini",
    "dateOfBirth": "July 15, 1944",
    "age": 80,
    "gender": "Female",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 309",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Subhashini's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01850",
        "email": "family@haven-care.in.example",
        "address": "40 Banjara Hills, Road No. 12, Hyderabad, Telangana 500034",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-309",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-309",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-309",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 309"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-054",
    "fullName": "Kamalika Ghosh",
    "preferredName": "Kamalika",
    "dateOfBirth": "July 17, 1942",
    "age": 82,
    "gender": "Female",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 310",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Kamalika's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01867",
        "email": "family@haven-care.in.example",
        "address": "16 Panampilly Nagar, Kochi, Kerala 682036",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-310",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-310",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-310",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 310"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-055",
    "fullName": "Rajinder Khanna",
    "preferredName": "Rajinder",
    "dateOfBirth": "July 10, 1944",
    "age": 80,
    "gender": "Male",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 311",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Rajinder's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01884",
        "email": "family@haven-care.in.example",
        "address": "27 Golf Links, New Delhi, Delhi 110003",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-311",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-311",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-311",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 311"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-056",
    "fullName": "Giridhar Natarajan",
    "preferredName": "Giridhar",
    "dateOfBirth": "July 22, 1943",
    "age": 81,
    "gender": "Male",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 312",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Giridhar's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01901",
        "email": "family@haven-care.in.example",
        "address": "61 Southern Avenue, Ballygunge, Kolkata, West Bengal 700029",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-312",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-312",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-312",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 312"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-057",
    "fullName": "Pranab Chatterjee",
    "preferredName": "Pranab",
    "dateOfBirth": "July 1, 1942",
    "age": 82,
    "gender": "Male",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 313",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Pranab's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01918",
        "email": "family@haven-care.in.example",
        "address": "92 Navrangpura, Ahmedabad, Gujarat 380009",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-313",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-313",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-313",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 313"
      }
    ],
    "incidents": [],
    "transferHistory": []
  },
  {
    "id": "RES-058",
    "fullName": "Manjula Subramaniam",
    "preferredName": "Manjula",
    "dateOfBirth": "July 25, 1945",
    "age": 79,
    "gender": "Female",
    "status": "active",
    "careLevel": "Independent Living",
    "placement": {
      "wing": "Highland Haven",
      "room": "Suite 314",
      "bed": "Bed 1",
      "floor": "Floor 3",
      "roomType": "Private Suite",
      "moveInDate": "October 15, 2024"
    },
    "careTeam": {
      "primaryDoctor": {
        "name": "Dr. Priya Nair, MD",
        "specialty": "Internal Medicine",
        "phone": "+91 98450 23489",
        "license": "KMC-88391"
      },
      "primaryNurse": {
        "name": "Sneha Joshi, RN",
        "role": "Coordinator RN",
        "shift": "Day Shift (07:00 – 15:00)"
      },
      "caregiverTeam": "Highland Haven Care Pod"
    },
    "emergencyContacts": [
      {
        "name": "Manjula's Family Representative",
        "relationship": "Next of Kin",
        "phone": "+91 98450 01935",
        "email": "family@haven-care.in.example",
        "address": "104 5th Block, Koramangala, Bengaluru, Karnataka 560095",
        "isPrimary": true,
        "isLegalGuardian": false,
        "hasPowerOfAttorney": true,
        "communicationPreference": "Phone Call"
      }
    ],
    "alerts": [],
    "mobilityStatus": "Independent ambulatory",
    "dietaryProtocol": "Standard healthy adult diet",
    "dnrStatus": false,
    "polstOnRecord": false,
    "carePlan": {
      "mobilitySupport": "Independent mobility.",
      "fallRiskLevel": "Low",
      "transferAssistance": "Independent",
      "nutritionDietary": "Nutritious balanced meals with cultural preferences supported.",
      "hydrationGoal": "1,800 mL daily.",
      "personalCareHygiene": "Independent.",
      "bathingSchedule": "Mondays and Thursdays",
      "continenceCare": "Standard schedule.",
      "dailyRoutineInstructions": "Participate in morning gardening or reading lounge.",
      "sensoryAids": [],
      "caregiverActionChecklist": [
        "Verify hydration intake",
        "Observe evening mobility"
      ],
      "nextCarePlanReviewDate": "December 2026"
    },
    "allergies": [],
    "conditions": [
      {
        "condition": "Mild Hypertension",
        "icdCode": "I10",
        "diagnosedDate": "2022",
        "status": "managed",
        "notes": "Stable baseline."
      }
    ],
    "clinicalNotes": [],
    "medications": [
      {
        "id": "MED-314",
        "name": "Daily Senior Multivitamin",
        "strength": "1 Tablet",
        "frequency": "Once daily",
        "route": "Oral (PO)",
        "prescribingDoctor": "Dr. Anita Mehta, MD",
        "prescribedDate": "Oct 2024",
        "timing": [
          "08:00"
        ],
        "status": "active",
        "todayAdherence": "administered",
        "instructions": "Take with breakfast.",
        "pharmacyBatch": "VIT-990-B"
      }
    ],
    "attendanceLogs": [
      {
        "id": "ATT-314",
        "date": "Today, Nov 10, 2026",
        "time": "10:00 AM",
        "location": "Highland Haven Lounge",
        "status": "present",
        "verifiedBy": "Shift Caregiver",
        "notes": "Routine check-in completed."
      }
    ],
    "visitorLogs": [],
    "documents": [
      {
        "id": "DOC-314",
        "title": "Residency Care Agreement",
        "category": "Agreement",
        "uploadDate": "Oct 15, 2024",
        "fileSize": "1.8 MB PDF",
        "signedBy": "Resident / Family & Admin Ramanathan",
        "status": "verified",
        "referenceNumber": "AGR-Suite 314"
      }
    ],
    "incidents": [],
    "transferHistory": []
  }
];

export const MOCK_AVAILABLE_ROOMS = [
  {
    "wing": "Garden Terrace",
    "room": "Room 215",
    "bed": "Bed A",
    "floor": "Floor 2",
    "careLevel": "Assisted Living"
  },
  {
    "wing": "Sunrise Pavilion",
    "room": "Room 120",
    "bed": "Bed 2",
    "floor": "Floor 1",
    "careLevel": "Memory Care"
  },
  {
    "wing": "Highland Haven",
    "room": "Suite 315",
    "bed": "Bed 1",
    "floor": "Floor 3",
    "careLevel": "Independent Living"
  },
  {
    "wing": "Orchard Meadow",
    "room": "Room 107-B",
    "bed": "Bed 1",
    "floor": "Floor 1",
    "careLevel": "Skilled Nursing"
  }
];
