import { useState } from 'react';
import {
  UserPlus,
  ShieldAlert,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  User,
  Building,
  HeartHandshake,
  HeartPulse,
  Bed,
  CheckSquare,
  Sparkles,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/Dialog.tsx';
import { Button } from '../ui/Button.tsx';
import { Input } from '../ui/Input.tsx';
import { Select } from '../ui/Select.tsx';
import { Badge } from '../ui/Badge.tsx';
import { MOCK_AVAILABLE_ROOMS, MOCK_FULL_RESIDENTS } from '../../mock/residentsData.ts';
import type { FullResident, ResidentCareClassification, FacilityWing } from '../../types/resident.ts';

export interface AddResidentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResidentAdded: (newResident: FullResident) => void;
}

const STEPS = [
  { step: 1, title: 'Personal', icon: User },
  { step: 2, title: 'Admission', icon: Building },
  { step: 3, title: 'Contacts', icon: HeartHandshake },
  { step: 4, title: 'Medical', icon: HeartPulse },
  { step: 5, title: 'Room Allocation', icon: Bed },
  { step: 6, title: 'Review & Admit', icon: CheckSquare },
] as const;

export function AddResidentModal({ open, onOpenChange, onResidentAdded }: AddResidentModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Personal Information
  const [fullName, setFullName] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');

  // Step 2: Admission Details
  const [careLevel, setCareLevel] = useState<ResidentCareClassification>('Assisted Living');
  const [admissionDate, setAdmissionDate] = useState('Today, Nov 10, 2026');
  const [doctorName, setDoctorName] = useState('Dr. Anita Mehta, MD');

  // Step 3: Emergency Contacts
  const [contactName, setContactName] = useState('');
  const [contactRelationship, setContactRelationship] = useState('Next of Kin (Son/Daughter)');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('Indiranagar, Bengaluru, Karnataka 560038');
  const [commPreference, setCommPreference] = useState<'Phone Call' | 'SMS' | 'Email' | 'WhatsApp'>('Phone Call');
  const [hasPoa, setHasPoa] = useState(true);
  const [isGuardian, setIsGuardian] = useState(false);

  // Step 4: Medical Information
  const [allergiesText, setAllergiesText] = useState('Penicillin');
  const [conditionsText, setConditionsText] = useState('Mild Hypertension, Osteoarthritis');
  const [mobilityTier, setMobilityTier] = useState('Walker assistance with staff standby');
  const [dietaryText, setDietaryText] = useState('Regular consistency adult diet with cultural preference');
  const [dnrStatus, setDnrStatus] = useState(true);
  const [hasAdvanceDirective, setHasAdvanceDirective] = useState(true);

  // Step 5: Room Assignment
  const [isPlacementPending, setIsPlacementPending] = useState(false);
  const [selectedWing, setSelectedWing] = useState<FacilityWing>('Garden Terrace');
  const [selectedRoom, setSelectedRoom] = useState('Room 215');
  const [selectedBed, setSelectedBed] = useState('Bed A');

  // Step Validation
  const validateStep = (step: number): boolean => {
    setError(null);
    if (step === 1) {
      if (!fullName.trim()) {
        setError('Please enter resident full legal name.');
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!careLevel || !doctorName) {
        setError('Please select care classification tier and attending physician.');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!contactName.trim() || !contactPhone.trim()) {
        setError('Primary emergency contact name and phone number are required.');
        return false;
      }
      return true;
    }
    if (step === 5) {
      if (!isPlacementPending && !selectedRoom.trim()) {
        setError('Please select an available room or check Placement Pending.');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handlePrev = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(3)) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Compute next sequential ID (e.g. RES-059)
    const nextNum = MOCK_FULL_RESIDENTS.length + 1;
    const generatedId = `RES-${nextNum.toString().padStart(3, '0')}`;

    const newResident: FullResident = {
      id: generatedId,
      fullName: fullName.trim(),
      preferredName: preferredName.trim() || fullName.trim().split(' ')[0],
      dateOfBirth: dateOfBirth || 'April 12, 1944',
      age: 82,
      gender,
      status: isPlacementPending ? 'resting' : 'active',
      careLevel,
      placement: {
        wing: isPlacementPending ? 'Garden Terrace' : selectedWing,
        room: isPlacementPending ? 'Placement Pending' : selectedRoom,
        bed: isPlacementPending ? 'Waitlist' : selectedBed,
        floor: selectedWing === 'Highland Haven' ? 'Floor 3' : selectedWing === 'Garden Terrace' ? 'Floor 2' : 'Floor 1',
        roomType: 'Standard Room',
        moveInDate: admissionDate,
      },
      careTeam: {
        primaryDoctor: {
          name: doctorName,
          specialty: 'Lead Geriatrician',
          phone: '+91 98450 23489',
          license: 'KMC-88391',
        },
        primaryNurse: {
          name: 'Priya Shetty, RN',
          role: 'Admissions Lead RN',
          shift: 'Day Shift (07:00 – 15:00)',
        },
        caregiverTeam: `${selectedWing} Care Pod`,
      },
      emergencyContacts: [
        {
          name: contactName.trim(),
          relationship: contactRelationship,
          phone: contactPhone.trim(),
          email: contactEmail.trim() || 'family@haven-care.in.example',
          address: contactAddress.trim(),
          isPrimary: true,
          isLegalGuardian: isGuardian,
          hasPowerOfAttorney: hasPoa,
          communicationPreference: commPreference,
        },
      ],
      alerts: [
        'New Admission — 48-hour vital monitoring protocol active.',
        hasPoa ? 'Healthcare POA verified on file.' : 'Next of Kin contact on file.',
      ],
      mobilityStatus: mobilityTier,
      dietaryProtocol: dietaryText,
      dnrStatus,
      polstOnRecord: hasAdvanceDirective,
      advanceDirectiveOnRecord: hasAdvanceDirective,
      carePlan: {
        mobilitySupport: mobilityTier,
        fallRiskLevel: 'Medium',
        transferAssistance: '1-person assist',
        nutritionDietary: dietaryText,
        hydrationGoal: '2,000 mL daily target across meals and routine hydration rounds.',
        personalCareHygiene: 'Supervised assistance with daily grooming.',
        bathingSchedule: 'Mon, Wed, Fri mornings',
        continenceCare: 'Standard schedule.',
        dailyRoutineInstructions: 'Prefers reading lounge in morning; courtyard walk in afternoon.',
        sensoryAids: ['Corrective glasses'],
        caregiverActionChecklist: [
          'Verify morning orientation and breakfast tray',
          'Conduct 48-hour new resident vitals round',
        ],
        nextCarePlanReviewDate: 'December 2026',
      },
      allergies: allergiesText
        ? allergiesText.split(',').map((s) => ({
            id: `ALG-${Date.now()}`,
            allergen: s.trim(),
            severity: 'moderate' as const,
            reaction: 'Mild rash / discomfort',
            diagnosedDate: 'Nov 2026',
          }))
        : [],
      conditions: conditionsText
        ? conditionsText.split(',').map((c) => ({
            condition: c.trim(),
            icdCode: 'R68.8',
            diagnosedDate: '2023',
            status: 'managed' as const,
            notes: 'Stable baseline on admission.',
          }))
        : [],
      clinicalNotes: [
        {
          id: `CN-${Date.now()}`,
          author: 'Priya Shetty, RN',
          authorRole: 'Admissions Lead RN',
          date: 'Today, 10:30 AM',
          type: 'Nursing Evaluation',
          summary: `Resident ${fullName.trim()} registered and admitted to HAVEN. Baseline vitals and intake orientation completed.`,
          recommendations: 'Complete lead physician review within 24 hours.',
        },
      ],
      medications: [],
      attendanceLogs: [
        {
          id: `ATT-${Date.now()}`,
          date: 'Today, Nov 10, 2026',
          time: '10:30 AM',
          location: isPlacementPending ? 'Admissions Lounge' : selectedRoom,
          status: 'present',
          verifiedBy: 'Priya Shetty, RN',
          notes: 'Admitted into facility directory.',
        },
      ],
      visitorLogs: [],
      documents: [
        {
          id: `DOC-NEW-01`,
          title: 'Residency Agreement & Care Terms',
          category: 'Agreement',
          uploadDate: 'Nov 10, 2026',
          fileSize: '1.4 MB PDF',
          signedBy: `${fullName.trim()} & Administrator Devika Ramanathan`,
          status: 'verified',
          referenceNumber: `AGR-${generatedId}`,
        },
      ],
      incidents: [],
      transferHistory: [],
    };

    setTimeout(() => {
      setSuccess(`Resident ${fullName} (${generatedId}) successfully registered!`);
      setIsSubmitting(false);

      setTimeout(() => {
        onResidentAdded(newResident);
        setSuccess(null);
        onOpenChange(false);
        // Reset state
        setCurrentStep(1);
        setFullName('');
        setPreferredName('');
        setDateOfBirth('');
        setContactName('');
        setContactPhone('');
      }, 1000);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="xl">
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-haven-blue-100 text-haven-blue-700 flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle>Resident Admission Wizard</DialogTitle>
                <DialogDescription>
                  Step-by-step registration for new residential admissions to HAVEN
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Wizard Step Progress Tracker */}
          <div className="border-y border-haven-border py-3 bg-haven-slate-50/60 -mx-6 px-6">
            <div className="grid grid-cols-6 gap-2">
              {STEPS.map((s) => {
                const Icon = s.icon;
                const isCurrent = currentStep === s.step;
                const isCompleted = currentStep > s.step;

                return (
                  <div
                    key={s.step}
                    className={`flex items-center gap-1.5 p-1.5 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-haven-blue-700 text-white shadow-sm'
                        : isCompleted
                        ? 'text-haven-blue-700 font-semibold'
                        : 'text-haven-slate-400'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                        isCurrent
                          ? 'bg-white text-haven-blue-700 font-bold'
                          : isCompleted
                          ? 'bg-haven-blue-100 text-haven-blue-700'
                          : 'bg-haven-slate-200 text-haven-slate-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-haven-blue-700" /> : <Icon className="w-3.5 h-3.5" />}
                    </div>
                    <span className="hidden md:inline text-[11px] truncate">{s.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validation Feedback */}
          {error && (
            <div className="p-3 rounded-xl bg-haven-danger-soft border border-haven-danger-border flex items-center gap-2 text-xs text-haven-danger">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-haven-success-soft border border-haven-success-border flex items-center gap-2 text-xs text-haven-success">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* STEP 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-xl bg-haven-blue-50/60 border border-haven-blue-100 flex items-center gap-2 text-haven-navy-900 font-medium">
                <User className="w-4 h-4 text-haven-blue-700 shrink-0" />
                <span>Step 1: Resident Legal Identity &amp; Demographics</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Full Legal Name *"
                  placeholder="e.g. Ananya Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <Input
                  label="Preferred / Familiar Name"
                  placeholder="e.g. Ananya"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Date of Birth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <Select
                  label="Gender"
                  options={[
                    { value: 'Female', label: 'Female' },
                    { value: 'Male', label: 'Male' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Other')}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Admission Details */}
          {currentStep === 2 && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-xl bg-haven-blue-50/60 border border-haven-blue-100 flex items-center gap-2 text-haven-navy-900 font-medium">
                <Building className="w-4 h-4 text-haven-blue-700 shrink-0" />
                <span>Step 2: Care Classification &amp; Lead Physician</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Select
                  label="Care Classification Tier *"
                  options={[
                    { value: 'Assisted Living', label: 'Assisted Living (Tier 2)' },
                    { value: 'Memory Care', label: 'Memory Care (Secured Sunrise)' },
                    { value: 'Skilled Nursing', label: 'Skilled Nursing (Comprehensive)' },
                    { value: 'Independent Living', label: 'Independent Living (Private Suite)' },
                  ]}
                  value={careLevel}
                  onChange={(e) => setCareLevel(e.target.value as ResidentCareClassification)}
                />
                <Input
                  label="Admission Date"
                  value={admissionDate}
                  onChange={(e) => setAdmissionDate(e.target.value)}
                />
              </div>

              <Select
                label="Lead Attending Geriatrician *"
                options={[
                  { value: 'Dr. Anita Mehta, MD', label: 'Dr. Anita Mehta, MD (Lead Geriatrician)' },
                  { value: 'Dr. Arjun Rao, MD', label: 'Dr. Arjun Rao, MD (Visiting Cardiologist)' },
                  { value: 'Dr. Priya Nair, MD', label: 'Dr. Priya Nair, MD (Internal Medicine)' },
                  { value: 'Dr. Karthik Srinivasan, MD', label: 'Dr. Karthik Srinivasan, MD (Family Medicine)' },
                ]}
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
            </div>
          )}

          {/* STEP 3: Emergency Contacts */}
          {currentStep === 3 && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-xl bg-haven-blue-50/60 border border-haven-blue-100 flex items-center gap-2 text-haven-navy-900 font-medium">
                <HeartHandshake className="w-4 h-4 text-haven-blue-700 shrink-0" />
                <span>Step 3: Primary Family Emergency Contact &amp; Legal POA</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Contact Full Name *"
                  placeholder="e.g. Rajesh Sharma"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
                <Input
                  label="Relationship *"
                  placeholder="e.g. Son, Daughter, Legal Guardian"
                  value={contactRelationship}
                  onChange={(e) => setContactRelationship(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Primary Phone Number *"
                  placeholder="e.g. +91 98450 23489"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  placeholder="e.g. family@haven-care.in.example"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Residential Address"
                  placeholder="e.g. Indiranagar, Bengaluru, Karnataka 560038"
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                />
                <Select
                  label="Preferred Communication Channel"
                  options={[
                    { value: 'Phone Call', label: 'Phone Call' },
                    { value: 'SMS', label: 'SMS Text Message' },
                    { value: 'WhatsApp', label: 'WhatsApp' },
                    { value: 'Email', label: 'Email' },
                  ]}
                  value={commPreference}
                  onChange={(e) =>
                    setCommPreference(
                      e.target.value as 'Phone Call' | 'SMS' | 'Email' | 'WhatsApp'
                    )
                  }
                />
              </div>

              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasPoa}
                    onChange={(e) => setHasPoa(e.target.checked)}
                    className="w-4 h-4 text-haven-blue-700 rounded border-haven-border focus:ring-haven-blue-500"
                  />
                  <span className="font-semibold text-haven-slate-800">Healthcare Power of Attorney (POA)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGuardian}
                    onChange={(e) => setIsGuardian(e.target.checked)}
                    className="w-4 h-4 text-haven-blue-700 rounded border-haven-border focus:ring-haven-blue-500"
                  />
                  <span className="font-semibold text-haven-slate-800">Court-Appointed Legal Guardian</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Medical Information */}
          {currentStep === 4 && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-xl bg-haven-blue-50/60 border border-haven-blue-100 flex items-center gap-2 text-haven-navy-900 font-medium">
                <HeartPulse className="w-4 h-4 text-haven-blue-700 shrink-0" />
                <span>Step 4: Clinical History, Allergies &amp; Directives</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Known Allergies (comma-separated)"
                  placeholder="e.g. Penicillin, Sulfa drugs"
                  value={allergiesText}
                  onChange={(e) => setAllergiesText(e.target.value)}
                />
                <Input
                  label="Primary Chronic Conditions (comma-separated)"
                  placeholder="e.g. Hypertension, Diabetes"
                  value={conditionsText}
                  onChange={(e) => setConditionsText(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Select
                  label="Mobility Support Level"
                  options={[
                    { value: 'Independent ambulatory', label: 'Independent Ambulatory' },
                    { value: 'Walker assistance with staff standby', label: 'Walker with Staff Standby' },
                    { value: 'Wheelchair / 1-person assist', label: 'Wheelchair / 1-Person Assist' },
                    { value: 'Full mechanical 2-person assist', label: 'Mechanical 2-Person Assist' },
                  ]}
                  value={mobilityTier}
                  onChange={(e) => setMobilityTier(e.target.value)}
                />
                <Input
                  label="Dietary & Nutrition Protocol"
                  value={dietaryText}
                  onChange={(e) => setDietaryText(e.target.value)}
                />
              </div>

              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dnrStatus}
                    onChange={(e) => setDnrStatus(e.target.checked)}
                    className="w-4 h-4 text-haven-blue-700 rounded border-haven-border focus:ring-haven-blue-500"
                  />
                  <span className="font-semibold text-haven-slate-800">DNR (Do Not Resuscitate) Signed</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAdvanceDirective}
                    onChange={(e) => setHasAdvanceDirective(e.target.checked)}
                    className="w-4 h-4 text-haven-blue-700 rounded border-haven-border focus:ring-haven-blue-500"
                  />
                  <span className="font-semibold text-haven-slate-800">Physician-Verified Clinical Directive on Record</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: Room Assignment */}
          {currentStep === 5 && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-xl bg-haven-blue-50/60 border border-haven-blue-100 flex items-center gap-2 text-haven-navy-900 font-medium">
                <Bed className="w-4 h-4 text-haven-blue-700 shrink-0" />
                <span>Step 5: Facility Wing &amp; Living Quarters Allocation</span>
              </div>

              {/* Waitlist / Placement Pending Option */}
              <div className="p-3.5 rounded-xl bg-haven-warning-soft border border-haven-warning-border">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPlacementPending}
                    onChange={(e) => setIsPlacementPending(e.target.checked)}
                    className="w-4 h-4 text-haven-blue-700 rounded border-haven-border focus:ring-haven-blue-500 mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-haven-warning block">
                      Placement Pending / Waitlist
                    </span>
                    <span className="text-[11px] text-haven-slate-600">
                      Register resident without immediate room allocation (resident will be queued on admissions waitlist).
                    </span>
                  </div>
                </label>
              </div>

              {!isPlacementPending && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Select
                      label="Facility Wing *"
                      options={[
                        { value: 'Garden Terrace', label: 'Garden Terrace (Floor 2)' },
                        { value: 'Sunrise Pavilion', label: 'Sunrise Pavilion (Floor 1 Memory)' },
                        { value: 'Orchard Meadow', label: 'Orchard Meadow (Floor 1 Skilled)' },
                        { value: 'Highland Haven', label: 'Highland Haven (Floor 3 Suites)' },
                      ]}
                      value={selectedWing}
                      onChange={(e) => {
                        const newWing = e.target.value as FacilityWing;
                        setSelectedWing(newWing);
                        const match = MOCK_AVAILABLE_ROOMS.find((r) => r.wing === newWing);
                        if (match) {
                          setSelectedRoom(match.room);
                          setSelectedBed(match.bed);
                        }
                      }}
                    />

                    <Select
                      label="Select Available Room *"
                      options={MOCK_AVAILABLE_ROOMS.map((r) => ({
                        value: r.room,
                        label: `${r.room} (${r.wing} · ${r.bed})`,
                      }))}
                      value={selectedRoom}
                      onChange={(e) => {
                        setSelectedRoom(e.target.value);
                        const found = MOCK_AVAILABLE_ROOMS.find((r) => r.room === e.target.value);
                        if (found) {
                          setSelectedWing(found.wing as FacilityWing);
                          setSelectedBed(found.bed);
                        }
                      }}
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                        Selected Accommodation
                      </span>
                      <span className="font-bold text-haven-slate-900 text-sm">
                        {selectedRoom} ({selectedBed}) — {selectedWing}
                      </span>
                    </div>
                    <Badge variant="success" size="sm">Available Now</Badge>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Review & Admit */}
          {currentStep === 6 && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-xl bg-haven-blue-50/60 border border-haven-blue-100 flex items-center gap-2 text-haven-navy-900 font-medium">
                <CheckSquare className="w-4 h-4 text-haven-blue-700 shrink-0" />
                <span>Step 6: Review Admission Summary &amp; Confirm Registration</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Resident Profile Summary */}
                <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-2">
                  <span className="text-[11px] font-bold text-haven-blue-700 uppercase tracking-wider block">
                    Resident Demographics
                  </span>
                  <div className="space-y-1 text-haven-slate-700">
                    <div><span className="font-semibold text-haven-slate-900">Name:</span> {fullName} ({preferredName || fullName})</div>
                    <div><span className="font-semibold text-haven-slate-900">Gender / DOB:</span> {gender} · {dateOfBirth || 'April 12, 1944'}</div>
                    <div><span className="font-semibold text-haven-slate-900">Care Level:</span> {careLevel}</div>
                    <div><span className="font-semibold text-haven-slate-900">Lead Physician:</span> {doctorName}</div>
                  </div>
                </div>

                {/* Placement & Safety */}
                <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-2">
                  <span className="text-[11px] font-bold text-haven-blue-700 uppercase tracking-wider block">
                    Placement &amp; Safety
                  </span>
                  <div className="space-y-1 text-haven-slate-700">
                    <div>
                      <span className="font-semibold text-haven-slate-900">Room:</span>{' '}
                      {isPlacementPending ? 'Placement Pending (Waitlist)' : `${selectedRoom} (${selectedBed})`}
                    </div>
                    <div><span className="font-semibold text-haven-slate-900">Wing:</span> {isPlacementPending ? 'Waitlist' : selectedWing}</div>
                    <div>
                      <span className="font-semibold text-haven-slate-900">Directives:</span>{' '}
                      {dnrStatus ? 'DNR Active' : 'CPR Full Code'} · {hasAdvanceDirective ? 'Advance Care Directive on File' : 'No Directive'}
                    </div>
                    <div><span className="font-semibold text-haven-slate-900">Mobility:</span> {mobilityTier}</div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Card */}
              <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1.5">
                <span className="text-[11px] font-bold text-haven-blue-700 uppercase tracking-wider block">
                  Designated Emergency Contact &amp; Legal POA
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-haven-slate-700 gap-2">
                  <div>
                    <span className="font-bold text-haven-slate-900 text-sm block">{contactName}</span>
                    <span>{contactRelationship} · {contactPhone} · {commPreference}</span>
                  </div>
                  <div className="flex gap-2">
                    {hasPoa && <Badge variant="success" size="sm">Healthcare POA</Badge>}
                    {isGuardian && <Badge variant="default" size="sm">Legal Guardian</Badge>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Action Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-haven-border">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
                onClick={handlePrev}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            ) : (
              <Button
                type="button"
                variant="subtle"
                size="sm"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}

            <div className="flex items-center gap-2">
              {currentStep < 6 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                  onClick={handleNext}
                >
                  Continue to Step {currentStep + 1}
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Confirm & Admit Resident'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
