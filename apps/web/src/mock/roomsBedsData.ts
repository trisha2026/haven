import { MOCK_FULL_RESIDENTS } from './residentsData.ts';
import type { FacilityWing } from '../types/resident.ts';

export type BedStatus = 'occupied' | 'available' | 'maintenance' | 'reserved';
export type RoomType = 'Standard Room' | 'Private Suite' | 'Shared Memory Room';

export interface FacilityBed {
  id: string;
  bedNumber: string; // e.g. "Bed 1", "Bed A"
  status: BedStatus;
  residentId?: string;
  residentName?: string;
  lastSanitized: string;
  notes?: string;
}

export interface FacilityRoom {
  id: string;
  roomNumber: string; // e.g. "Room 108-A"
  wing: FacilityWing;
  floor: 'Floor 1' | 'Floor 2' | 'Floor 3';
  roomType: RoomType;
  capacity: number;
  beds: FacilityBed[];
  amenities: string[];
  maintenanceNotes?: string;
  callBellStatus: 'normal' | 'active_call' | 'maintenance';
}

// Generate comprehensive room & bed map aligned with 58 resident placements
export function generateInitialRooms(): FacilityRoom[] {
  const roomsMap = new Map<string, FacilityRoom>();

  // 1. Populate rooms from all 58 resident placements
  MOCK_FULL_RESIDENTS.forEach((r) => {
    const rm = r.placement.room;
    if (!roomsMap.has(rm)) {
      const isHighland = r.placement.wing === 'Highland Haven';
      const isSunrise = r.placement.wing === 'Sunrise Pavilion';
      const roomType: RoomType = isHighland
        ? 'Private Suite'
        : isSunrise
        ? 'Shared Memory Room'
        : 'Standard Room';

      const floor =
        r.placement.floor === 'Floor 3'
          ? 'Floor 3'
          : r.placement.floor === 'Floor 2'
          ? 'Floor 2'
          : 'Floor 1';

      roomsMap.set(rm, {
        id: `RM-${rm.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}`,
        roomNumber: rm,
        wing: r.placement.wing,
        floor,
        roomType,
        capacity: roomType === 'Shared Memory Room' ? 2 : 1,
        beds: [],
        amenities: [
          'Overhead Call-Bell Sensor',
          'HEPA Continuous Air Filtration',
          'Grab Rails & Non-Slip Flooring',
          isHighland ? 'Private Balcony' : 'Motion Night-Light Sensor',
        ],
        callBellStatus: rm === 'Room 108-A' ? 'active_call' : 'normal',
      });
    }

    const roomObj = roomsMap.get(rm)!;
    const bedNum = r.placement.bed || 'Bed 1';
    roomObj.beds.push({
      id: `${roomObj.id}-${bedNum.replace(/\s+/g, '')}`,
      bedNumber: bedNum,
      status: 'occupied',
      residentId: r.id,
      residentName: r.fullName,
      lastSanitized: 'Today, 06:30 AM',
      notes: `Allocated to ${r.fullName} (${r.careLevel})`,
    });
  });

  // 2. Add available and maintenance rooms to complete facility wings
  const additionalRooms: FacilityRoom[] = [
    {
      id: 'RM-Garden-215',
      roomNumber: 'Room 215',
      wing: 'Garden Terrace',
      floor: 'Floor 2',
      roomType: 'Standard Room',
      capacity: 1,
      beds: [
        {
          id: 'BED-G-215-A',
          bedNumber: 'Bed A',
          status: 'available',
          lastSanitized: 'Today, 07:15 AM',
          notes: 'Deep sanitized and prepped for next admission.',
        },
      ],
      amenities: ['Overhead Call-Bell Sensor', 'HEPA Continuous Air Filtration', 'Garden View En-suite'],
      callBellStatus: 'normal',
    },
    {
      id: 'RM-Garden-218',
      roomNumber: 'Room 218',
      wing: 'Garden Terrace',
      floor: 'Floor 2',
      roomType: 'Standard Room',
      capacity: 2,
      beds: [
        {
          id: 'BED-G-218-1',
          bedNumber: 'Bed 1',
          status: 'available',
          lastSanitized: 'Yesterday, 16:00 PM',
          notes: 'Ready for admission.',
        },
        {
          id: 'BED-G-218-2',
          bedNumber: 'Bed 2',
          status: 'maintenance',
          lastSanitized: 'Nov 08, 2026',
          notes: 'Motorized bed tilt actuator under repair by engineering.',
        },
      ],
      amenities: ['Overhead Call-Bell Sensor', 'Double Wardrobe', 'Shared Accessible Bath'],
      maintenanceNotes: 'Electric actuator work order WO-9921 in progress.',
      callBellStatus: 'maintenance',
    },
    {
      id: 'RM-Sunrise-120',
      roomNumber: 'Room 120',
      wing: 'Sunrise Pavilion',
      floor: 'Floor 1',
      roomType: 'Shared Memory Room',
      capacity: 2,
      beds: [
        {
          id: 'BED-S-120-1',
          bedNumber: 'Bed 1',
          status: 'maintenance',
          lastSanitized: 'Nov 07, 2026',
          notes: 'Floor sensor mat replacement in progress.',
        },
        {
          id: 'BED-S-120-2',
          bedNumber: 'Bed 2',
          status: 'available',
          lastSanitized: 'Today, 08:00 AM',
          notes: 'Memory care secured room bed prepped.',
        },
      ],
      amenities: ['Secured Memory Wandering Sensor', 'Acoustic Calming Lighting', 'Rounded Edge Furnishings'],
      maintenanceNotes: 'Sensor mat scheduled for installation today 14:00.',
      callBellStatus: 'normal',
    },
    {
      id: 'RM-Orchard-107-B',
      roomNumber: 'Room 107-B',
      wing: 'Orchard Meadow',
      floor: 'Floor 1',
      roomType: 'Standard Room',
      capacity: 1,
      beds: [
        {
          id: 'BED-O-107B-1',
          bedNumber: 'Bed 1',
          status: 'available',
          lastSanitized: 'Today, 09:00 AM',
          notes: 'Intensive clinical nursing monitor mounted.',
        },
      ],
      amenities: ['Wall-Mounted Oxygen Port', 'Overhead Lift Track', 'Vital Sign Monitor Dock'],
      callBellStatus: 'normal',
    },
    {
      id: 'RM-Highland-315',
      roomNumber: 'Suite 315',
      wing: 'Highland Haven',
      floor: 'Floor 3',
      roomType: 'Private Suite',
      capacity: 1,
      beds: [
        {
          id: 'BED-H-315-1',
          bedNumber: 'Bed 1',
          status: 'available',
          lastSanitized: 'Nov 09, 2026',
          notes: 'Executive independent suite ready for inspection.',
        },
      ],
      amenities: ['Kitchenette & Refrigerator', 'Balcony with Courtyard View', 'Smart Emergency Pull Cords'],
      callBellStatus: 'normal',
    },
  ];

  additionalRooms.forEach((r) => {
    if (!roomsMap.has(r.roomNumber)) {
      roomsMap.set(r.roomNumber, r);
    }
  });

  return Array.from(roomsMap.values());
}

