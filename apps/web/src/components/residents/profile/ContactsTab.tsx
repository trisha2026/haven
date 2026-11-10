import {
  HeartHandshake,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Stethoscope,
  Users,
  Award,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import type { FullResident } from '../../../types/resident.ts';

export interface ContactsTabProps {
  resident: FullResident;
}

export function ContactsTab({ resident }: ContactsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Emergency Contacts, Next of Kin & Legal Guardians */}
        <div className="lg:col-span-7 space-y-6">
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-haven-blue-700" />
                  <CardTitle as="h3" className="text-base">
                    Emergency Contacts &amp; Legal Representatives
                  </CardTitle>
                </div>
                <Badge variant="secondary" size="sm">
                  {resident.emergencyContacts.length} Registered
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-4 text-xs">
              {resident.emergencyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-haven-slate-50 border border-haven-border space-y-3 transition-colors hover:border-haven-blue-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-haven-slate-900">
                          {contact.name}
                        </span>
                        {contact.isPrimary && (
                          <Badge variant="default" size="sm">
                            Primary Next of Kin
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-haven-slate-500 font-medium">
                        Relationship: {contact.relationship}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {contact.hasPowerOfAttorney && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-haven-success bg-haven-success-soft px-2 py-0.5 rounded-full border border-haven-success-border">
                          <ShieldCheck className="w-3 h-3" />
                          Healthcare POA
                        </span>
                      )}
                      {contact.isLegalGuardian && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-haven-blue-700 bg-haven-blue-50 px-2 py-0.5 rounded-full border border-haven-blue-500/20">
                          Legal Guardian
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-haven-border-light text-haven-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-haven-blue-700 shrink-0" />
                      <span className="font-semibold text-haven-slate-900">{contact.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-haven-slate-400 shrink-0" />
                      <span>{contact.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-haven-slate-400 shrink-0" />
                      <span>{contact.address}</span>
                    </div>

                    {contact.communicationPreference && (
                      <div className="flex items-center gap-2 pt-1">
                        <MessageSquare className="w-3.5 h-3.5 text-haven-blue-600 shrink-0" />
                        <span className="text-[11px] font-medium text-haven-slate-700">
                          Preferred Channel:{' '}
                          <span className="font-bold text-haven-blue-800">
                            {contact.communicationPreference}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right 5 Cols: Facility Care Team & Clinicians */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">
                  Assigned Care Team &amp; Clinicians
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3.5 text-xs">
              {/* Primary Doctor */}
              <div className="p-4 rounded-xl bg-haven-blue-50/60 border border-haven-blue-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-haven-navy-900">
                    {resident.careTeam.primaryDoctor.name}
                  </span>
                  <Badge variant="default" size="sm">Lead Physician</Badge>
                </div>
                <p className="text-haven-slate-600">
                  {resident.careTeam.primaryDoctor.specialty} · License {resident.careTeam.primaryDoctor.license}
                </p>
                <div className="flex items-center gap-2 text-haven-blue-700 pt-1 font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{resident.careTeam.primaryDoctor.phone}</span>
                </div>
              </div>

              {/* Visiting Consultant */}
              {resident.careTeam.visitingSpecialist && (
                <div className="p-4 rounded-xl bg-haven-slate-50 border border-haven-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-haven-slate-900">
                      {resident.careTeam.visitingSpecialist.name}
                    </span>
                    <Badge variant="secondary" size="sm">Visiting Specialist</Badge>
                  </div>
                  <p className="text-haven-slate-600">
                    {resident.careTeam.visitingSpecialist.specialty}
                  </p>
                  <p className="text-[11px] text-haven-slate-500">
                    Affiliation: {resident.careTeam.visitingSpecialist.hospital}
                  </p>
                </div>
              )}

              {/* Primary Nurse */}
              <div className="p-4 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-haven-slate-900">
                    {resident.careTeam.primaryNurse.name}
                  </span>
                  <Badge variant="info" size="sm">Primary Nurse</Badge>
                </div>
                <p className="text-haven-slate-600">
                  {resident.careTeam.primaryNurse.role} · {resident.careTeam.primaryNurse.shift}
                </p>
              </div>

              {/* Caregiver Pod */}
              <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-haven-slate-500" />
                  <div>
                    <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                      Caregiver Unit
                    </span>
                    <span className="font-bold text-haven-slate-900 text-xs">
                      {resident.careTeam.caregiverTeam}
                    </span>
                  </div>
                </div>
                <Award className="w-4 h-4 text-haven-blue-700" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
