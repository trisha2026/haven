export type BatchStatus = 'active' | 'low_stock' | 'expiring_soon' | 'quarantined' | 'recalled' | 'depleted';
export type POStatus = 'draft' | 'pending_approval' | 'approved' | 'dispatched' | 'received' | 'cancelled' | 'Delivered' | 'Issued';

export interface MedicineBatch {
  id: string; // e.g. "BAT-2026-01"
  sku: string; // e.g. "SKU-MTF-500"
  medicineName: string;
  genericName: string;
  strength: string;
  dosageForm: 'Tablet' | 'Capsule' | 'Suspension' | 'Cream' | 'Vial / Injection' | 'Drops';
  batchNumber: string;
  supplier: string;
  manufacturer: string;
  availableQuantity: number;
  unit: string;
  reorderThreshold: number;
  unitCostINR: number;
  mfgDate: string;
  expiryDate: string;
  status: BatchStatus;
  storageLocation: string; // e.g. "Vault Shelf A-2" | "Cold Chain Refrigerator 1"
  quarantineReason?: string;
  recalledReason?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  activeBatch: string;
  expiryDate: string;
  currentStock: number;
  minThreshold: number;
  unitCostINR: number;
  unit: string;
  status: 'optimal' | 'low_stock' | 'critical' | 'quarantined' | string;
}

export interface PurchaseOrderItem {
  sku: string;
  medicineName: string;
  strength: string;
  quantityOrdered: number;
  unit: string;
  unitPriceINR: number;
  totalPriceINR: number;
}

export interface PurchaseOrder {
  id: string; // e.g. "PO-4412"
  orderNumber?: string;
  orderDate: string;
  issuedDate?: string;
  expectedDelivery: string;
  supplierName: string;
  supplier?: string;
  supplierContact: string;
  status: POStatus | string;
  items: PurchaseOrderItem[];
  totalItems?: number;
  subtotalINR: number;
  taxINR: number;
  totalAmountINR: number;
  authorizedBy?: string;
  authorizationDate?: string;
  receivedBy?: string;
  receivedDate?: string;
  notes?: string;
}

export interface StockLedgerEntry {
  id: string; // e.g. "LED-991"
  timestamp: string;
  sku: string;
  medicineName: string;
  batchNumber: string;
  type: 'initial_stock' | 'dispense' | 'receipt' | 'quarantine' | 'release' | 'adjustment';
  quantityDelta: number; // positive or negative
  balanceAfter: number;
  actor: string;
  reference: string;
  notes: string;
}

