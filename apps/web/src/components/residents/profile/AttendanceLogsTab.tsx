import {
  CalendarClock,
  UserCheck,
  MapPin,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import type { FullResident } from '../../../types/resident.ts';

export interface AttendanceLogsTabProps {
  resident: FullResident;
}

export function AttendanceLogsTab({ resident }: AttendanceLogsTabProps) {
  return (
    <div className="space-y-6">
      {/* Current Location & Planned Daily Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Daily Attendance & Room Check-in Logs */}
        <div className="lg:col-span-6 space-y-6">
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-haven-blue-700" />
                  <CardTitle as="h3" className="text-base">Daily Attendance &amp; Check-In Logs</CardTitle>
                </div>
                <Badge variant="success" size="sm" dot>
                  Verified Today
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3 text-xs">
              {resident.attendanceLogs.length > 0 ? (
                resident.attendanceLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-haven-slate-900">
                        <MapPin className="w-3.5 h-3.5 text-haven-blue-700 shrink-0" />
                        <span>{log.location}</span>
                      </div>
                      <span className="font-mono text-haven-slate-500 font-medium">
                        {log.time}
                      </span>
                    </div>

                    <p className="text-haven-slate-600 leading-relaxed pl-5.5">
                      {log.notes}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-haven-slate-400 pl-5.5 pt-0.5">
                      <span>Date: {log.date}</span>
                      <span>Verified by: <strong className="text-haven-slate-700">{log.verifiedBy}</strong></span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-haven-slate-500 bg-haven-slate-50 rounded-xl">
                  No attendance check-ins logged for this period.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily Schedule Routine */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Standard Daily Schedule &amp; Routines</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-haven-border">
                <span className="font-mono font-bold text-haven-blue-700 w-16">07:30 AM</span>
                <span className="font-medium text-haven-slate-900 flex-1">Morning Breakfast &amp; Vitals Round</span>
                <span className="text-[11px] text-haven-slate-500">In Suite</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-haven-border">
                <span className="font-mono font-bold text-haven-blue-700 w-16">10:00 AM</span>
                <span className="font-medium text-haven-slate-900 flex-1">Physical Therapy &amp; Gentle Mobility</span>
                <span className="text-[11px] text-haven-slate-500">Therapy Gym</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-haven-border">
                <span className="font-mono font-bold text-haven-blue-700 w-16">12:30 PM</span>
                <span className="font-medium text-haven-slate-900 flex-1">Communal Luncheon</span>
                <span className="text-[11px] text-haven-slate-500">Dining Pavilion</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-haven-border">
                <span className="font-mono font-bold text-haven-blue-700 w-16">15:00 PM</span>
                <span className="font-medium text-haven-slate-900 flex-1">Sensory Garden &amp; Family Visiting Hours</span>
                <span className="text-[11px] text-haven-slate-500">Courtyard</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-haven-border">
                <span className="font-mono font-bold text-haven-blue-700 w-16">18:00 PM</span>
                <span className="font-medium text-haven-slate-900 flex-1">Dinner &amp; Evening Medication Round</span>
                <span className="text-[11px] text-haven-slate-500">Wing Cluster</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 6 Cols: Family Visitor Logs & Leave History */}
        <div className="lg:col-span-6 space-y-6">
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-haven-blue-700" />
                  <CardTitle as="h3" className="text-base">Family &amp; Visitor Sign-In Logs</CardTitle>
                </div>
                <Badge variant="default" size="sm">
                  {resident.visitorLogs.length} Registered Visits
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3 text-xs">
              {resident.visitorLogs.length > 0 ? (
                resident.visitorLogs.map((vis) => (
                  <div
                    key={vis.id}
                    className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-haven-slate-900">
                        {vis.visitorName}
                      </span>
                      <span className="font-mono text-[11px] text-haven-blue-700 bg-haven-blue-50 px-2 py-0.5 rounded border border-haven-blue-500/20">
                        Badge #{vis.badgeNumber}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-haven-slate-600">
                      <span>Relationship: <strong>{vis.relationship}</strong></span>
                      <span>{vis.date}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-haven-slate-400 pt-1 border-t border-haven-border-light">
                      <span>Check-in: {vis.checkInTime} {vis.checkOutTime ? `· Check-out: ${vis.checkOutTime}` : ''}</span>
                      <span>Escorted by: {vis.escortedBy}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-haven-slate-500 bg-haven-slate-50 rounded-xl">
                  No outside visitor visits logged in the past 7 days.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Off-site passes */}
          <Card variant="default" padding="lg" className="shadow-haven-card">
            <CardHeader className="pb-3 border-b border-haven-border">
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4 text-haven-blue-700" />
                <CardTitle as="h3" className="text-base">Authorized Off-Site Passes &amp; Outings</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-haven-slate-900">Weekend Outing Pass</span>
                  <Badge variant="success" size="sm">Completed</Badge>
                </div>
                <p className="text-haven-slate-600">
                  Accompanied by family POA to botanical cafe and private residence. Returned on time.
                </p>
                <span className="text-[10px] text-haven-slate-400 block pt-0.5">Authorized by Lead RN</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
