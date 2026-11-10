import { useState } from 'react';
import {
  Boxes,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Package,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import {
  MOCK_FLOOR_STOCK,
  MOCK_STOCK_CONSUMPTION_LOG,
  MOCK_REPLENISHMENT_REQUESTS,
  ACTIVE_CAREGIVER,
  type FloorStockItem,
  type StockConsumptionEntry,
  type StockReplenishmentRequest,
} from '../../mock/caregiverWorkspaceData.ts';

export function CaregiverInventoryPage() {
  useDocumentTitle('Floor Stock & Supplies — Caregiver');

  // State
  const [stockItems, setStockItems] = useState<FloorStockItem[]>(MOCK_FLOOR_STOCK);
  const [consumptionLogs, setConsumptionLogs] = useState<StockConsumptionEntry[]>(MOCK_STOCK_CONSUMPTION_LOG);
  const [replenishmentRequests, setReplenishmentRequests] = useState<StockReplenishmentRequest[]>(MOCK_REPLENISHMENT_REQUESTS);

  // Modals
  const [isLogConsumptionOpen, setIsLogConsumptionOpen] = useState(false);
  const [isRequestReplenishOpen, setIsRequestReplenishOpen] = useState(false);
  const [isReportDamageOpen, setIsReportDamageOpen] = useState(false);

  // Consumption Form
  const [selectedStockId, setSelectedStockId] = useState(stockItems[0]?.id || '');
  const [consumedQuantity, setConsumedQuantity] = useState('1');
  const [selectedResident, setSelectedResident] = useState('Ananya Sharma (Room 204-B)');
  const [consumptionPurpose, setConsumptionPurpose] = useState('Routine nursing care');

  // Replenishment Form
  const [replenishItemName, setReplenishItemName] = useState(stockItems[0]?.name || '');
  const [replenishQty, setReplenishQty] = useState('10');
  const [replenishUrgency, setReplenishUrgency] = useState<'routine' | 'urgent'>('routine');
  const [replenishReason, setReplenishReason] = useState('');

  // Damage Form
  const [damagedItem, setDamagedItem] = useState(stockItems[0]?.name || '');
  const [damagedQty, setDamagedQty] = useState('1');
  const [damageReason, setDamageReason] = useState('Packaging seal breached on transit');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPIs
  const totalFloorItems = stockItems.length;
  const lowStockCount = stockItems.filter((i) => i.status === 'low' || i.status === 'critical').length;
  const pendingRequestsCount = replenishmentRequests.filter((r) => r.status === 'pending_review').length;

  const filteredItems = stockItems.filter(
    (i) =>
      !searchQuery ||
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Log Consumption
  const handleConfirmConsumption = (e: React.FormEvent) => {
    e.preventDefault();
    const item = stockItems.find((s) => s.id === selectedStockId);
    if (!item) return;

    const qty = parseInt(consumedQuantity, 10) || 1;
    if (qty > item.currentStock) {
      showToast('Consumption quantity cannot exceed available floor stock.');
      return;
    }

    // Deduct stock
    setStockItems((prev) =>
      prev.map((s) =>
        s.id === item.id
          ? {
              ...s,
              currentStock: s.currentStock - qty,
              status: s.currentStock - qty <= s.minThreshold ? 'low' : 'optimal',
            }
          : s
      )
    );

    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const newLog: StockConsumptionEntry = {
      id: `LOG-CON-${Date.now()}`,
      timestamp: `Today, ${now} IST`,
      itemName: item.name,
      quantityUsed: qty,
      unit: item.unit,
      residentName: selectedResident.split('(')[0].trim(),
      room: selectedResident.split('(')[1]?.replace(')', '') || 'Garden Terrace',
      purpose: consumptionPurpose,
      caregiverName: ACTIVE_CAREGIVER.fullName,
    };

    setConsumptionLogs((prev) => [newLog, ...prev]);
    setIsLogConsumptionOpen(false);
    showToast(`Logged consumption of ${qty} ${item.unit} for ${item.name}.`);
  };

  // Handle Request Replenish
  const handleConfirmReplenish = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(replenishQty, 10) || 5;

    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const newReq: StockReplenishmentRequest = {
      id: `REQ-STK-0${replenishmentRequests.length + 10}`,
      requestedAt: `Today, ${now} IST`,
      itemName: replenishItemName,
      quantityRequested: qty,
      unit: 'Units',
      urgency: replenishUrgency,
      reason: replenishReason || 'Floor stock approaching minimum reserve.',
      status: 'pending_review',
      requestedBy: ACTIVE_CAREGIVER.fullName,
    };

    setReplenishmentRequests((prev) => [newReq, ...prev]);
    setIsRequestReplenishOpen(false);
    setReplenishReason('');
    showToast(`Stock replenishment request ${newReq.id} transmitted to Central Pharmacy.`);
  };

  // Handle Report Damaged
  const handleConfirmDamage = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(damagedQty, 10) || 1;
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newLog: StockConsumptionEntry = {
      id: `LOG-DMG-${Date.now()}`,
      timestamp: `Today, ${now} IST`,
      itemName: damagedItem,
      quantityUsed: qty,
      unit: 'Units',
      purpose: `DAMAGED / WRITTEN OFF: ${damageReason}`,
      caregiverName: ACTIVE_CAREGIVER.fullName,
    };

    setConsumptionLogs((prev) => [newLog, ...prev]);
    setIsReportDamageOpen(false);
    showToast(`Damaged stock logged and reported to pharmacy dispatch.`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#173B70] px-4 py-3 text-sm font-medium text-white shadow-xl animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <Boxes className="h-3.5 w-3.5 text-[#2457C5]" />
              Garden Terrace Nursing Station
            </span>
            <span className="text-xs text-[#64748B]">Floor 2 Supply Cabinet</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Floor Stock & Supply Handling
          </h1>
          <p className="text-sm text-[#4A5568]">
            Log daily bedside supply consumption, report damaged articles, and request restocking from Central Pharmacy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setIsReportDamageOpen(true)}
          >
            Report Damaged
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[#2457C5] text-[#2457C5] hover:bg-[#F4F8FF]"
            onClick={() => setIsRequestReplenishOpen(true)}
          >
            Request Replenishment
          </Button>
          <Button
            variant="default"
            size="sm"
            className="text-xs bg-[#173B70] text-white hover:bg-[#2457C5]"
            onClick={() => setIsLogConsumptionOpen(true)}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Log Stock Usage
          </Button>
        </div>
      </div>

      {/* Role Restriction Banner */}
      <div className="rounded-xl border border-[#E6ECF4] bg-[#F4F8FF] p-4 text-xs text-[#173B70]">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 text-[#2457C5] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Role-Based Inventory Boundary:</span> Caregiver access is strictly limited to recording floor consumption and submitting replenishment requests. Supplier management, purchase-order issuance, independent batch releasing, and master pharmacy catalog editing are governed exclusively by Facility Administrators and Licensed Pharmacists.
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Station Stock Items</span>
            <Boxes className="h-4 w-4 text-[#2457C5]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalFloorItems}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Garden Terrace Cabinet</div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Low Stock Items</span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-700">{lowStockCount}</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Below station minimum</div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Pending Restock</span>
            <Package className="h-4 w-4 text-[#3979D8]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#3979D8]">{pendingRequestsCount}</div>
          <div className="text-[11px] text-[#3979D8] mt-0.5">Sent to Central Pharmacy</div>
        </Card>

        <Card className="border-[#E6ECF4] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
            <span>Usage Logs Today</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-700">{consumptionLogs.length}</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Audit compliant entries</div>
        </Card>
      </div>

      {/* Stock Items Table */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6ECF4] px-5 py-4 gap-3">
          <CardTitle className="text-base font-bold text-[#173B70]">
            Floor Stock Inventory
          </CardTitle>
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search items, categories, drawers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs"
            />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="border-b border-[#E6ECF4] bg-[#F4F8FF] text-[#173B70] font-semibold">
              <tr>
                <th className="p-3.5">Article Name & SKU</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Station Location</th>
                <th className="p-3.5">Available Stock</th>
                <th className="p-3.5">Min Reserve</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECF4]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#F4F8FF]/30 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-[#173B70]">{item.name}</div>
                    <div className="text-[11px] text-[#64748B]">{item.sku}</div>
                  </td>
                  <td className="p-3.5 text-[#334155]">{item.category}</td>
                  <td className="p-3.5 text-[#64748B]">{item.location}</td>
                  <td className="p-3.5 font-bold text-[#173B70]">
                    {item.currentStock} {item.unit}
                  </td>
                  <td className="p-3.5 text-[#64748B]">
                    {item.minThreshold} {item.unit}
                  </td>
                  <td className="p-3.5">
                    <Badge
                      variant={item.status === 'optimal' ? 'success' : 'warning'}
                      className="capitalize text-[10px]"
                    >
                      {item.status === 'optimal' ? 'Sufficient' : 'Low Stock'}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => {
                        setSelectedStockId(item.id);
                        setIsLogConsumptionOpen(true);
                      }}
                    >
                      Log Usage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Grid: Consumption Logs & Replenishment Requests */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Consumption Logs */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
            <CardTitle className="text-sm font-bold text-[#173B70]">
              Shift Consumption Ledger
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E6ECF4]">
              {consumptionLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3.5 text-xs hover:bg-[#F4F8FF]/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#173B70]">{log.itemName}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {log.quantityUsed} {log.unit}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    {log.residentName ? `For: ${log.residentName} (${log.room}) · ` : ''}
                    {log.timestamp}
                  </div>
                  <div className="text-[11px] text-[#334155] mt-1">{log.purpose}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Replenishment Requests */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
            <CardTitle className="text-sm font-bold text-[#173B70]">
              Pharmacy Restock Requisitions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E6ECF4]">
              {replenishmentRequests.map((req) => (
                <div key={req.id} className="p-3.5 text-xs hover:bg-[#F4F8FF]/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#173B70]">{req.itemName}</span>
                      <span className="text-[11px] text-[#64748B] ml-2">
                        Qty: {req.quantityRequested} {req.unit}
                      </span>
                    </div>
                    <Badge
                      variant={req.status === 'delivered' ? 'success' : 'warning'}
                      className="text-[10px] capitalize"
                    >
                      {req.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    {req.id} · Requested {req.requestedAt} · Urgency: <span className="capitalize font-semibold text-[#173B70]">{req.urgency}</span>
                  </div>
                  <div className="text-[11px] text-[#334155] mt-1">{req.reason}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log Consumption Modal */}
      <Dialog open={isLogConsumptionOpen} onOpenChange={setIsLogConsumptionOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleConfirmConsumption}>
            <DialogHeader>
              <DialogTitle>Record Bedside Supply Usage</DialogTitle>
              <DialogDescription>
                Deduct consumed supplies from the Garden Terrace station inventory.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-2 text-xs">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Select Stock Item *</label>
                <Select
                  value={selectedStockId}
                  onChange={(e) => setSelectedStockId(e.target.value)}
                  className="mt-1 text-xs"
                >
                  {stockItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.currentStock} {item.unit} available)
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Quantity Used *</label>
                <Input
                  type="number"
                  min="1"
                  required
                  value={consumedQuantity}
                  onChange={(e) => setConsumedQuantity(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Resident Beneficiary</label>
                <Select
                  value={selectedResident}
                  onChange={(e) => setSelectedResident(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="Ananya Sharma (Room 204-B)">Ananya Sharma (Room 204-B)</option>
                  <option value="Meera Krishnan (Room 201-A)">Meera Krishnan (Room 201-A)</option>
                  <option value="Parvati Sundararajan (Room 201-B)">Parvati Sundararajan (Room 201-B)</option>
                  <option value="Revathi Sampath (Room 204-A)">Revathi Sampath (Room 204-A)</option>
                  <option value="Raghavendra Kulkarni (Room 108-A)">Raghavendra Kulkarni (Room 108-A Standby)</option>
                  <option value="General Station Maintenance">General Station Replenishment</option>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Purpose / Context</label>
                <Input
                  value={consumptionPurpose}
                  onChange={(e) => setConsumptionPurpose(e.target.value)}
                  placeholder="e.g. Morning dressing change, hydration routine"
                  className="mt-1 text-xs"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsLogConsumptionOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm">
                Commit Usage
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Replenish Request Modal */}
      <Dialog open={isRequestReplenishOpen} onOpenChange={setIsRequestReplenishOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleConfirmReplenish}>
            <DialogHeader>
              <DialogTitle>Request Pharmacy Restock</DialogTitle>
              <DialogDescription>
                Dispatch an electronic restocking requisition to the Central Pharmacy dispatch desk.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-2 text-xs">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Supply Item *</label>
                <Select
                  value={replenishItemName}
                  onChange={(e) => setReplenishItemName(e.target.value)}
                  className="mt-1 text-xs"
                >
                  {stockItems.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#173B70]">Quantity Needed *</label>
                  <Input
                    type="number"
                    min="1"
                    required
                    value={replenishQty}
                    onChange={(e) => setReplenishQty(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#173B70]">Urgency</label>
                  <Select
                    value={replenishUrgency}
                    onChange={(e) => setReplenishUrgency(e.target.value as 'routine' | 'urgent')}
                    className="mt-1 text-xs"
                  >
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Restock Justification *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="State reason (e.g. 5 packages remaining, wound change scheduled)..."
                  value={replenishReason}
                  onChange={(e) => setReplenishReason(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E6ECF4] p-2 text-xs text-[#334155] focus:outline-hidden focus:border-[#2457C5]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsRequestReplenishOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm">
                Transmit Requisition
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Report Damage Modal */}
      <Dialog open={isReportDamageOpen} onOpenChange={setIsReportDamageOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleConfirmDamage}>
            <DialogHeader>
              <DialogTitle className="text-rose-900">Report Damaged / Expired Stock</DialogTitle>
              <DialogDescription>
                Flag damaged or compromised supply items for write-off and return to pharmacy.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 py-2 text-xs">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Item *</label>
                <Select
                  value={damagedItem}
                  onChange={(e) => setDamagedItem(e.target.value)}
                  className="mt-1 text-xs"
                >
                  {stockItems.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Damaged Quantity *</label>
                <Input
                  type="number"
                  min="1"
                  required
                  value={damagedQty}
                  onChange={(e) => setDamagedQty(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Defect / Damage Reason *</label>
                <textarea
                  rows={2}
                  required
                  value={damageReason}
                  onChange={(e) => setDamageReason(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E6ECF4] p-2 text-xs text-[#334155] focus:outline-hidden focus:border-[#2457C5]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsReportDamageOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm" className="bg-rose-600 hover:bg-rose-700 text-white">
                Log Damage & Notify Pharmacy
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