export const MOCK_INVENTORY_BATCHES: MedicineBatch[] = [
  {
    id: 'BAT-2026-01',
    sku: 'SKU-MTF-500',
    medicineName: 'Metformin Hydrochloride ER',
    genericName: 'Metformin',
    strength: '500mg',
    dosageForm: 'Tablet',
    batchNumber: 'MTF-2026-B4',
    supplier: 'Apex Healthcare Supply, Bengaluru',
    manufacturer: 'Sun Pharma Ltd',
    availableQuantity: 18,
    unit: 'Tablets',
    reorderThreshold: 50,
    unitCostINR: 4.5,
    mfgDate: 'Jan 2025',
    expiryDate: 'Dec 2027',
    status: 'low_stock',
    storageLocation: 'Central Vault Shelf B-1',
  },
  {
    id: 'BAT-2026-02',
    sku: 'SKU-AMX-250',
    medicineName: 'Amoxicillin Oral Suspension',
    genericName: 'Amoxicillin Trihydrate',
    strength: '250mg / 5mL',
    dosageForm: 'Suspension',
    batchNumber: 'AMX-990-EXP',
    supplier: 'Apex Healthcare Supply, Bengaluru',
    manufacturer: 'Cipla Therapeutics',
    availableQuantity: 4,
    unit: 'Bottles (100mL)',
    reorderThreshold: 6,
    unitCostINR: 78.0,
    mfgDate: 'Dec 2024',
    expiryDate: 'Nov 15, 2026',
    status: 'expiring_soon',
    storageLocation: 'Central Vault Shelf C-4',
  },
  {
    id: 'BAT-2026-03',
    sku: 'SKU-SSD-010',
    medicineName: 'Silver Sulfadiazine 1% Cream',
    genericName: 'Silver Sulfadiazine',
    strength: '1% w/w',
    dosageForm: 'Cream',
    batchNumber: 'SSD-774-REC',
    supplier: 'MedPharm India Ltd, Mumbai',
    manufacturer: 'Dr. Reddy\'s Laboratories',
    availableQuantity: 6,
    unit: 'Tubes (50g)',
    reorderThreshold: 10,
    unitCostINR: 110.0,
    mfgDate: 'May 2025',
    expiryDate: 'Apr 2027',
    status: 'quarantined',
    storageLocation: 'Quarantine Segregation Locker Q-1',
    quarantineReason: 'Manufacturer advisory: lot particulate segregation pending re-test.',
  },
  {
    id: 'BAT-2026-04',
    sku: 'SKU-INS-100',
    medicineName: 'Insulin Glargine (Lantus)',
    genericName: 'Insulin Glargine',
    strength: '100 units / mL',
    dosageForm: 'Vial / Injection',
    batchNumber: 'LAN-331-RCV',
    supplier: 'Anandam Central Cold Chain, Bengaluru',
    manufacturer: 'Sanofi India',
    availableQuantity: 2,
    unit: 'Vials (10mL)',
    reorderThreshold: 5,
    unitCostINR: 640.0,
    mfgDate: 'Mar 2025',
    expiryDate: 'Jun 2027',
    status: 'low_stock',
    storageLocation: 'Cold Chain Bio-Refrigerator 1 (2°C – 8°C)',
  },
  {
    id: 'BAT-2026-05',
    sku: 'SKU-LIS-010',
    medicineName: 'Lisinopril',
    genericName: 'Lisinopril',
    strength: '10mg',
    dosageForm: 'Tablet',
    batchNumber: 'LIS-991-IN',
    supplier: 'Apex Healthcare Supply, Bengaluru',
    manufacturer: 'Torrent Pharmaceuticals',
    availableQuantity: 120,
    unit: 'Tablets',
    reorderThreshold: 40,
    unitCostINR: 6.2,
    mfgDate: 'Feb 2025',
    expiryDate: 'Jan 2028',
    status: 'active',
    storageLocation: 'Central Vault Shelf B-3',
  },
  {
    id: 'BAT-2026-06',
    sku: 'SKU-AML-005',
    medicineName: 'Amlodipine Besylate',
    genericName: 'Amlodipine',
    strength: '5mg',
    dosageForm: 'Tablet',
    batchNumber: 'AML-441-B',
    supplier: 'Apex Healthcare Supply, Bengaluru',
    manufacturer: 'Cadila Pharmaceuticals',
    availableQuantity: 95,
    unit: 'Tablets',
    reorderThreshold: 30,
    unitCostINR: 3.5,
    mfgDate: 'Mar 2025',
    expiryDate: 'Feb 2028',
    status: 'active',
    storageLocation: 'Central Vault Shelf B-4',
  },
  {
    id: 'BAT-2026-07',
    sku: 'SKU-ATO-010',
    medicineName: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    strength: '10mg',
    dosageForm: 'Tablet',
    batchNumber: 'ATO-770-IN',
    supplier: 'Apex Healthcare Supply, Bengaluru',
    manufacturer: 'Lupin Ltd',
    availableQuantity: 80,
    unit: 'Tablets',
    reorderThreshold: 25,
    unitCostINR: 8.0,
    mfgDate: 'Apr 2025',
    expiryDate: 'Mar 2028',
    status: 'active',
    storageLocation: 'Central Vault Shelf B-2',
  },
  {
    id: 'BAT-2026-08',
    sku: 'SKU-DON-010',
    medicineName: 'Donepezil Hydrochloride',
    genericName: 'Donepezil',
    strength: '10mg',
    dosageForm: 'Tablet',
    batchNumber: 'DON-881-A',
    supplier: 'MedPharm India Ltd, Mumbai',
    manufacturer: 'Alkem Laboratories',
    availableQuantity: 60,
    unit: 'Tablets',
    reorderThreshold: 20,
    unitCostINR: 18.5,
    mfgDate: 'Jan 2025',
    expiryDate: 'Dec 2027',
    status: 'active',
    storageLocation: 'Central Vault Shelf A-1',
  },
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'PO-4412',
    orderDate: 'Today, 08:30 AM',
    expectedDelivery: 'Today, 14:00 PM (Emergency 4h Courier)',
    supplierName: 'Apex Healthcare Supply, Bengaluru',
    supplierContact: '+91 80 2553 9100 / orders@apexhealthcare.in.example',
    status: 'pending_approval',
    items: [
      { sku: 'SKU-MTF-500', medicineName: 'Metformin Hydrochloride ER', strength: '500mg', quantityOrdered: 200, unit: 'Tablets', unitPriceINR: 4.5, totalPriceINR: 900 },
      { sku: 'SKU-LIS-010', medicineName: 'Lisinopril', strength: '10mg', quantityOrdered: 100, unit: 'Tablets', unitPriceINR: 6.2, totalPriceINR: 620 },
    ],
    subtotalINR: 1520,
    taxINR: 182.4,
    totalAmountINR: 1702.4,
    notes: 'Urgent stock buffer replenishment for Metformin (Central Vault stock dropped below 20 tabs).',
  },
  {
    id: 'PO-4409',
    orderDate: 'Today, 07:15 AM',
    expectedDelivery: 'Today, 11:30 AM (Cold Chain Logistics)',
    supplierName: 'Anandam Central Cold Chain, Bengaluru',
    supplierContact: '+91 80 4120 7741 / coldchain@anandam-care.in.example',
    status: 'dispatched',
    items: [
      { sku: 'SKU-INS-100', medicineName: 'Insulin Glargine (Lantus)', strength: '100 units / mL', quantityOrdered: 10, unit: 'Vials (10mL)', unitPriceINR: 640.0, totalPriceINR: 6400 },
    ],
    subtotalINR: 6400,
    taxINR: 768,
    totalAmountINR: 7168,
    authorizedBy: 'Devika Ramanathan',
    authorizationDate: 'Today, 07:30 AM',
    notes: 'Cold chain temperature logger verified prior to dispatch. Transit range: 2°C – 8°C.',
  },
  {
    id: 'PO-4398',
    orderDate: 'Nov 04, 2026',
    expectedDelivery: 'Nov 06, 2026',
    supplierName: 'Apex Healthcare Supply, Bengaluru',
    supplierContact: '+91 80 2553 9100',
    status: 'received',
    items: [
      { sku: 'SKU-AML-005', medicineName: 'Amlodipine Besylate', strength: '5mg', quantityOrdered: 150, unit: 'Tablets', unitPriceINR: 3.5, totalPriceINR: 525 },
      { sku: 'SKU-ATO-010', medicineName: 'Atorvastatin', strength: '10mg', quantityOrdered: 100, unit: 'Tablets', unitPriceINR: 8.0, totalPriceINR: 800 },
    ],
    subtotalINR: 1325,
    taxINR: 159,
    totalAmountINR: 1484,
    authorizedBy: 'Devika Ramanathan',
    authorizationDate: 'Nov 04, 2026',
    receivedBy: 'Priya Shetty, RN',
    receivedDate: 'Nov 06, 2026',
    notes: 'Package intact, lot certificates and batch numbers reconciled with supplier invoice.',
  },
];

