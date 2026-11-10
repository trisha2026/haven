import { useState, useMemo } from 'react';
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  IndianRupee,
  Truck,
  ArrowDownToLine,
  Boxes,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/Table.tsx';
import {
  MOCK_INVENTORY_ITEMS,
  MOCK_PURCHASE_ORDERS,
  type InventoryItem,
  type PurchaseOrder,
} from '../../mock/inventoryData.ts';

export function AdminPharmacyInventoryPage() {
  useDocumentTitle('Pharmacy & Inventory Management — Administrator');

  // Active sub-tab: 'inventory' | 'orders'
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');

  // Inventory & PO states
  const [items, setItems] = useState<InventoryItem[]>(MOCK_INVENTORY_ITEMS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(MOCK_PURCHASE_ORDERS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState('all');

  // Modals
  const [isCreatePoOpen, setIsCreatePoOpen] = useState(false);
  const [isReceiveStockOpen, setIsReceiveStockOpen] = useState(false);
  const [selectedItemForQuarantine, setSelectedItemForQuarantine] = useState<InventoryItem | null>(null);

  // Form states
  const [poSupplier, setPoSupplier] = useState('MedPlus Wholesale Bengaluru');
  const [poAmount, setPoAmount] = useState('18500');
  const [receiveItemId, setReceiveItemId] = useState('');
  const [receiveQuantity, setReceiveQuantity] = useState('200');
  const [receiveBatchNo, setReceiveBatchNo] = useState('BATCH-2026-X1');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalStockValueINR = items.reduce((acc, it) => acc + it.currentStock * it.unitCostINR, 0);
  const lowStockCount = items.filter((it) => it.status === 'low_stock' || it.status === 'critical').length;
  const quarantinedCount = items.filter((it) => it.status === 'quarantined').length;
  const pendingOrdersCount = purchaseOrders.filter((po) => po.status === 'Issued').length;

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.activeBatch.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesStatus = selectedStockStatus === 'all' || item.status === selectedStockStatus;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [items, searchQuery, selectedCategory, selectedStockStatus]);

  // Handle Quarantine Toggle
  const handleToggleQuarantine = () => {
    if (!selectedItemForQuarantine) return;
    const willQuarantine = selectedItemForQuarantine.status !== 'quarantined';
    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedItemForQuarantine.id
          ? {
              ...it,
              status: willQuarantine ? 'quarantined' : 'optimal',
            }
          : it
      )
    );
    showToast(
      `${selectedItemForQuarantine.name} (${selectedItemForQuarantine.activeBatch}) is now ${
        willQuarantine ? 'Quarantined for Safety Audit' : 'Released for Clinical Dispensing'
      }.`
    );
    setSelectedItemForQuarantine(null);
  };

  // Handle Create Purchase Order
  const handleCreatePo = () => {
    const today = new Date().toISOString().split('T')[0];
    const amount = Number(poAmount) || 12000;
    const newPo: PurchaseOrder = {
      id: `po-${Date.now()}`,
      orderNumber: `PO-${Math.floor(4400 + Math.random() * 100)}`,
      orderDate: today,
      issuedDate: today,
      supplier: poSupplier,
      supplierName: poSupplier,
      supplierContact: '+91 80 2553 9100',
      totalItems: 3,
      items: [],
      subtotalINR: amount * 0.82,
      taxINR: amount * 0.18,
      totalAmountINR: amount,
      status: 'Issued',
      expectedDelivery: '3 Days',
    };
    setPurchaseOrders([newPo, ...purchaseOrders]);
    showToast(`Purchase order ${newPo.orderNumber} for ₹${newPo.totalAmountINR.toLocaleString('en-IN')} issued to ${poSupplier}.`);
    setIsCreatePoOpen(false);
  };

  // Handle Receive Goods
  const handleConfirmReceiveStock = () => {
    if (!receiveItemId) return;
    const item = items.find((i) => i.id === receiveItemId);
    if (!item) return;

    const qty = Number(receiveQuantity) || 100;
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? {
              ...i,
              currentStock: i.currentStock + qty,
              activeBatch: receiveBatchNo,
              status: 'optimal',
            }
          : i
      )
    );
    showToast(
      `Received ${qty} units of ${item.name}. Batch ${receiveBatchNo} verified and added to inventory ledger.`
    );
    setIsReceiveStockOpen(false);
    setReceiveItemId('');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#173B70] px-4 py-3 text-sm font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-[#3979D8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <Package className="h-3.5 w-3.5 text-[#2457C5]" />
              Pharmacy Supply Chain & Stock Control
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Pharmacy & Consumables Inventory
          </h1>
          <p className="text-sm text-[#4A5568]">
            FEFO batch tracking, procurement purchase orders, reorder thresholds, and quarantined lot management.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsReceiveStockOpen(true)}
          >
            <ArrowDownToLine className="mr-1.5 h-3.5 w-3.5" />
            Receive Stock
          </Button>

          <Button variant="default" size="sm" onClick={() => setIsCreatePoOpen(true)}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Create Purchase Order
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Total Inventory Value</span>
              <IndianRupee className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">
              ₹{totalStockValueINR.toLocaleString('en-IN')}
            </div>
            <div className="mt-0.5 text-xs text-[#718096]">{items.length} Active SKUs Catalogued</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Low Stock Alerts</span>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">{lowStockCount}</div>
            <div className="mt-0.5 text-xs text-amber-700">Below Safety Threshold</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Quarantined Batches</span>
              <ShieldAlert className="h-4 w-4 text-rose-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-rose-700">{quarantinedCount}</div>
            <div className="mt-0.5 text-xs text-rose-700">Recall / Verification</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Active Orders</span>
              <Truck className="h-4 w-4 text-[#3979D8]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{pendingOrdersCount}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Awaiting Delivery</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E6ECF4]">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'inventory'
              ? 'border-[#2457C5] text-[#173B70]'
              : 'border-transparent text-[#718096] hover:text-[#173B70]'
          }`}
        >
          <Boxes className="h-4 w-4" />
          Stock Items & Batches ({items.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'orders'
              ? 'border-[#2457C5] text-[#173B70]'
              : 'border-transparent text-[#718096] hover:text-[#173B70]'
          }`}
        >
          <Truck className="h-4 w-4" />
          Purchase Orders ({purchaseOrders.length})
        </button>
      </div>

      {activeTab === 'inventory' ? (
        <div className="space-y-4">
          {/* Filters */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
                  <Input
                    placeholder="Search medication, SKU, batch..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>

                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs"
                >
                  <option value="all">All Categories</option>
                  <option value="Neurology / Dementia">Neurology / Dementia</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Analgesics & Antipyretics">Analgesics & Antipyretics</option>
                  <option value="Medical Consumables">Medical Consumables</option>
                </Select>

                <Select
                  value={selectedStockStatus}
                  onChange={(e) => setSelectedStockStatus(e.target.value)}
                  className="text-xs"
                >
                  <option value="all">All Stock Statuses</option>
                  <option value="optimal">Optimal Stock</option>
                  <option value="low_stock">Low Stock (Reorder Needed)</option>
                  <option value="quarantined">Quarantined Lots</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU & Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Active Batch & Expiry (FEFO)</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Unit Cost (INR)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  const isLow = item.status === 'low_stock' || item.status === 'critical';
                  const isQuarantined = item.status === 'quarantined';

                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-semibold text-[#173B70]">{item.name}</div>
                        <div className="text-xs font-mono text-[#718096]">{item.sku}</div>
                      </TableCell>
                      <TableCell className="text-xs text-[#4A5568]">{item.category}</TableCell>
                      <TableCell>
                        <div className="font-mono text-xs font-semibold text-[#173B70]">
                          {item.activeBatch}
                        </div>
                        <div className="text-[11px] text-[#718096]">Exp: {item.expiryDate}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-[#173B70]">
                          {item.currentStock} {item.unit}
                        </div>
                        <div className="text-[11px] text-[#718096]">
                          Min Threshold: {item.minThreshold} {item.unit}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-[#173B70]">
                        ₹{item.unitCostINR.toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            isQuarantined ? 'danger' : isLow ? 'warning' : 'success'
                          }
                          className="capitalize"
                        >
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 text-xs ${
                              isQuarantined
                                ? 'text-emerald-700 hover:bg-emerald-50'
                                : 'text-rose-700 hover:bg-rose-50'
                            }`}
                            onClick={() => setSelectedItemForQuarantine(item)}
                          >
                            {isQuarantined ? 'Release' : 'Quarantine'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      ) : (
        /* Purchase Orders Tab */
        <div className="space-y-4">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Issued Date</TableHead>
                  <TableHead>Total Items</TableHead>
                  <TableHead>Order Amount (INR)</TableHead>
                  <TableHead>Delivery SLA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-mono text-xs font-semibold text-[#173B70]">
                      {po.orderNumber || po.id}
                    </TableCell>
                    <TableCell className="font-medium text-xs text-[#173B70]">{po.supplier || po.supplierName}</TableCell>
                    <TableCell className="text-xs text-[#4A5568]">{po.issuedDate || po.orderDate}</TableCell>
                    <TableCell className="text-xs text-[#4A5568]">{po.totalItems || po.items.length} SKUs</TableCell>
                    <TableCell className="text-xs font-bold text-[#173B70]">
                      ₹{po.totalAmountINR.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-xs text-[#718096]">{po.expectedDelivery}</TableCell>
                    <TableCell>
                      <Badge variant={po.status === 'Delivered' ? 'success' : 'default'}>
                        {po.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {po.status === 'Issued' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => {
                            setPurchaseOrders((prev) =>
                              prev.map((p) =>
                                p.id === po.id ? { ...p, status: 'Delivered' } : p
                              )
                            );
                            showToast(`Order ${po.orderNumber || po.id} marked as Delivered & Stocked.`);
                          }}
                        >
                          Mark Delivered
                        </Button>
                      ) : (
                        <span className="text-xs text-[#718096]">Archived</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {/* Create Purchase Order Dialog */}
      <Dialog open={isCreatePoOpen} onOpenChange={setIsCreatePoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Issue Pharmacy Purchase Order</DialogTitle>
            <DialogDescription>
              Create replenishment order for low-stock clinical formulations and consumables.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Distributor / Supplier</label>
              <Select
                value={poSupplier}
                onChange={(e) => setPoSupplier(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="MedPlus Wholesale Bengaluru">MedPlus Wholesale Bengaluru</option>
                <option value="Apollo Pharmacy Distribution, Koramangala">Apollo Pharmacy Distribution</option>
                <option value="Karnataka Medical Supplies Corporation (KMSCL)">KMSCL State Depot</option>
                <option value="3M Healthcare India Ltd">3M Healthcare India Ltd</option>
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#173B70]">Estimated Invoice Amount (₹ INR)</label>
              <Input
                type="number"
                value={poAmount}
                onChange={(e) => setPoAmount(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-2.5 text-xs text-[#4A5568]">
              <span className="font-semibold text-[#173B70]">Auto-replenishment Batch</span>
              <p className="mt-0.5">
                Will auto-attach SKUs currently below reorder thresholds: Donepezil 10mg (SKU-MED-101), Nitrile Gloves L (SKU-CON-401).
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsCreatePoOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleCreatePo}>
              Issue Purchase Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receive Stock Dialog */}
      <Dialog open={isReceiveStockOpen} onOpenChange={setIsReceiveStockOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Receive Shipment into Inventory</DialogTitle>
            <DialogDescription>
              Inspect and enter batch numbers, quantities and COA certificates into the ledger.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Select Item / Formulation</label>
              <Select
                value={receiveItemId}
                onChange={(e) => setReceiveItemId(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="">Select stock item...</option>
                {items.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name} ({i.sku})
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Quantity Received</label>
                <Input
                  type="number"
                  value={receiveQuantity}
                  onChange={(e) => setReceiveQuantity(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Batch / Lot Number</label>
                <Input
                  value={receiveBatchNo}
                  onChange={(e) => setReceiveBatchNo(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsReceiveStockOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={!receiveItemId}
              onClick={handleConfirmReceiveStock}
            >
              Confirm Goods Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quarantine Confirmation Dialog */}
      <Dialog
        open={Boolean(selectedItemForQuarantine)}
        onOpenChange={(open) => !open && setSelectedItemForQuarantine(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedItemForQuarantine?.status === 'quarantined'
                ? 'Release Lot from Quarantine'
                : 'Quarantine Lot for Clinical Safety Audit'}
            </DialogTitle>
            <DialogDescription>
              {selectedItemForQuarantine?.name} (Batch {selectedItemForQuarantine?.activeBatch})
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 text-xs text-[#4A5568]">
            <p>
              Quarantined items cannot be dispensed via the eMAR system. An automated alert will be sent to the Medical Director and head pharmacist.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedItemForQuarantine(null)}
            >
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleToggleQuarantine}>
              Confirm Safety Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
