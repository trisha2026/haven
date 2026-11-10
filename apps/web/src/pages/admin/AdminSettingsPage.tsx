import { useState } from 'react';
import {
  Settings,
  Building2,
  BedDouble,
  Clock,
  ShieldCheck,
  Bell,
  RotateCcw,
  CheckCircle2,
  Save,
  Lock,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import {
  MOCK_ADMIN_SETTINGS,
  type FacilitySettingsState,
} from '../../mock/adminSettingsData.ts';

export function AdminSettingsPage() {
  useDocumentTitle('Facility Settings & Policies — Administrator');

  // Settings State
  const [settings, setSettings] = useState<FacilitySettingsState>(MOCK_ADMIN_SETTINGS);

  // Active section tab
  const [activeTab, setActiveTab] = useState<
    'facility' | 'wings' | 'rooms' | 'shifts' | 'ratios' | 'security' | 'clinical' | 'demo'
  >('facility');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveSettings = () => {
    showToast('Facility configuration parameters saved and synced across active stations.');
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all demo state back to canonical Bengaluru facility defaults?')) {
      setSettings(MOCK_ADMIN_SETTINGS);
      showToast('Demo dataset reset to initial state.');
    }
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
              <Settings className="h-3.5 w-3.5 text-[#2457C5]" />
              Facility Governance & Global Config
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Administrator System Settings
          </h1>
          <p className="text-sm text-[#4A5568]">
            Configure facility entity credentials, care wing divisions, tariffs in ₹ INR, staffing ratios, and clinical SLAs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="default" size="sm" onClick={handleSaveSettings}>
            <Save className="mr-1.5 h-3.5 w-3.5" />
            Save Configuration
          </Button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E6ECF4] pb-3">
        <button
          onClick={() => setActiveTab('facility')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'facility'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          Facility Profile
        </button>

        <button
          onClick={() => setActiveTab('wings')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'wings'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          Wings & Floors
        </button>

        <button
          onClick={() => setActiveTab('rooms')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'rooms'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <BedDouble className="h-3.5 w-3.5" />
          Room Tariffs (INR)
        </button>

        <button
          onClick={() => setActiveTab('shifts')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'shifts'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          Shift Schedules
        </button>

        <button
          onClick={() => setActiveTab('ratios')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'ratios'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Staffing Minimums
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'security'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <Lock className="h-3.5 w-3.5" />
          Security & Access
        </button>

        <button
          onClick={() => setActiveTab('clinical')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'clinical'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <Bell className="h-3.5 w-3.5" />
          Clinical SLAs
        </button>

        <button
          onClick={() => setActiveTab('demo')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'demo'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100'
          }`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Demo Controls
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'facility' && (
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-bold text-[#173B70]">
              Facility Identity & Legal Registration
            </CardTitle>
            <CardDescription className="text-xs">
              Primary healthcare facility license and legal credentials in Karnataka
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2 space-y-4 text-xs">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="font-semibold text-[#173B70]">Facility Name</label>
                <Input defaultValue={settings.profile.name} className="mt-1 text-xs" />
              </div>
              <div>
                <label className="font-semibold text-[#173B70]">Legal Operating Entity</label>
                <Input defaultValue={settings.profile.legalEntity} className="mt-1 text-xs" />
              </div>
              <div>
                <label className="font-semibold text-[#173B70]">Clinical Directorate License</label>
                <Input defaultValue={settings.profile.licenseNumber} className="mt-1 text-xs" />
              </div>
              <div>
                <label className="font-semibold text-[#173B70]">GSTIN / Tax ID</label>
                <Input defaultValue={settings.profile.gstin} className="mt-1 text-xs" />
              </div>
              <div>
                <label className="font-semibold text-[#173B70]">Address</label>
                <Input defaultValue={settings.profile.addressLine1} className="mt-1 text-xs" />
              </div>
              <div>
                <label className="font-semibold text-[#173B70]">Locality & PIN</label>
                <Input
                  defaultValue={`${settings.profile.locality}, ${settings.profile.city} - ${settings.profile.pincode}`}
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-[#173B70]">Primary Telephone (+91)</label>
                <Input defaultValue={settings.profile.phone} className="mt-1 text-xs" />
              </div>
              <div>
                <label className="font-semibold text-[#173B70]">24x7 Emergency Hotline</label>
                <Input defaultValue={settings.profile.emergencyPhone} className="mt-1 text-xs" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'wings' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {settings.wings.map((w) => (
            <Card key={w.id} className="border-[#E6ECF4] bg-white shadow-xs">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#173B70]">{w.name}</h3>
                  <Badge variant="success">Floor {w.floor}</Badge>
                </div>
                <div className="mt-2 space-y-1 text-xs text-[#4A5568]">
                  <div>Care Specialty: <span className="font-medium text-[#173B70]">{w.careSpecialty}</span></div>
                  <div>Nurse-in-Charge: <span className="font-medium text-[#173B70]">{w.nurseInCharge}</span></div>
                  <div>Capacity: <span className="font-bold text-[#2457C5]">{w.totalRooms} Rooms (16 Beds)</span></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'rooms' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {settings.roomCategories.map((cat) => (
            <Card key={cat.id} className="border-[#E6ECF4] bg-white shadow-xs">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#173B70]">{cat.name}</h3>
                  <Badge variant="default" className="text-xs">
                    ₹{cat.baseDailyRateINR.toLocaleString('en-IN')} / Day
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-[#4A5568]">{cat.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {cat.amenities.map((am, i) => (
                    <span
                      key={i}
                      className="rounded bg-[#E4EDFF] px-2 py-0.5 text-[10px] font-medium text-[#173B70]"
                    >
                      {am}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'ratios' && (
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <h3 className="font-bold text-sm text-[#173B70] mb-3">
              Mandatory Karnataka Staffing Ratios
            </h3>
            <div className="space-y-3">
              {settings.staffingRatios.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-[#173B70]">{r.careLevel}</div>
                    <div className="text-[11px] text-[#718096]">
                      {r.mandatoryRnOnDuty ? 'Mandatory RN on duty 24x7' : 'Supervised LPN / CNA coverage'}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <span className="text-[#718096] block text-[10px]">Day Shift</span>
                      <span className="font-bold text-[#173B70]">{r.dayRatio}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[#718096] block text-[10px]">Night Shift</span>
                      <span className="font-bold text-[#173B70]">{r.nightRatio}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'demo' && (
        <Card className="border-amber-200 bg-amber-50/50 shadow-xs">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-bold text-amber-900">
              Demonstration Environment Controls
            </CardTitle>
            <CardDescription className="text-xs text-amber-800">
              Reset state or re-seed stress-testing scenarios for HAVEN Anandam Care Residence.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2 space-y-4">
            <p className="text-xs text-amber-900">
              This will restore all 58 resident records, 64 beds, 8 nursing staff, 5 visiting physicians, and deterministic incident telemetry.
            </p>
            <Button
              variant="default"
              size="sm"
              className="bg-amber-700 hover:bg-amber-800 text-white"
              onClick={handleResetDemoData}
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Reset All Demo State
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card className="border-[#E6ECF4] bg-white shadow-xs p-5">
          <h3 className="font-bold text-sm text-[#173B70] mb-3">Security & Clinical EHR Access</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-[#E6ECF4]">
              <div>
                <span className="font-semibold text-[#173B70]">Session Inactivity Timeout</span>
                <p className="text-[#718096] text-[11px]">Auto logout from nursing terminals</p>
              </div>
              <Badge variant="secondary">30 Minutes</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#E6ECF4]">
              <div>
                <span className="font-semibold text-[#173B70]">Two-Factor Authentication (2FA)</span>
                <p className="text-[#718096] text-[11px]">Mandatory for all clinicians & admins</p>
              </div>
              <Badge variant="success">Enforced</Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="font-semibold text-[#173B70]">Break-Glass Override Expiry</span>
                <p className="text-[#718096] text-[11px]">Maximum emergency temporary grant window</p>
              </div>
              <Badge variant="secondary">24 Hours</Badge>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'clinical' && (
        <Card className="border-[#E6ECF4] bg-white shadow-xs p-5">
          <h3 className="font-bold text-sm text-[#173B70] mb-3">Clinical Notification SLAs</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-[#E6ECF4]">
              <div>
                <span className="font-semibold text-[#173B70]">Fall Alert Escalation SLA</span>
                <p className="text-[#718096] text-[11px]">Time before alerting Medical Director</p>
              </div>
              <Badge variant="default">15 Minutes</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#E6ECF4]">
              <div>
                <span className="font-semibold text-[#173B70]">Overdue Medication Warning</span>
                <p className="text-[#718096] text-[11px]">Window past scheduled time before flagging</p>
              </div>
              <Badge variant="warning">30 Minutes</Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="font-semibold text-[#173B70]">Advance Care Planning Verification</span>
                <p className="text-[#718096] text-[11px]">Annual physician-verified directive check</p>
              </div>
              <Badge variant="success">Annual Prompt Active</Badge>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
