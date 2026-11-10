import { useState } from 'react';
import {
  SlidersHorizontal,
  Bell,
  Eye,
  Globe,
  CheckCircle2,
  Save,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card.tsx';
import { Select } from '../../components/ui/Select.tsx';

export function AdminPreferencesPage() {
  useDocumentTitle('System Preferences — HAVEN Administrator');

  // Preferences state
  const [layoutDensity, setLayoutDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST +05:30)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [currency, setCurrency] = useState('INR (₹)');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = () => {
    showToast('Administrator user preferences saved successfully.');
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
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#2457C5]" />
              Display & Alert Channels
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            System & Display Preferences
          </h1>
          <p className="text-sm text-[#4A5568]">
            Configure your interface layout, alert dispatches, and Indian locale formatting preferences.
          </p>
        </div>

        <Button variant="default" size="sm" onClick={handleSave}>
          <Save className="mr-1.5 h-3.5 w-3.5" />
          Save Preferences
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Visual & Theme Preferences */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#2457C5]" />
              <CardTitle className="text-sm font-bold text-[#173B70]">Display & Visual Theme</CardTitle>
            </div>
            <CardDescription className="text-xs">
              HAVEN approved Royal Blue & Ice Blue v2.0 palette settings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-2 space-y-4 text-xs">
            <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#173B70]">Current Color Palette</span>
                <p className="text-[#718096] text-[11px]">Approved Royal Blue & Ice Blue Design System v2.0</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full bg-[#173B70]" title="Navy #173B70" />
                <span className="h-4 w-4 rounded-full bg-[#2457C5]" title="Royal Blue #2457C5" />
                <span className="h-4 w-4 rounded-full bg-[#3979D8]" title="Ice Blue Accent #3979D8" />
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#173B70]">Table & Grid Density</label>
              <Select
                value={layoutDensity}
                onChange={(e) => setLayoutDensity(e.target.value as 'comfortable' | 'compact')}
                className="mt-1 text-xs"
              >
                <option value="comfortable">Comfortable (Standard Touch-Friendly Spacing)</option>
                <option value="compact">Compact (High Information Density for Large Displays)</option>
              </Select>
            </div>

            <div className="pt-2 border-t border-[#E6ECF4]">
              <span className="font-semibold text-[#173B70]">Typography</span>
              <p className="text-[#4A5568] mt-0.5">Plus Jakarta Sans font family with high legibility optical sizes.</p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Channel Preferences */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#2457C5]" />
              <CardTitle className="text-sm font-bold text-[#173B70]">Alert Delivery Channels</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Manage how critical notifications are routed to your mobile and inbox
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-2 space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-[#E6ECF4]">
              <div>
                <span className="font-semibold text-[#173B70]">Critical Incident SMS Dispatches</span>
                <p className="text-[#718096] text-[11px]">Immediate SMS to +91 98450 11200 for Tier 1 falls and acute surges</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-[#E6ECF4] text-[#2457C5] focus:ring-[#2457C5]"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#E6ECF4]">
              <div>
                <span className="font-semibold text-[#173B70]">Daily Census & Handover Digest</span>
                <p className="text-[#718096] text-[11px]">Automated shift-change summary emailed at 07:00 and 15:00 IST</p>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="h-4 w-4 rounded border-[#E6ECF4] text-[#2457C5] focus:ring-[#2457C5]"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="font-semibold text-[#173B70]">eMAR Overdue Audio Alerts</span>
                <p className="text-[#718096] text-[11px]">Audible chime when a high-risk medication exceeds 30 min window</p>
              </div>
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-[#E6ECF4] text-[#2457C5] focus:ring-[#2457C5]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Regional & Locale Settings */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs lg:col-span-2">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#2457C5]" />
              <CardTitle className="text-sm font-bold text-[#173B70]">Regional & Locale Standards</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Indian facility localization defaults for timestamps, dates and currency
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
              <div>
                <label className="font-semibold text-[#173B70]">Standard Timezone</label>
                <Select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="Asia/Kolkata (IST +05:30)">Asia/Kolkata (IST +05:30)</option>
                </Select>
              </div>

              <div>
                <label className="font-semibold text-[#173B70]">Date Format</label>
                <Select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY (Indian Standard)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (ISO 8601)</option>
                </Select>
              </div>

              <div>
                <label className="font-semibold text-[#173B70]">Currency Format</label>
                <Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="INR (₹)">INR (₹ - Indian Rupee with Lakhs/Crores)</option>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
