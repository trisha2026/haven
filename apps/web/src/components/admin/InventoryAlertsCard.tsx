import { useNavigate } from 'react-router';
import {
  Package,
  ArrowRight,
  ShieldCheck,
  ClockAlert,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import { EmptyState } from '../ui/EmptyState.tsx';
import {
  MOCK_INVENTORY_ALERTS,
} from '../../mock/adminDashboard.ts';
import { cn } from '../../utils/cn.ts';

export function InventoryAlertsCard() {
  const navigate = useNavigate();

  return (
    <Card variant="default" padding="lg" className="shadow-haven-card">
      {/* Header */}
      <CardHeader className="pb-4 border-b border-haven-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <CardTitle as="h3" className="text-lg">Pharmacy &amp; Inventory Alerts</CardTitle>
              <Badge variant="warning" size="sm">
                {MOCK_INVENTORY_ALERTS.length} Stock Exceptions
              </Badge>
            </div>
            <CardDescription>
              Buffer threshold monitors, cold-chain deliveries, and batch expiry tracking.
            </CardDescription>
          </div>

          <Button
            variant="ghost"
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => navigate('/admin/pharmacy')}
          >
            Inventory Vault
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-5 space-y-4">
        {/* Compliance & Usable Stock Rule Pill */}
        <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border text-xs text-haven-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-haven-success shrink-0" />
            <span>
              <strong>Inventory Integrity Rule:</strong> Recalled, quarantined, and expired items are mathematically segregated from usable dispensing stock.
            </span>
          </div>
          <span className="text-[11px] font-mono text-haven-slate-500 shrink-0">
            Vault Sync: 12m ago
          </span>
        </div>

        {/* Alerts Grid */}
        {MOCK_INVENTORY_ALERTS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {MOCK_INVENTORY_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  'p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3',
                  alert.severity === 'critical'
                    ? 'bg-haven-danger-soft/20 border-haven-danger-border'
                    : alert.severity === 'warning'
                    ? 'bg-haven-warning-soft/20 border-haven-warning-border'
                    : 'bg-white border-haven-border'
                )}
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm text-haven-slate-900 leading-snug">
                      {alert.medicineName}
                    </span>
                    <Badge
                      variant={
                        alert.severity === 'critical'
                          ? 'danger'
                          : alert.severity === 'warning'
                          ? 'warning'
                          : 'info'
                      }
                      size="sm"
                      dot
                    >
                      {alert.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-haven-slate-500">
                    <span>Batch: <strong className="font-mono text-haven-slate-900">{alert.batchNumber}</strong></span>
                    <span>Stock: <strong className="text-haven-slate-900">{alert.currentStock} {alert.unit}</strong></span>
                    {alert.minimumThreshold > 0 && (
                      <span className="text-[11px] text-haven-slate-500">(Min: {alert.minimumThreshold})</span>
                    )}
                  </div>

                  {alert.expiryDate && (
                    <div className="flex items-center gap-1.5 text-xs text-haven-warning font-medium">
                      <ClockAlert className="w-3.5 h-3.5" />
                      <span>Expires: {alert.expiryDate}</span>
                    </div>
                  )}

                  <p className="text-xs text-haven-slate-700 bg-white/70 p-2 rounded-lg border border-haven-border-light">
                    {alert.actionPrompt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-haven-border-light text-xs">
                  <span className="text-[11px] text-haven-slate-500 truncate">
                    Supplier: {alert.supplier}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/admin/pharmacy')}
                  >
                    Manage →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            compact
            icon={<ShieldCheck className="w-6 h-6 text-haven-success" />}
            title="All Pharmacy Stocks Within Optimal Bounds"
            description="No low inventory alerts, expiring lots, or pending purchase receipts."
          />
        )}
      </CardContent>
    </Card>
  );
}
