import type { UserRole } from '../types/navigation.ts';
import { getSidebarItems } from '../config/navigation/index.ts';
import { MOCK_RESIDENTS } from './data.ts';

export type SearchResultType = 'page' | 'resident' | 'staff' | 'room';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  href: string;
  /** Additional lowercase terms matched by the search query. */
  keywords: string;
}

export const SEARCH_TYPE_LABELS: Record<SearchResultType, string> = {
  page: 'Pages',
  resident: 'Residents',
  staff: 'Staff',
  room: 'Rooms',
};

interface MockStaffMember {
  id: string;
  name: string;
  role: 'Caregiver' | 'Doctor';
  detail: string;
}

const MOCK_STAFF: MockStaffMember[] = [
  { id: 'CG-0142', name: 'Priya Shetty', role: 'Caregiver', detail: 'Senior Caregiver · Garden Terrace' },
  { id: 'CG-0118', name: 'Rahul Patil', role: 'Caregiver', detail: 'LPN · Sunrise Pavilion' },
  { id: 'CG-0156', name: 'Sneha Joshi', role: 'Caregiver', detail: 'RN · Highland Haven' },
  { id: 'CG-0163', name: 'Ananya Deshmukh', role: 'Caregiver', detail: 'Care Assistant · Orchard Meadow' },
  { id: 'DR-0031', name: 'Dr. Anita Mehta', role: 'Doctor', detail: 'Consultant Geriatrician' },
  { id: 'DR-0044', name: 'Dr. Arjun Rao', role: 'Doctor', detail: 'Cardiologist · Visiting' },
  { id: 'NP-0012', name: 'Deepak Gowda', role: 'Doctor', detail: 'Nurse Practitioner · Skilled Nursing' },
];

interface MockRoom {
  id: string;
  label: string;
  wing: string;
  status: string;
}

const MOCK_ROOMS: MockRoom[] = [
  { id: 'room-204b', label: 'Room 204-B', wing: 'Garden Terrace', status: 'Occupied · 1 bed' },
  { id: 'room-112', label: 'Room 112', wing: 'Sunrise Pavilion', status: 'Occupied · Memory care' },
  { id: 'room-301', label: 'Suite 301', wing: 'Highland Haven', status: 'Occupied · Independent suite' },
  { id: 'room-108a', label: 'Room 108-A', wing: 'Orchard Meadow', status: 'Occupied · Skilled nursing' },
  { id: 'room-215', label: 'Room 215', wing: 'Garden Terrace', status: 'Available · Ready for admission' },
  { id: 'room-120', label: 'Room 120', wing: 'Sunrise Pavilion', status: 'Housekeeping in progress' },
];

/** Route used for each result type, per role. `undefined` hides that type for the role. */
const RESULT_ROUTES: Record<UserRole, Partial<Record<Exclude<SearchResultType, 'page'>, string>>> = {
  admin: {
    resident: '/admin/residents',
    staff: '/admin/caregivers',
    room: '/admin/rooms',
  },
  caregiver: {
    resident: '/caregiver/residents',
    room: '/caregiver/residents',
  },
  doctor: {
    resident: '/doctor/residents',
  },
};

/**
 * Builds a role-scoped mock search index.
 * Each role only sees pages from its own navigation and the record types it may access.
 */
export function buildSearchIndex(role: UserRole): SearchResult[] {
  const routes = RESULT_ROUTES[role];
  const results: SearchResult[] = getSidebarItems(role).map((item) => ({
    id: `page-${item.id}`,
    type: 'page',
    title: item.label,
    subtitle: item.description,
    href: item.path,
    keywords: item.description.toLowerCase(),
  }));

  if (routes.resident) {
    for (const resident of MOCK_RESIDENTS) {
      results.push({
        id: `resident-${resident.id}`,
        type: 'resident',
        title: resident.name,
        subtitle: `${resident.room} · ${resident.wing} · ${resident.careLevel}`,
        href: routes.resident,
        keywords: [resident.id, resident.preferredName ?? '', resident.room, resident.wing, resident.careLevel]
          .join(' ')
          .toLowerCase(),
      });
    }
  }

  if (routes.staff) {
    for (const member of MOCK_STAFF) {
      results.push({
        id: `staff-${member.id}`,
        type: 'staff',
        title: member.name,
        subtitle: `${member.role} · ${member.detail}`,
        href: member.role === 'Doctor' ? '/admin/doctors' : routes.staff,
        keywords: `${member.id} ${member.role} ${member.detail}`.toLowerCase(),
      });
    }
  }

  if (routes.room) {
    for (const room of MOCK_ROOMS) {
      results.push({
        id: room.id,
        type: 'room',
        title: room.label,
        subtitle: `${room.wing} · ${room.status}`,
        href: routes.room,
        keywords: `${room.wing} ${room.status}`.toLowerCase(),
      });
    }
  }

  return results;
}

/** Suggested queries shown before the user types. */
export const SEARCH_SUGGESTIONS: Record<UserRole, string[]> = {
  admin: ['Ananya Sharma', 'Room 215', 'Leave requests', 'Priya Shetty'],
  caregiver: ['Medication', 'Vikram Hegde', 'Attendance', 'QR'],
  doctor: ['Medical records', 'Nandini Iyer', 'Prescription', 'Incident'],
};
