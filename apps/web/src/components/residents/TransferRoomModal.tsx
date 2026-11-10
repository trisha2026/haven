import { useState } from 'react';
import { ArrowRightLeft, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/Dialog.tsx';
import { Button } from '../ui/Button.tsx';
import { Select } from '../ui/Select.tsx';
import { Input } from '../ui/Input.tsx';
import type { FullResident, FacilityWing } from '../../types/resident.ts';
import { MOCK_AVAILABLE_ROOMS } from '../../mock/residentsData.ts';

export interface TransferRoomModalProps {
  resident: FullResident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTransferCompleted: (residentId: string, newWing: FacilityWing, newRoom: string, newBed: string, reason: string) => void;
}

export function TransferRoomModal({
  resident,
  open,
  onOpenChange,
  onTransferCompleted,
}: TransferRoomModalProps) {
  const [selectedDestination, setSelectedDestination] = useState('0');
  const [effectiveDate, setEffectiveDate] = useState('2026-11-10');
  const [transferReason, setTransferReason] = useState('Routine placement optimization');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  if (!resident) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const chosenRoom = MOCK_AVAILABLE_ROOMS[parseInt(selectedDestination, 10)] || MOCK_AVAILABLE_ROOMS[0];

    setTimeout(() => {
      setSuccess(`Room transfer queued. ${resident.fullName} allocated to ${chosenRoom.room} (${chosenRoom.wing}).`);
      setIsSubmitting(false);

      setTimeout(() => {
        onTransferCompleted(
          resident.id,
          chosenRoom.wing as FacilityWing,
          chosenRoom.room,
          chosenRoom.bed,
          `${transferReason}: ${notes || 'Administrative transfer approval'}`
        );
        setSuccess(null);
        onOpenChange(false);
      }, 1000);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-haven-blue-100 text-haven-blue-700 flex items-center justify-center shrink-0">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle>Transfer Room &amp; Bed Allocation</DialogTitle>
                <DialogDescription>
                  Reallocate <strong>{resident.fullName}</strong> ({resident.id}) to an available bed.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {success && (
            <div className="p-3 rounded-xl bg-haven-success-soft border border-haven-success-border flex items-center gap-2 text-xs text-haven-success">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Current Placement Summary Box */}
          <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border text-xs space-y-1">
            <span className="font-semibold text-haven-slate-500 uppercase tracking-wider block text-[10px]">
              Current Placement
            </span>
            <div className="font-bold text-sm text-haven-slate-900">
              {resident.placement.room} · {resident.placement.bed} ({resident.placement.wing})
            </div>
            <p className="text-haven-slate-500">
              Care Classification: <strong>{resident.careLevel}</strong> · Lead Nurse: {resident.careTeam.primaryNurse.name}
            </p>
          </div>

          <div className="space-y-3 py-1 text-xs">
            {/* Target Room Selection */}
            <div>
              <label className="block text-xs font-semibold text-haven-slate-700 mb-1">
                Available Destination Bed *
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs border border-haven-border bg-white text-haven-slate-900 focus:outline-none focus:ring-2 focus:ring-haven-blue-700/20 focus:border-haven-blue-700"
              >
                {MOCK_AVAILABLE_ROOMS.map((item, index) => (
                  <option key={index} value={index}>
                    {item.room} · {item.bed} — {item.wing} ({item.floor}, {item.careLevel})
                  </option>
                ))}
              </select>
            </div>

            {/* Effective Date & Reason */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Effective Transfer Date *"
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                required
              />
              <Select
                label="Primary Reason *"
                options={[
                  { value: 'Routine placement optimization', label: 'Routine placement optimization' },
                  { value: 'Care tier level upgrade/downgrade', label: 'Care tier level adjustment' },
                  { value: 'Resident/Family preference request', label: 'Resident/Family preference request' },
                  { value: 'Room maintenance / sanitization', label: 'Room maintenance / sanitization' },
                ]}
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
              />
            </div>

            {/* Transfer Notes */}
            <div>
              <label className="block text-xs font-semibold text-haven-slate-700 mb-1">
                Administrative Notes &amp; Logistics Instructions
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Facilities team notified for luggage assist; nursing chart tag updated."
                className="w-full px-3 py-2 rounded-xl text-xs border border-haven-border bg-haven-slate-50 text-haven-slate-900 focus:outline-none focus:ring-2 focus:ring-haven-blue-700/20 focus:border-haven-blue-700"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              isLoading={isSubmitting}
            >
              Confirm Room Transfer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
