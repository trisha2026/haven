import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ShieldCheck,
  UserPlus,
  HeartHandshake,
  ChartColumn,
  BedDouble,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { Button } from '../ui/Button.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/Dialog.tsx';
import { Input } from '../ui/Input.tsx';
import { Select } from '../ui/Select.tsx';
import { MOCK_FACILITY_WINGS, MOCK_CARE_LEVELS } from '../../mock/data.ts';
import { DEMO_TIMESTAMP_FULL } from '../../mock/adminDashboard.ts';

export function AdminWelcomeHeader() {
  const navigate = useNavigate();

  // Dialog states for Quick Actions
  const [isAddResidentOpen, setIsAddResidentOpen] = useState(false);
  const [isRegisterStaffOpen, setIsRegisterStaffOpen] = useState(false);

  // Form states for Add Resident
  const [residentName, setResidentName] = useState('');
  const [residentRoom, setResidentRoom] = useState('');
  const [residentWing, setResidentWing] = useState('garden');
  const [residentCareLevel, setResidentCareLevel] = useState('assisted');
  const [residentContact, setResidentContact] = useState('');
  const [residentError, setResidentError] = useState<string | null>(null);
  const [residentSuccess, setResidentSuccess] = useState<string | null>(null);

  // Form states for Register Staff
  const [staffName, setStaffName] = useState('');
  const [staffRole, setStaffRole] = useState('rn');
  const [staffShift, setStaffShift] = useState('day');
  const [staffWing, setStaffWing] = useState('all');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffError, setStaffError] = useState<string | null>(null);
  const [staffSuccess, setStaffSuccess] = useState<string | null>(null);

  const handleAddResidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!residentName.trim()) {
      setResidentError('Resident full name is required');
      return;
    }
    if (!residentRoom.trim()) {
      setResidentError('Room / Bed allocation is required');
      return;
    }
    setResidentError(null);
    setResidentSuccess(`Resident registration staged for ${residentName} in ${residentRoom}. (UI Mock State)`);
    setTimeout(() => {
      setResidentSuccess(null);
      setIsAddResidentOpen(false);
      setResidentName('');
      setResidentRoom('');
      setResidentContact('');
    }, 1200);
  };

  const handleRegisterStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName.trim()) {
      setStaffError('Staff member full name is required');
      return;
    }
    setStaffError(null);
    setStaffSuccess(`Staff profile created for ${staffName}. Shift roster updated. (UI Mock State)`);
    setTimeout(() => {
      setStaffSuccess(null);
      setIsRegisterStaffOpen(false);
      setStaffName('');
      setStaffPhone('');
    }, 1200);
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-haven-border shadow-haven-card relative overflow-hidden">
        {/* Subtle decorative background gradient accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-haven-blue-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Top Operational Pill & Demonstration Reference Time */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-haven-blue-100 text-haven-blue-700 text-xs font-semibold uppercase tracking-wider border border-haven-blue-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-haven-blue-700" />
                Demonstration Mode · Simulated Feed
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-haven-slate-500 bg-haven-slate-50 px-3 py-1 rounded-full border border-haven-border">
                <Calendar className="w-3.5 h-3.5 text-haven-slate-500" />
                {DEMO_TIMESTAMP_FULL}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-haven-success bg-haven-success-soft px-2.5 py-1 rounded-full border border-haven-success-border font-medium">
                <span className="w-2 h-2 rounded-full bg-haven-success animate-pulse" />
                Anandam Residence (4 Wings Simulated)
              </span>
            </div>

            {/* Primary Greeting */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-haven-navy-900 tracking-tight">
              Good morning, Administrator
            </h1>

            {/* Subtitle / Context */}
            <p className="text-sm text-haven-slate-500 leading-relaxed">
              Anandam Care Residence operational pulse (simulated demonstration data): <strong>58 residents</strong> in care across 4 wings.
              Day Shift is active with 18 personnel on duty (100% scheduled coverage). 6 operational items require administrative attention in the Priority Queue below.
            </p>
          </div>

          {/* Quick Actions Cluster */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<UserPlus className="w-4 h-4" />}
              onClick={() => setIsAddResidentOpen(true)}
            >
              Add Resident
            </Button>

            <Button
              variant="secondary"
              size="sm"
              leftIcon={<HeartHandshake className="w-4 h-4" />}
              onClick={() => setIsRegisterStaffOpen(true)}
            >
              Register Staff
            </Button>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<ChartColumn className="w-4 h-4" />}
              onClick={() => navigate('/admin/reports')}
            >
              View Reports
            </Button>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<BedDouble className="w-4 h-4" />}
              onClick={() => navigate('/admin/rooms')}
            >
              Manage Rooms
            </Button>
          </div>
        </div>
      </div>

      {/* QUICK ACTION 1: ADD RESIDENT DIALOG */}
      <Dialog open={isAddResidentOpen} onOpenChange={setIsAddResidentOpen}>
        <DialogContent maxWidth="md">
          <form onSubmit={handleAddResidentSubmit}>
            <DialogHeader>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-haven-blue-100 text-haven-blue-700 flex items-center justify-center shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <DialogTitle>Admit / Register New Resident</DialogTitle>
                  <DialogDescription>
                    Record preliminary intake demographics and room assignment.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="py-4 space-y-4">
              {residentError && (
                <div className="p-3 rounded-xl bg-haven-danger-soft border border-haven-danger-border flex items-center gap-2 text-xs text-haven-danger">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{residentError}</span>
                </div>
              )}

              {residentSuccess && (
                <div className="p-3 rounded-xl bg-haven-success-soft border border-haven-success-border flex items-center gap-2 text-xs text-haven-success">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{residentSuccess}</span>
                </div>
              )}

              <Input
                label="Full Legal Name"
                placeholder="e.g. Beatrice Montgomery"
                required
                value={residentName}
                onChange={(e) => setResidentName(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Residential Wing"
                  options={MOCK_FACILITY_WINGS.filter((w) => w.value !== 'all')}
                  value={residentWing}
                  onChange={(e) => setResidentWing(e.target.value)}
                />
                <Input
                  label="Allocated Room / Bed"
                  placeholder="e.g. Room 210-A"
                  required
                  value={residentRoom}
                  onChange={(e) => setResidentRoom(e.target.value)}
                  helperText="4 operational beds available"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Care Classification"
                  options={MOCK_CARE_LEVELS.filter((c) => c.value !== 'all')}
                  value={residentCareLevel}
                  onChange={(e) => setResidentCareLevel(e.target.value)}
                />
                <Input
                  label="Emergency Contact Phone"
                  placeholder="+91 98450 12849"
                  value={residentContact}
                  onChange={(e) => setResidentContact(e.target.value)}
                />
              </div>

              <p className="text-[11px] text-haven-slate-500 italic">
                * Note: Intake requires verified physician clinical history before medication administration can commence.
              </p>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" size="sm" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="primary" size="sm" type="submit">
                Complete Admission Intake
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* QUICK ACTION 2: REGISTER STAFF DIALOG */}
      <Dialog open={isRegisterStaffOpen} onOpenChange={setIsRegisterStaffOpen}>
        <DialogContent maxWidth="md">
          <form onSubmit={handleRegisterStaffSubmit}>
            <DialogHeader>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-haven-blue-100 text-haven-blue-700 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <DialogTitle>Register Healthcare Staff</DialogTitle>
                  <DialogDescription>
                    Onboard a licensed nurse, certified caregiver, or visiting physician.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="py-4 space-y-4">
              {staffError && (
                <div className="p-3 rounded-xl bg-haven-danger-soft border border-haven-danger-border flex items-center gap-2 text-xs text-haven-danger">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{staffError}</span>
                </div>
              )}

              {staffSuccess && (
                <div className="p-3 rounded-xl bg-haven-success-soft border border-haven-success-border flex items-center gap-2 text-xs text-haven-success">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{staffSuccess}</span>
                </div>
              )}

              <Input
                label="Full Name &amp; Title"
                placeholder="e.g. Jonathan Hayes, RN"
                required
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Role / Clinical Credential"
                  options={[
                    { value: 'rn', label: 'Registered Nurse (RN)' },
                    { value: 'lpn', label: 'Licensed Practical Nurse (LPN)' },
                    { value: 'cna', label: 'Certified Nursing Assistant (CNA)' },
                    { value: 'np', label: 'Nurse Practitioner (NP)' },
                    { value: 'physician', label: 'Visiting / On-Call Physician' },
                  ]}
                  value={staffRole}
                  onChange={(e) => setStaffRole(e.target.value)}
                />
                <Select
                  label="Default Shift Roster"
                  options={[
                    { value: 'day', label: 'Day Shift (07:00 – 15:00)' },
                    { value: 'evening', label: 'Evening Shift (15:00 – 23:00)' },
                    { value: 'night', label: 'Night Watch (23:00 – 07:00)' },
                    { value: 'prn', label: 'PRN / On-Call Pool' },
                  ]}
                  value={staffShift}
                  onChange={(e) => setStaffShift(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Assigned Primary Wing"
                  options={[
                    { value: 'all', label: 'Facility-wide (Float)' },
                    { value: 'garden', label: 'Garden Terrace' },
                    { value: 'sunrise', label: 'Sunrise Pavilion' },
                    { value: 'orchard', label: 'Orchard Meadow' },
                    { value: 'highland', label: 'Highland Haven' },
                  ]}
                  value={staffWing}
                  onChange={(e) => setStaffWing(e.target.value)}
                />
                <Input
                  label="Staff Badge Scanner ID"
                  placeholder="e.g. EMP-9942"
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                />
              </div>

              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border text-xs text-haven-slate-500 space-y-1">
                <div className="flex items-center gap-2 text-haven-slate-900 font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-haven-blue-700" />
                  <span>Facility Credentials Policy</span>
                </div>
                <p>
                  New staff profiles are provisioned with standard role permissions. Digital signature credentials must be countersigned by the Administrator before medication vault access is activated.
                </p>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" size="sm" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="primary" size="sm" type="submit">
                Register &amp; Provision Badge
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
