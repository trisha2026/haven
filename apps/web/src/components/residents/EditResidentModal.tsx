import { useState } from 'react';
import { Edit, CheckCircle2 } from 'lucide-react';
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
import { Input } from '../ui/Input.tsx';
import type { FullResident } from '../../types/resident.ts';

export interface EditResidentModalProps {
  resident: FullResident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResidentUpdated: (updated: FullResident) => void;
}

export function EditResidentModal({
  resident,
  open,
  onOpenChange,
  onResidentUpdated,
}: EditResidentModalProps) {
  const [preferredName, setPreferredName] = useState(resident?.preferredName || '');
  const [dietaryProtocol, setDietaryProtocol] = useState(resident?.dietaryProtocol || '');
  const [mobilityStatus, setMobilityStatus] = useState(resident?.mobilityStatus || '');
  const [contactPhone, setContactPhone] = useState(resident?.emergencyContacts[0]?.phone || '');
  const [contactName, setContactName] = useState(resident?.emergencyContacts[0]?.name || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Sync state when a different resident is selected
  const [prevId, setPrevId] = useState<string | undefined>(resident?.id);
  if (resident && resident.id !== prevId) {
    setPrevId(resident.id);
    setPreferredName(resident.preferredName);
    setDietaryProtocol(resident.dietaryProtocol);
    setMobilityStatus(resident.mobilityStatus);
    setContactPhone(resident.emergencyContacts[0]?.phone || '');
    setContactName(resident.emergencyContacts[0]?.name || '');
  }

  if (!resident) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedResident: FullResident = {
      ...resident,
      preferredName: preferredName.trim() || resident.preferredName,
      dietaryProtocol: dietaryProtocol.trim() || resident.dietaryProtocol,
      mobilityStatus: mobilityStatus.trim() || resident.mobilityStatus,
      emergencyContacts: [
        {
          ...resident.emergencyContacts[0],
          name: contactName.trim() || resident.emergencyContacts[0]?.name || 'Primary Contact',
          phone: contactPhone.trim() || resident.emergencyContacts[0]?.phone || '',
        },
        ...resident.emergencyContacts.slice(1),
      ],
    };

    setTimeout(() => {
      setSuccess('Resident profile details updated.');
      setIsSubmitting(false);

      setTimeout(() => {
        onResidentUpdated(updatedResident);
        setSuccess(null);
        onOpenChange(false);
      }, 900);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-haven-blue-100 text-haven-blue-700 flex items-center justify-center shrink-0">
                <Edit className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle>Edit Profile &amp; Contact Details</DialogTitle>
                <DialogDescription>
                  Modify personal preferences and emergency contact for {resident.fullName}.
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

          <div className="space-y-3 py-1 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Full Legal Name"
                value={resident.fullName}
                disabled
                helperText="Legal name changes require official documentation."
              />
              <Input
                label="Preferred / Familiar Name"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Primary Contact Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <Input
                label="Primary Emergency Phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Mobility Support & Transfer Needs"
                value={mobilityStatus}
                onChange={(e) => setMobilityStatus(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Dietary Protocol & Meal Consistency"
                value={dietaryProtocol}
                onChange={(e) => setDietaryProtocol(e.target.value)}
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
