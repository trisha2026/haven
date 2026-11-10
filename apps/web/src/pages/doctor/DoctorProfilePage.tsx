import { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  Building,
  Clock,
  CheckCircle2,
  Edit,
  Save,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import { ACTIVE_DOCTOR, PRIMARY_DOCTOR_RESIDENT_IDS } from '../../mock/doctorWorkspaceData.ts';

export function DoctorProfilePage() {
  useDocumentTitle('My Profile & Clinical Credentials — Doctor');

  const [phone, setPhone] = useState(ACTIVE_DOCTOR.phone);
  const [email, setEmail] = useState(ACTIVE_DOCTOR.email);
  const [affiliation, setAffiliation] = useState(ACTIVE_DOCTOR.hospitalAffiliation);
  const [onCallHours, setOnCallHours] = useState(ACTIVE_DOCTOR.onCallSchedule);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-haven-navy-900 tracking-tight">
            My Profile & Clinical Credentials
          </h1>
          <p className="text-xs text-haven-neutral-500 mt-1">
            Verified practitioner credentials, council registration, institutional affiliation, and contact settings
          </p>
        </div>

        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1.5" /> Save Changes
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-1.5" /> Edit Contact Info
            </Button>
          )}
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile and clinical contact preferences successfully updated.</span>
        </div>
      )}

      {/* Main Profile Card */}
      <Card className="border-haven-blue-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-haven-navy-900 to-haven-royal-900 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <Avatar
              name={ACTIVE_DOCTOR.fullName}
              size="xl"
              className="ring-4 ring-white/30 text-2xl font-bold shrink-0"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {ACTIVE_DOCTOR.fullName}
                </h2>
                <Badge variant="secondary" className="bg-emerald-400/20 text-emerald-200 border-emerald-400/30 text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  Verified Clinician
                </Badge>
              </div>

              <p className="text-sm text-blue-100 font-medium">
                {ACTIVE_DOCTOR.title}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-200 pt-1">
                <span>Registration: <strong className="text-white font-mono">{ACTIVE_DOCTOR.registrationNumber}</strong></span>
                <span>•</span>
                <span>Council: {ACTIVE_DOCTOR.registrationCouncil}</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-haven-ice-blue border border-haven-blue-100">
              <span className="text-[11px] font-semibold text-haven-neutral-500 uppercase tracking-wider block">
                Primary Caseload
              </span>
              <span className="text-2xl font-bold text-haven-navy-900 mt-1 block">
                {PRIMARY_DOCTOR_RESIDENT_IDS.length} Residents
              </span>
              <span className="text-xs text-haven-royal-blue block mt-0.5">
                Lead Attending Physician
              </span>
            </div>

            <div className="p-4 rounded-xl bg-haven-ice-blue border border-haven-blue-100">
              <span className="text-[11px] font-semibold text-haven-neutral-500 uppercase tracking-wider block">
                Specialist Grants
              </span>
              <span className="text-2xl font-bold text-haven-navy-900 mt-1 block">
                1 Active
              </span>
              <span className="text-xs text-haven-royal-blue block mt-0.5">
                Aarav Deshmukh (Memory Care)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-haven-ice-blue border border-haven-blue-100">
              <span className="text-[11px] font-semibold text-haven-neutral-500 uppercase tracking-wider block">
                Prescriptions Overseen
              </span>
              <span className="text-2xl font-bold text-haven-navy-900 mt-1 block">
                14 Regimens
              </span>
              <span className="text-xs text-emerald-700 block mt-0.5">
                All adherence verified
              </span>
            </div>
          </div>

          {/* Credentials and Details */}
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-haven-navy-900 border-b border-haven-neutral-200 pb-2">
              Clinical Qualifications & Academic Background
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-haven-neutral-500 block text-[11px] font-medium">Academic Degrees:</span>
                <span className="text-haven-navy-900 font-semibold">{ACTIVE_DOCTOR.qualifications}</span>
              </div>
              <div>
                <span className="text-haven-neutral-500 block text-[11px] font-medium">Clinical Specialty:</span>
                <span className="text-haven-navy-900 font-semibold">{ACTIVE_DOCTOR.specialty}</span>
              </div>
            </div>
            <div>
              <span className="text-haven-neutral-500 block text-[11px] font-medium">Practitioner Biography:</span>
              <p className="text-haven-neutral-700 leading-relaxed mt-0.5">
                {ACTIVE_DOCTOR.bio}
              </p>
            </div>
          </div>

          {/* Contact Details & Practice Location */}
          <div className="space-y-4 text-xs pt-2">
            <h3 className="font-bold text-sm text-haven-navy-900 border-b border-haven-neutral-200 pb-2">
              Practice Location & Contact Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Mobile / Emergency Pager:</label>
                {isEditing ? (
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-xs"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-haven-navy-900 font-semibold p-2 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200">
                    <Phone className="w-3.5 h-3.5 text-haven-royal-blue" />
                    <span>{phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Clinical Email:</label>
                {isEditing ? (
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-xs"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-haven-navy-900 font-semibold p-2 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200">
                    <Mail className="w-3.5 h-3.5 text-haven-royal-blue" />
                    <span>{email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">Hospital Affiliation:</label>
                {isEditing ? (
                  <Input
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    className="text-xs"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-haven-navy-900 font-semibold p-2 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200">
                    <Building className="w-3.5 h-3.5 text-haven-royal-blue" />
                    <span>{affiliation}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold text-haven-navy-900 block mb-1">On-Call Schedule:</label>
                {isEditing ? (
                  <Input
                    value={onCallHours}
                    onChange={(e) => setOnCallHours(e.target.value)}
                    className="text-xs"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-haven-navy-900 font-semibold p-2 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200">
                    <Clock className="w-3.5 h-3.5 text-haven-royal-blue" />
                    <span>{onCallHours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