export const MOCK_FACILITY_ROOMS = generateInitialRooms();

export interface RoomBed {
  id: string;
  roomNumber: string;
  bedNumber: string;
  wing: string;
  floor: number;
  roomType: string;
  status: 'occupied' | 'available' | 'maintenance' | 'reserved';
  residentId?: string;
  residentName?: string;
  residentAge?: number;
  residentGender?: string;
  careClassification?: string;
  primaryCaregiver?: string;
  attendingDoctor?: string;
  admissionDate?: string;
}

export function generateInitialRoomBeds(): RoomBed[] {
  const flattened: RoomBed[] = [];
  const rooms = generateInitialRooms();
  for (const r of rooms) {
    const floorNum = parseInt(r.floor.replace(/\D/g, ''), 10) || 1;
    for (const b of r.beds) {
      const res = b.residentId ? MOCK_FULL_RESIDENTS.find((m) => m.id === b.residentId) : undefined;
      flattened.push({
        id: b.id,
        roomNumber: r.roomNumber,
        bedNumber: b.bedNumber,
        wing: r.wing,
        floor: floorNum,
        roomType: r.roomType,
        status: b.status,
        residentId: b.residentId,
        residentName: b.residentName,
        residentAge: res?.age,
        residentGender: res?.gender,
        careClassification: res?.careLevel,
        primaryCaregiver: res?.careTeam.primaryNurse.name,
        attendingDoctor: res?.careTeam.primaryDoctor.name,
        admissionDate: res?.placement.moveInDate || '2024-01-15',
      });
    }
  }
  return flattened;
}

export const MOCK_ROOMS_BEDS: RoomBed[] = generateInitialRoomBeds();

