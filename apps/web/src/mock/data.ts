/**
 * Mock data for HAVEN Design System & Component Demonstrations
 */

export interface MockResident {
  id: string;
  name: string;
  preferredName?: string;
  age: number;
  room: string;
  wing: 'Sunrise Pavilion' | 'Garden Terrace' | 'Orchard Meadow' | 'Highland Haven';
  careLevel: 'Assisted Living' | 'Memory Care' | 'Independent' | 'Skilled Nursing';
  status: 'active' | 'in-clinic' | 'with-family' | 'resting';
  primaryNurse: string;
  lastCheckIn: string;
  allergies: string[];
}

export const MOCK_RESIDENTS: MockResident[] = [
  {
    id: 'RES-041',
    name: 'Eleanor Vance',
    preferredName: 'Ellie',
    age: 84,
    room: 'Room 204-B',
    wing: 'Garden Terrace',
    careLevel: 'Assisted Living',
    status: 'active',
    primaryNurse: 'Sarah Chen, RN',
    lastCheckIn: '15 mins ago',
    allergies: ['Penicillin', 'Strawberries'],
  },
  {
    id: 'RES-042',
    name: 'Arthur Pendelton',
    preferredName: 'Art',
    age: 89,
    room: 'Room 112',
    wing: 'Sunrise Pavilion',
    careLevel: 'Memory Care',
    status: 'resting',
    primaryNurse: 'Marcus Davies, LPN',
    lastCheckIn: '32 mins ago',
    allergies: ['Sulfa drugs'],
  },
  {
    id: 'RES-043',
    name: 'Martha Higgins',
    preferredName: 'Martha',
    age: 79,
    room: 'Suite 301',
    wing: 'Highland Haven',
    careLevel: 'Independent',
    status: 'with-family',
    primaryNurse: 'Elena Rostova, RN',
    lastCheckIn: '2 hours ago',
    allergies: ['None'],
  },
  {
    id: 'RES-044',
    name: 'George Washington Carver Jr.',
    preferredName: 'George',
    age: 91,
    room: 'Room 108-A',
    wing: 'Orchard Meadow',
    careLevel: 'Skilled Nursing',
    status: 'in-clinic',
    primaryNurse: 'David Kim, NP',
    lastCheckIn: '5 mins ago',
    allergies: ['Latex', 'Aspirin'],
  },
];

export const MOCK_CARE_LEVELS = [
  { value: 'all', label: 'All Care Levels' },
  { value: 'independent', label: 'Independent Living' },
  { value: 'assisted', label: 'Assisted Living' },
  { value: 'memory', label: 'Memory Care' },
  { value: 'skilled', label: 'Skilled Nursing' },
];

export const MOCK_FACILITY_WINGS = [
  { value: 'all', label: 'All Wings & Pavilions' },
  { value: 'garden', label: 'Garden Terrace' },
  { value: 'sunrise', label: 'Sunrise Pavilion' },
  { value: 'orchard', label: 'Orchard Meadow' },
  { value: 'highland', label: 'Highland Haven' },
];
