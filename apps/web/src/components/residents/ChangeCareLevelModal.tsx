import { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
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
import type { FullResident, ResidentCareClassification } from '../../types/resident.ts';

export interface ChangeCareLevelModalProps {
  resident: FullResident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCareLevelChanged: (residentId: string, newLevel: ResidentCareClassification, justification: string) => void;
}

export function ChangeCareLevelModal({
  resident,
  open,
  onOpenChange,
  onCareLevelChanged,
}: ChangeCareLevelModalProps) {
  const [newLevel, setNewLevel] = useState<ResidentCareClassification>('Skilled Nursing');
  const [clinicalJustification, setClinicalJustification] = useState('Physician reassessment recommendation');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  if (!resident) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSuccess(`Care classification updated to ${newLevel}.`);
      setIsSubmitting(false);

      setTimeout(() => {
        onCareLevelChanged(
          resident.id,
          newLevel,
          `${clinicalJustification}: ${notes || 'Administrative review completed'}`
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
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle>Update Care Classification Tier</DialogTitle>
                <DialogDescription>
                  Modify official care plan category for <strong>{resident.fullName}</strong> ({resident.id}).
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

          {/* Current Tier Info */}
          <div className="p-3 rounded-xl bg-haven-slate-50 border border-haven-border text-xs space-y-1">
            <span className="font-semibold text-haven-slate-500 uppercase tracking-wider block text-[10px]">
              Current Classification
            </span>
            <div className="font-bold text-sm text-haven-slate-900">
              {resident.careLevel}
            </div>
            <p className="text-haven-slate-500">
              Attending Physician: {resident.careTeam.primaryDoctor.name} · Lead Nurse: {resident.careTeam.primaryNurse.name}
            </p>
          </div>

          <div className="space-y-3 py-1 text-xs">
            {/* New Classification Tier */}
            <Select
              label="New Care Classification *"
              options={[
                { value: 'Independent Living', label: 'Independent Living (Tier 1 — Minimal Support)' },
                { value: 'Assisted Living', label: 'Assisted Living (Tier 2 — ADL Support)' },
                { value: 'Memory Care', label: 'Memory Care (Secured Pavilion Tier)' },
                { value: 'Skilled Nursing', label: 'Skilled Nursing (Tier 4 — Comprehensive Clinical)' },
              ]}
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value as ResidentCareClassification)}
            />

            {/* Justification Select */}
            <Select
              label="Clinical / Regulatory Basis *"
              options={[
                { value: 'Physician reassessment recommendation', label: 'Physician reassessment recommendation' },
                { value: 'Post-incident mobility evaluation', label: 'Post-incident mobility evaluation' },
                { value: 'Cognitive decline assessment', label: 'Cognitive decline assessment' },
                { value: 'Rehabilitation recovery milestone', label: 'Rehabilitation recovery milestone' },
              ]}
              value={clinicalJustification}
              onChange={(e) => setClinicalJustification(e.target.value)}
            />

            {/* Justification Details */}
            <div>
              <label className="block text-xs font-semibold text-haven-slate-700 mb-1">
                Clinical Reference &amp; Rate Confirmation Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Geriatric re-evaluation reviewed by Dr. Mehta; family POA consulted and billing tier updated."
                className="w-full px-3 py-2 rounded-xl text-xs border border-haven-border bg-haven-slate-50 text-haven-slate-900 focus:outline-none focus:ring-2 focus:ring-haven-blue-700/20 focus:border-haven-blue-700"
              />
            </div>

            <div className="p-2.5 rounded-lg bg-haven-warning-soft/60 border border-haven-warning-border/80 flex items-start gap-2 text-[11px] text-haven-warning">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Care tier modifications update caregiver staffing allocation ratios and family billing schedules.
              </span>
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
              Update Care Classification
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
