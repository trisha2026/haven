import {
  ClipboardCheck,
  Activity,
  Utensils,
  Droplets,
  Sparkles,
  Eye,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import type { FullResident } from '../../../types/resident.ts';

export interface CarePlanTabProps {
  resident: FullResident;
}

export function CarePlanTab({ resident }: CarePlanTabProps) {
  const plan = resident.carePlan;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-4 rounded-2xl bg-haven-blue-50 border border-haven-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-haven-blue-100 text-haven-blue-700 flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-haven-navy-900">
              Personalized Comprehensive Care Plan
            </h3>
            <p className="text-xs text-haven-slate-600">
              Approved multidisciplinary protocol for {resident.fullName} ({resident.careLevel})
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-haven-slate-500 font-medium">Next Review:</span>
          <Badge variant="default" size="sm">
            <Calendar className="w-3 h-3 mr-1" />
            {plan?.nextCarePlanReviewDate || 'December 2026'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Mobility, Nutrition, Hygiene */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mobility & Fall Risk */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-haven-blue-700" />
                  <CardTitle as="h3" className="text-base">Mobility &amp; Transfer Protocols</CardTitle>
                </div>
                {plan?.fallRiskLevel === 'High' ? (
                  <Badge variant="danger" size="sm" dot>High Fall Risk</Badge>
                ) : (
                  <Badge variant="warning" size="sm" dot>Moderate Risk</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                  <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                    Mobility Assistance
                  </span>
                  <p className="font-semibold text-haven-slate-900 text-sm">
                    {plan?.mobilitySupport || resident.mobilityStatus}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                  <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                    Transfer Requirement
                  </span>
                  <p className="font-semibold text-haven-slate-900 text-sm">
                    {plan?.transferAssistance || '1-person assist'}
                  </p>
                </div>
              </div>

              {resident.alerts.length > 0 && (
                <div className="p-3 rounded-xl bg-haven-danger-soft border border-haven-danger-border flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-haven-danger shrink-0 mt-0.5" />
                  <div className="text-xs text-haven-slate-800 space-y-1">
                    <span className="font-bold text-haven-danger block">Safety Precaution Directives</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {resident.alerts.map((alert, idx) => (
                        <li key={idx}>{alert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Nutrition & Dietary Protocol */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Nutrition &amp; Hydration Protocols</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-4 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider">
                    Dietary Texture &amp; Specification
                  </span>
                  <Badge variant="secondary" size="sm">Verified Dietitian Plan</Badge>
                </div>
                <p className="font-semibold text-haven-slate-900 text-sm">
                  {plan?.nutritionDietary || resident.dietaryProtocol}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-haven-blue-50/60 border border-haven-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Droplets className="w-4 h-4 text-haven-blue-600" />
                  <div>
                    <span className="text-[11px] font-bold text-haven-navy-900 block">Daily Hydration Target</span>
                    <span className="text-haven-slate-600 text-xs">
                      {plan?.hydrationGoal || '2,000 mL daily target across meals and activity intervals.'}
                    </span>
                  </div>
                </div>
                <Badge variant="info" size="sm">Logged Daily</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Personal Care & Hygiene */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Personal Care &amp; Hygiene Schedule</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                  <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                    Bathing &amp; Shower Schedule
                  </span>
                  <p className="font-semibold text-haven-slate-900 text-xs">
                    {plan?.bathingSchedule || 'Mon, Wed, Fri mornings'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                  <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                    Continence Protocol
                  </span>
                  <p className="font-semibold text-haven-slate-900 text-xs">
                    {plan?.continenceCare || 'Scheduled 2-hour prompt schedule.'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                  Self-Care Independence
                </span>
                <p className="text-haven-slate-700">
                  {plan?.personalCareHygiene || 'Supervised assistance for lower extremity dressing and grooming.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (5 cols): Sensory Aids, Routine & Caregiver Checklist */}
        <div className="lg:col-span-5 space-y-6">
          {/* Daily Schedule & Routine */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Daily Routine &amp; Preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-4 space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-2">
                <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                  Engagement &amp; Routine Instructions
                </span>
                <p className="text-haven-slate-700 leading-relaxed">
                  {plan?.dailyRoutineInstructions || 'Prefers peaceful mornings in courtyard; afternoon group activities.'}
                </p>
              </div>

              {/* Sensory Aids */}
              <div className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-haven-blue-700" />
                  <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider">
                    Prescribed Sensory Aids
                  </span>
                </div>
                {plan?.sensoryAids && plan.sensoryAids.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {plan.sensoryAids.map((aid, idx) => (
                      <Badge key={idx} variant="info" size="sm">
                        {aid}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-haven-slate-500">None prescribed on record.</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Caregiver Action Checklist */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Caregiver Action Checklist</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-4 space-y-2.5 text-xs">
              {plan?.caregiverActionChecklist && plan.caregiverActionChecklist.length > 0 ? (
                plan.caregiverActionChecklist.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-haven-success shrink-0 mt-0.5" />
                    <span className="text-haven-slate-800 font-medium">{task}</span>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-haven-success shrink-0 mt-0.5" />
                  <span className="text-haven-slate-800 font-medium">Verify daily vital signs and medication adherence</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
