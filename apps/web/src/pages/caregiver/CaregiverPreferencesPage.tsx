import { useState } from 'react';
import {
  SlidersHorizontal,
  Bell,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Select } from '../../components/ui/Select.tsx';

export function CaregiverPreferencesPage() {
  useDocumentTitle('Staff Preferences & Display — Caregiver');

  const [soundAlerts, setSoundAlerts] = useState(true);
  const [criticalVibration, setCriticalVibration] = useState(true);
  const [density, setDensity] = useState('comfortable');
  const [medReminderWindow, setMedReminderWindow] = useState('15');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Preferences saved successfully.');
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
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#2457C5]" />
              Workstation Settings
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Caregiver Preferences
          </h1>
          <p className="text-sm text-[#4A5568]">
            Configure bedside medication reminder alerts, display density, and notification channels for your shift.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Medication Alert Reminders */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
              <CardTitle className="text-sm font-bold text-[#173B70] flex items-center gap-2">
                <Bell className="h-4 w-4 text-[#2457C5]" />
                Medication & Task Alert Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">
                  Advance Dosing Reminder Window
                </label>
                <Select
                  value={medReminderWindow}
                  onChange={(e) => setMedReminderWindow(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="10">10 Minutes Before Scheduled Slot</option>
                  <option value="15">15 Minutes Before Scheduled Slot (Recommended)</option>
                  <option value="30">30 Minutes Before Scheduled Slot</option>
                </Select>
                <p className="text-[11px] text-[#64748B] mt-1">
                  Alerts you on Garden Terrace nursing station before medication rounds commence.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6ECF4] space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="font-semibold text-[#173B70]">Audible Chime for Overdue Doses</div>
                    <div className="text-[11px] text-[#64748B]">Play sound when a dose passes scheduled round</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundAlerts}
                    onChange={(e) => setSoundAlerts(e.target.checked)}
                    className="rounded border-[#E6ECF4] text-[#2457C5] focus:ring-[#2457C5]"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="font-semibold text-[#173B70]">Emergency Assignment Haptic Pulse</div>
                    <div className="text-[11px] text-[#64748B]">Vibrate tablet on high-priority cross-coverage alerts</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={criticalVibration}
                    onChange={(e) => setCriticalVibration(e.target.checked)}
                    className="rounded border-[#E6ECF4] text-[#2457C5] focus:ring-[#2457C5]"
                  />
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Interface & Regional Defaults */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="border-b border-[#E6ECF4] px-5 py-4">
              <CardTitle className="text-sm font-bold text-[#173B70] flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#2457C5]" />
                Regional & Interface Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4 text-xs">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Display Density</label>
                <Select
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="comfortable">Comfortable (Touch Tablet Friendly)</option>
                  <option value="compact">Compact (Higher Data Density)</option>
                </Select>
              </div>

              <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF] p-3 space-y-1.5 text-xs text-[#173B70]">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Clinical Timezone:</span>
                  <span className="font-bold">Asia/Kolkata (IST · UTC+05:30)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Date Formatting:</span>
                  <span className="font-bold">DD/MM/YYYY (Indian Standard)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Currency Unit:</span>
                  <span className="font-bold">INR (₹ Indian Rupee)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="default" size="sm" className="bg-[#173B70] text-white hover:bg-[#2457C5]">
            Save Preference Configurations
          </Button>
        </div>
      </form>
    </div>
  );
}
