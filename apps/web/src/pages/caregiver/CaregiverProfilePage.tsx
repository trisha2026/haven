import { useState } from 'react';
import {
  UserRound,
  ShieldCheck,
  Mail,
  Phone,
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import { ACTIVE_CAREGIVER } from '../../mock/caregiverWorkspaceData.ts';
import { MOCK_CAREGIVERS } from '../../mock/caregiversData.ts';

export function CaregiverProfilePage() {
  useDocumentTitle('My Caregiver Profile — HAVEN');

  const caregiverData = MOCK_CAREGIVERS.find((c) => c.id === ACTIVE_CAREGIVER.id) || {
    skills: ['Geriatric Medication Administration', 'Wound Management', 'Cardiovascular Monitoring', 'Emergency Triage'],
    certifications: ['Advanced Cardiac Life Support (ACLS)', 'Geriatric Care Excellence Certified', 'Palliative Nursing'],
    credentials: 'M.Sc Nursing, RN',
    joinDate: 'March 15, 2022',
  };

  // Editable personal contact states
  const [phone, setPhone] = useState(ACTIVE_CAREGIVER.phone);
  const [email, setEmail] = useState(ACTIVE_CAREGIVER.email);
  const [isEditing, setIsEditing] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Contact preferences updated.');
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
              <UserRound className="h-3.5 w-3.5 text-[#2457C5]" />
              Staff Profile & Verified Credentials
            </span>
            <span className="text-xs text-[#64748B]">
              Employee ID: {ACTIVE_CAREGIVER.employeeId}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            My Staff Profile
          </h1>
          <p className="text-sm text-[#4A5568]">
            Review your verified clinical registration with the Karnataka Nursing Council (KNC), qualifications, and caseload parameters.
          </p>
        </div>
      </div>

      {/* Top Profile Card */}
      <Card className="border-[#E6ECF4] bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar
              name={ACTIVE_CAREGIVER.fullName}
              size="xl"
              className="border-2 border-[#2457C5] bg-[#E4EDFF] text-[#173B70] font-bold text-2xl"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-[#173B70]">
                  {ACTIVE_CAREGIVER.fullName}
                </h2>
                <Badge variant="default" className="text-xs">
                  {ACTIVE_CAREGIVER.role}
                </Badge>
                <Badge variant="success" className="text-xs">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  KNC Verified
                </Badge>
              </div>

              <p className="text-xs text-[#64748B]">
                {caregiverData.credentials} · Primary Wing: <span className="font-semibold text-[#173B70]">{ACTIVE_CAREGIVER.assignedWing}</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#334155] pt-1">
                <span>Facility: {ACTIVE_CAREGIVER.facility}</span>
                <span>·</span>
                <span>Supervisor: {ACTIVE_CAREGIVER.supervisorName}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#E6ECF4] bg-[#F4F8FF] p-4 text-xs text-[#173B70] shrink-0 space-y-1">
            <div className="text-[10px] uppercase font-bold text-[#64748B]">State Registration</div>
            <div className="text-sm font-bold text-[#173B70]">{ACTIVE_CAREGIVER.registrationNumber}</div>
            <div className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Active Good Standing (Renewal: 2028)
            </div>
          </div>
        </div>
      </Card>

      {/* Main Grid: Clinical Credentials & Contact Preferences */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Verified Qualifications & Certifications */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="border-b border-[#E6ECF4] px-5 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-[#173B70]">
              Verified Credentials & Competencies
            </CardTitle>
            <Lock className="h-4 w-4 text-[#64748B]" />
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-xs">
            <div>
              <div className="font-bold text-[#173B70] mb-2 flex items-center gap-1.5">
                <Award className="h-4 w-4 text-[#2457C5]" />
                Professional Certifications:
              </div>
              <div className="flex flex-wrap gap-2">
                {caregiverData.certifications.map((cert, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs py-1 px-2.5 bg-[#F4F8FF] text-[#173B70] border-[#E6ECF4]">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E6ECF4]">
              <div className="font-bold text-[#173B70] mb-2 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#2457C5]" />
                Clinical Nursing Skills & Competencies:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {caregiverData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs text-[#334155]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E6ECF4] text-[11px] text-[#64748B]">
              <span className="font-bold">Administrative Governance:</span> Verified credentials are electronically audited by the Karnataka State Nursing Council. Any credential updates must be submitted to HR / Administration.
            </div>
          </CardContent>
        </Card>

        {/* Contact Preferences */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardHeader className="border-b border-[#E6ECF4] px-5 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-[#173B70]">
              Staff Contact & Operational Reach
            </CardTitle>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setIsEditing(true)}
              >
                Edit Details
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-5">
            {isEditing ? (
              <form onSubmit={handleSaveContact} className="space-y-4 text-xs">
                <div>
                  <label className="text-xs font-semibold text-[#173B70]">Mobile Number *</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#173B70]">Email Address *</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button type="submit" variant="default" size="sm">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#2457C5]" />
                  <div>
                    <div className="text-[#64748B]">Registered Duty Phone</div>
                    <div className="font-bold text-[#173B70] text-sm">{phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#2457C5]" />
                  <div>
                    <div className="text-[#64748B]">Clinical Messaging Email</div>
                    <div className="font-bold text-[#173B70] text-sm">{email}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E6ECF4] text-[#64748B] space-y-1">
                  <div>Employment Tenure: Full-time Staff since {caregiverData.joinDate}</div>
                  <div>Shift Designation: Primary Day Lead (07:00 – 15:00 IST)</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
