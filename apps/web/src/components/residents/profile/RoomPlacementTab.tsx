import {
  Bed,
  MapPin,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  Sparkles,
  Shield,
  Wifi,
  BellRing,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import { Button } from '../../ui/Button.tsx';
import type { FullResident } from '../../../types/resident.ts';

export interface RoomPlacementTabProps {
  resident: FullResident;
  onInitiateTransfer?: () => void;
}

export function RoomPlacementTab({ resident, onInitiateTransfer }: RoomPlacementTabProps) {
  const placement = resident.placement;
  const history = resident.transferHistory || [];

  return (
    <div className="space-y-6">
      {/* Top Card: Current Assignment */}
      <Card variant="default" padding="lg" className="shadow-haven-card">
        <CardHeader className="pb-3 border-b border-haven-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-haven-blue-700" />
              <div>
                <CardTitle as="h3" className="text-base">Current Living Quarters &amp; Room Placement</CardTitle>
                <p className="text-xs text-haven-slate-500">
                  Allocated accommodation in HAVEN residential facility
                </p>
              </div>
            </div>
            {onInitiateTransfer && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ArrowRightLeft className="w-3.5 h-3.5" />}
                onClick={onInitiateTransfer}
              >
                Request Room Transfer
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-5 space-y-6">
          {/* Key Placement Attributes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-haven-slate-50 border border-haven-border space-y-1">
              <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                Room Number
              </span>
              <p className="text-lg font-bold text-haven-navy-900">{placement.room}</p>
              <span className="text-xs text-haven-slate-500 font-medium">{placement.bed}</span>
            </div>

            <div className="p-4 rounded-2xl bg-haven-slate-50 border border-haven-border space-y-1">
              <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                Facility Wing
              </span>
              <p className="text-lg font-bold text-haven-blue-700">{placement.wing}</p>
              <span className="text-xs text-haven-slate-500 font-medium">{placement.floor}</span>
            </div>

            <div className="p-4 rounded-2xl bg-haven-slate-50 border border-haven-border space-y-1">
              <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                Room Category
              </span>
              <p className="text-lg font-bold text-haven-slate-800">{placement.roomType}</p>
              <span className="text-xs text-haven-slate-500 font-medium">Private en-suite</span>
            </div>

            <div className="p-4 rounded-2xl bg-haven-slate-50 border border-haven-border space-y-1">
              <span className="text-[11px] font-semibold text-haven-slate-500 uppercase tracking-wider block">
                Occupancy Since
              </span>
              <p className="text-lg font-bold text-haven-navy-900">{placement.moveInDate}</p>
              <span className="text-xs text-haven-success font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Continuous Active
              </span>
            </div>
          </div>

          {/* Room Safety & Technology Specs */}
          <div className="p-4 rounded-2xl bg-haven-blue-50/50 border border-haven-blue-100">
            <h4 className="text-xs font-bold text-haven-navy-900 uppercase tracking-wider mb-3">
              Room Amenities &amp; Safety Infrastructure
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2 text-haven-slate-700">
                <BellRing className="w-4 h-4 text-haven-blue-700 shrink-0" />
                <span>Overhead Call-Bell System</span>
              </div>
              <div className="flex items-center gap-2 text-haven-slate-700">
                <Shield className="w-4 h-4 text-haven-success shrink-0" />
                <span>Grab Rails &amp; Low-Threshold Bath</span>
              </div>
              <div className="flex items-center gap-2 text-haven-slate-700">
                <Sparkles className="w-4 h-4 text-haven-blue-700 shrink-0" />
                <span>HEPA Air Filtration &amp; HVAC</span>
              </div>
              <div className="flex items-center gap-2 text-haven-slate-700">
                <Wifi className="w-4 h-4 text-haven-blue-700 shrink-0" />
                <span>Resident Wi-Fi &amp; Monitoring</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfer History */}
      <Card variant="default" padding="lg" className="shadow-haven-card">
        <CardHeader className="pb-3 border-b border-haven-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-haven-blue-700" />
              <CardTitle as="h3" className="text-base">Room Placement &amp; Transfer Log</CardTitle>
            </div>
            <Badge variant="secondary" size="sm">
              {history.length > 0 ? `${history.length} Previous Moves` : 'Initial Placement'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-3 text-xs">
          {history.length > 0 ? (
            <div className="space-y-3">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="p-4 rounded-2xl bg-haven-slate-50 border border-haven-border space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-haven-slate-900 text-sm">
                        {record.fromRoom || record.from} → {record.toRoom || record.to}
                      </span>
                      <Badge variant="info" size="sm">
                        {record.toWing || 'Transferred'}
                      </Badge>
                    </div>
                    <span className="text-xs text-haven-slate-500 font-medium">{record.date}</span>
                  </div>

                  <p className="text-haven-slate-700">
                    <span className="font-semibold text-haven-slate-900">Reason:</span> {record.reason}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-haven-slate-500 pt-1">
                    <span>Authorized By: {record.authorizedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-haven-slate-50 border border-dashed border-haven-border text-center space-y-2">
              <MapPin className="w-6 h-6 text-haven-slate-400 mx-auto" />
              <p className="font-semibold text-haven-slate-800 text-sm">
                Resident has maintained original room placement
              </p>
              <p className="text-xs text-haven-slate-500 max-w-sm mx-auto">
                Admitted directly to {placement.room} ({placement.wing}) on {placement.moveInDate}. No historical transfers logged.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