export const MOCK_STOCK_LEDGER: StockLedgerEntry[] = [
  {
    id: 'LED-001',
    timestamp: 'Today, 10:15 AM',
    sku: 'SKU-LIS-010',
    medicineName: 'Lisinopril 10mg',
    batchNumber: 'LIS-991-IN',
    type: 'dispense',
    quantityDelta: -1,
    balanceAfter: 120,
    actor: 'Priya Shetty, RN',
    reference: 'RX-2026-041 (Ananya Sharma)',
    notes: 'Routine scheduled morning dose preparation.',
  },
  {
    id: 'LED-002',
    timestamp: 'Today, 08:35 AM',
    sku: 'SKU-MTF-500',
    medicineName: 'Metformin ER 500mg',
    batchNumber: 'MTF-2026-B4',
    type: 'dispense',
    quantityDelta: -1,
    balanceAfter: 18,
    actor: 'Priya Shetty, RN',
    reference: 'RX-2026-042 (Ananya Sharma)',
    notes: 'Morning dose administered with breakfast.',
  },
  {
    id: 'LED-003',
    timestamp: 'Today, 08:05 AM',
    sku: 'SKU-AML-005',
    medicineName: 'Amlodipine Besylate 5mg',
    batchNumber: 'AML-441-B',
    type: 'dispense',
    quantityDelta: -1,
    balanceAfter: 95,
    actor: 'Deepak Gowda, NP',
    reference: 'RX-2026-044 (Raghavendra Kulkarni)',
    notes: 'Administered post-intake vital review.',
  },
  {
    id: 'LED-004',
    timestamp: 'Nov 08, 2026, 14:20 PM',
    sku: 'SKU-SSD-010',
    medicineName: 'Silver Sulfadiazine 1% Cream',
    batchNumber: 'SSD-774-REC',
    type: 'quarantine',
    quantityDelta: -6,
    balanceAfter: 0,
    actor: 'Devika Ramanathan',
    reference: 'MFG-ADV-9921',
    notes: 'Transferred 6 units from active shelf to Quarantine Locker Q-1 upon manufacturer notice.',
  },
  {
    id: 'LED-005',
    timestamp: 'Nov 06, 2026, 11:00 AM',
    sku: 'SKU-AML-005',
    medicineName: 'Amlodipine Besylate 5mg',
    batchNumber: 'AML-441-B',
    type: 'receipt',
    quantityDelta: 150,
    balanceAfter: 150,
    actor: 'Priya Shetty, RN',
    reference: 'PO-4398 Receipt',
    notes: 'Supplier shipment verified and added to usable vault.',
  },
];

