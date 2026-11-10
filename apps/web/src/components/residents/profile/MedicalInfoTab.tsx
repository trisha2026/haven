import {
  ShieldAlert,
  HeartHandshake,
  FileText,
  Stethoscope,
  Lock,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import type { FullResident } from '../../../types/resident.ts';

export interface MedicalInfoTabProps {
  resident: FullResident;
}

export function MedicalInfoTab({ resident }: MedicalInfoTabProps) {
  return (
    <div className="space-y-6">
      {/* Prominent Administrative Read-Only Guardrail Banner */}
      <div className="p-4 rounded-2xl bg-haven-blue-50 border border-haven-blue-500/20 text-xs flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-haven-blue-100 text-haven-blue-700 flex items-center justify-center shrink-0 mt-0.5">
          <Lock className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <span className="font-bold text-haven-navy-900 block text-sm">
            Administrative Read-Only Clinical View
          </span>
          <p className="text-haven-slate-600 leading-relaxed">
            Clinical diagnoses, allergy registries, and prescription authorizations are governed by National Medical Commission (NMC) and clinical governance protocols and may only be created or amended by licensed physicians through the Clinical Doctor Workspace. This dossier provides administrative oversight and emergency reference only.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Allergies & Existing Conditions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Card: Known Allergies */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-haven-danger" />
                  <CardTitle as="h3" className="text-base">Documented Allergies</CardTitle>
                </div>
                <Badge variant={resident.allergies.length > 0 ? 'danger' : 'secondary'} size="sm">
                  {resident.allergies.length} Recorded
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3 text-xs">
              {resident.allergies.length > 0 ? (
                resident.allergies.map((allergy, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-haven-danger-soft/20 border border-haven-danger-border/60 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-haven-slate-900">
                        {allergy.allergen}
                      </span>
                      <Badge variant="danger" size="sm">
                        {allergy.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-haven-danger font-medium leading-relaxed">
                      Reaction: {allergy.reaction}
                    </p>
                    <span className="text-[10px] text-haven-slate-400 block pt-0.5">
                      Diagnosed / Documented: {allergy.diagnosedDate}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-haven-slate-50 border border-haven-border text-center text-haven-slate-500">
                  No known active drug or environmental allergies on record.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card: Existing Medical Conditions */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-haven-blue-700" />
                  <CardTitle as="h3" className="text-base">Existing Medical Diagnoses</CardTitle>
                </div>
                <Badge variant="info" size="sm">
                  {resident.conditions.length} Active
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3 text-xs">
              {resident.conditions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-haven-slate-900">
                      {item.condition}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-haven-slate-500 bg-white px-2 py-0.5 rounded border border-haven-border">
                      ICD-10: {item.icdCode}
                    </span>
                  </div>
                  <p className="text-haven-slate-600 leading-relaxed">{item.notes}</p>
                  <div className="flex items-center justify-between text-[10px] text-haven-slate-400 pt-1">
                    <span>Diagnosed: {item.diagnosedDate}</span>
                    <Badge variant={item.status === 'chronic' ? 'secondary' : 'default'} size="sm">
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right 6 Cols: Clinical Assessments & Doctor References */}
        <div className="lg:col-span-6 space-y-6">
          {/* Card: Clinical Notes & Physician Assessments */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Clinical Notes &amp; Evaluations</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3.5 text-xs">
              {resident.clinicalNotes.length > 0 ? (
                resident.clinicalNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3.5 rounded-xl bg-white border border-haven-border shadow-haven-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-haven-navy-900 text-xs">
                        {note.type}
                      </span>
                      <span className="text-[11px] text-haven-slate-500 font-mono">
                        {note.date}
                      </span>
                    </div>

                    <p className="text-haven-slate-700 leading-relaxed bg-haven-slate-50 p-2.5 rounded-lg border border-haven-border-light">
                      {note.summary}
                    </p>

                    <div className="space-y-0.5 text-[11px]">
                      <span className="font-semibold text-haven-blue-700">Recommendation:</span>
                      <p className="text-haven-slate-600">{note.recommendations}</p>
                    </div>

                    <div className="border-t border-haven-border-light pt-1.5 flex items-center justify-between text-[10px] text-haven-slate-500">
                      <span>Author: <strong className="text-haven-slate-900">{note.author}</strong></span>
                      <span>{note.authorRole}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-haven-slate-50 text-center text-haven-slate-500">
                  No recent clinical assessment notes on file.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card: Doctor & Clinical Contact Reference */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Licensed Clinical Overseer</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                <span className="font-bold text-haven-slate-900 block text-sm">
                  {resident.careTeam.primaryDoctor.name}
                </span>
                <p className="text-haven-slate-600">
                  Specialty: {resident.careTeam.primaryDoctor.specialty}
                </p>
                <div className="flex items-center justify-between text-haven-slate-500 pt-1">
                  <span>State License: <strong className="font-mono text-haven-slate-700">{resident.careTeam.primaryDoctor.license}</strong></span>
                  <span>Contact: {resident.careTeam.primaryDoctor.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
