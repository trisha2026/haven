import { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  Save,
  ShieldCheck,
  Activity,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';

export function DoctorPreferencesPage() {
  useDocumentTitle('Clinical Practice Preferences — Doctor');

  // Clinical alerts settings
  const [systolicAlert, setSystolicAlert] = useState('140');
  const [diastolicAlert, setDiastolicAlert] = useState('90');
  const [spo2Alert, setSpo2Alert] = useState('92');
  const [fallSmsAlert, setFallSmsAlert] = useState(true);
  const [medExceptionUrgency, setMedExceptionUrgency] = useState('immediate');

  // Documentation defaults
  const [defaultTemplate, setDefaultTemplate] = useState('SOAP Progress Note');
  const [autoSignStamp, setAutoSignStamp] = useState(true);
  const [defaultRxDuration, setDefaultRxDuration] = useState('6 Months');

  // Interface settings
  const [tableDensity, setTableDensity] = useState('comfortable');
  const [defaultLanding, setDefaultLanding] = useState('/doctor/dashboard');

  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-haven-navy-900 tracking-tight">
            Clinical Practice Preferences
          </h1>
          <p className="text-xs text-haven-neutral-500 mt-1">
            Configure clinical vital threshold alerts, electronic signature defaults, and practitioner workspace parameters
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleSave}>
          <Save className="w-4 h-4 mr-1.5" /> Save Preferences
        </Button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Clinical preferences and threshold configurations saved successfully.</span>
        </div>
      )}

      {/* 1. Clinical Alert Thresholds */}
      <Card>
        <CardHeader className="pb-3 border-b border-haven-neutral-200">
          <CardTitle className="text-sm font-bold text-haven-navy-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-haven-royal-blue" />
            <span>Hemodynamic Alert Thresholds (Elderly Care Protocol)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                High Systolic Alert (mmHg):
              </label>
              <Input
                value={systolicAlert}
                onChange={(e) => setSystolicAlert(e.target.value)}
                className="text-xs"
              />
              <span className="text-[11px] text-haven-neutral-500 mt-1 block">
                Triggers priority notification if exceeded
              </span>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                High Diastolic Alert (mmHg):
              </label>
              <Input
                value={diastolicAlert}
                onChange={(e) => setDiastolicAlert(e.target.value)}
                className="text-xs"
              />
              <span className="text-[11px] text-haven-neutral-500 mt-1 block">
                Standard geriatric boundary
              </span>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Low SpO2 Alert (%):
              </label>
              <Input
                value={spo2Alert}
                onChange={(e) => setSpo2Alert(e.target.value)}
                className="text-xs"
              />
              <span className="text-[11px] text-haven-neutral-500 mt-1 block">
                Oxygen desaturation trigger
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-haven-neutral-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-haven-navy-900 block">
                  Fall Incident Emergency SMS Notification
                </span>
                <span className="text-[11px] text-haven-neutral-500">
                  Transmit automated SMS to +91 94480 12471 whenever a resident in your caseload sustains an unassisted fall.
                </span>
              </div>
              <input
                type="checkbox"
                checked={fallSmsAlert}
                onChange={(e) => setFallSmsAlert(e.target.checked)}
                className="rounded border-haven-neutral-300 text-haven-royal-blue focus:ring-haven-royal-blue/30 w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-haven-navy-900 block">
                  Caregiver eMAR Medication Exception Escalation
                </span>
                <span className="text-[11px] text-haven-neutral-500">
                  Select delivery frequency for floor refused or withheld dose reports.
                </span>
              </div>
              <Select
                value={medExceptionUrgency}
                onChange={(e) => setMedExceptionUrgency(e.target.value)}
                className="text-xs w-48"
              >
                <option value="immediate">Immediate Push Alert</option>
                <option value="hourly">Hourly Digest</option>
                <option value="shift_end">Shift-End Summary</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Documentation & Electronic Signatures */}
      <Card>
        <CardHeader className="pb-3 border-b border-haven-neutral-200">
          <CardTitle className="text-sm font-bold text-haven-navy-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-haven-royal-blue" />
            <span>Documentation & Countersigning Standards</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Default Clinical Note Format:
              </label>
              <Select
                value={defaultTemplate}
                onChange={(e) => setDefaultTemplate(e.target.value)}
                className="text-xs"
              >
                <option value="SOAP Progress Note">SOAP Progress Note</option>
                <option value="Comprehensive Geriatric Assessment">Comprehensive Geriatric Assessment</option>
                <option value="Polypharmacy Review">Polypharmacy Review</option>
              </Select>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Default Maintenance Prescription Validity:
              </label>
              <Select
                value={defaultRxDuration}
                onChange={(e) => setDefaultRxDuration(e.target.value)}
                className="text-xs"
              >
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months (Standard Maintenance)</option>
                <option value="12 Months">12 Months (Chronic Fixed Regimen)</option>
              </Select>
            </div>
          </div>

          <div className="pt-2 border-t border-haven-neutral-100 flex items-center justify-between">
            <div>
              <span className="font-semibold text-haven-navy-900 block">
                Automatic Karnataka Medical Council Digital Countersignature
              </span>
              <span className="text-[11px] text-haven-neutral-500">
                Seal notes and revised prescriptions with license stamp KMC-88391 upon clicking Sign & Finalize.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoSignStamp}
              onChange={(e) => setAutoSignStamp(e.target.checked)}
              className="rounded border-haven-neutral-300 text-haven-royal-blue focus:ring-haven-royal-blue/30 w-4 h-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. Practitioner Workspace & Display */}
      <Card>
        <CardHeader className="pb-3 border-b border-haven-neutral-200">
          <CardTitle className="text-sm font-bold text-haven-navy-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-haven-royal-blue" />
            <span>Workspace Display & Localization</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Default Landing Module:
              </label>
              <Select
                value={defaultLanding}
                onChange={(e) => setDefaultLanding(e.target.value)}
                className="text-xs"
              >
                <option value="/doctor/dashboard">Doctor Command Centre</option>
                <option value="/doctor/residents">My Residents Directory</option>
                <option value="/doctor/tasks">Clinical Work Queue</option>
              </Select>
            </div>

            <div>
              <label className="font-semibold text-haven-navy-900 block mb-1">
                Clinical Table Density:
              </label>
              <Select
                value={tableDensity}
                onChange={(e) => setTableDensity(e.target.value)}
                className="text-xs"
              >
                <option value="comfortable">Comfortable (Optimal for Tablet/Laptop)</option>
                <option value="compact">Compact (High Information Density)</option>
              </Select>
            </div>
          </div>

          <div className="pt-2 border-t border-haven-neutral-100 flex items-center justify-between text-haven-neutral-600">
            <span>Operating Timezone: <strong>Asia/Kolkata (IST · UTC+5:30)</strong></span>
            <span>Currency: <strong>INR (₹)</strong></span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