MOCK_PURCHASE_ORDERS.forEach((po) => {
  po.orderNumber = po.id;
  po.supplier = po.supplierName;
  po.issuedDate = po.orderDate;
  po.totalItems = po.items.length;
  if (po.status === 'received') {
    po.status = 'Delivered';
  } else if (po.status === 'approved') {
    po.status = 'Issued';
  }
});

export const MOCK_INVENTORY_ITEMS: InventoryItem[] = MOCK_INVENTORY_BATCHES.map((b: MedicineBatch) => {
  let cat = 'Medical Consumables';
  if (b.medicineName.includes('Donepezil')) cat = 'Neurology / Dementia';
  else if (b.medicineName.includes('Amlodipine') || b.medicineName.includes('Lisinopril')) cat = 'Cardiovascular';
  else if (b.medicineName.includes('Metformin')) cat = 'Endocrinology';
  else if (b.medicineName.includes('Paracetamol')) cat = 'Analgesics & Antipyretics';

  let status: 'optimal' | 'low_stock' | 'critical' | 'quarantined' = 'optimal';
  if (b.status === 'quarantined') status = 'quarantined';
  else if (b.status === 'low_stock') status = 'low_stock';
  else if (b.availableQuantity <= b.reorderThreshold) status = 'low_stock';

  return {
    id: b.id,
    name: b.medicineName,
    sku: b.sku,
    category: cat,
    activeBatch: b.batchNumber,
    expiryDate: b.expiryDate,
    currentStock: b.availableQuantity,
    minThreshold: b.reorderThreshold,
    unitCostINR: b.unitCostINR,
    unit: b.unit,
    status,
  };
});

