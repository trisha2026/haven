import { useNavigate } from 'react-router';
import {
  HelpCircle,
  Phone,
  Keyboard,
  ShieldCheck,
  Palette,
} from 'lucide-react';
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

export interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-haven-blue-700 text-white flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle>HAVEN Help &amp; Support Centre</DialogTitle>
              <DialogDescription>
                Emergency protocols, facility direct lines, and keyboard shortcuts.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-2 max-h-[65vh] overflow-y-auto haven-scroll pr-1">
          {/* Emergency & Direct Lines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-haven-slate-900 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-haven-danger" />
              <span>Facility Direct Lines &amp; Emergency Escalation</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl border border-haven-border bg-haven-slate-50 space-y-1">
                <p className="text-xs font-bold text-haven-slate-900">Nurse Station Emergency Call</p>
                <p className="text-xs font-mono font-semibold text-haven-danger">Ext. 2222 / Speed Dial 1</p>
                <p className="text-[11px] text-haven-slate-500">Immediate response for resident distress or falls</p>
              </div>
              <div className="p-3 rounded-xl border border-haven-border bg-haven-slate-50 space-y-1">
                <p className="text-xs font-bold text-haven-slate-900">On-Call Physician Hotline</p>
                <p className="text-xs font-mono font-semibold text-haven-blue-700">Ext. 3301 · Dr. Mehta (Geriatric)</p>
                <p className="text-[11px] text-haven-slate-500">Urgent prescription reviews &amp; acute changes</p>
              </div>
              <div className="p-3 rounded-xl border border-haven-border bg-haven-slate-50 space-y-1">
                <p className="text-xs font-bold text-haven-slate-900">Pharmacy &amp; Medication Vault</p>
                <p className="text-xs font-mono font-semibold text-haven-slate-900">Ext. 1104 · Willow Creek Rx</p>
                <p className="text-[11px] text-haven-slate-500">Emergency dose dispense &amp; stock verification</p>
              </div>
              <div className="p-3 rounded-xl border border-haven-border bg-haven-slate-50 space-y-1">
                <p className="text-xs font-bold text-haven-slate-900">HAVEN Clinical IT Helpdesk</p>
                <p className="text-xs font-mono font-semibold text-haven-slate-900">Ext. 9900 · 24/7 Operations</p>
                <p className="text-[11px] text-haven-slate-500">Tablet issues, badge scanner errors, password reset</p>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-haven-slate-900 flex items-center gap-2">
              <Keyboard className="w-3.5 h-3.5 text-haven-slate-500" />
              <span>Keyboard Navigation &amp; Shortcuts</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-haven-border-light bg-haven-slate-50/70">
                <span className="text-haven-slate-700">Open Global Search</span>
                <kbd className="px-2 py-0.5 rounded bg-white border border-haven-border font-mono text-[11px] font-semibold text-haven-slate-900">
                  Ctrl + K / ⌘K
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-haven-border-light bg-haven-slate-50/70">
                <span className="text-haven-slate-700">Close Any Modal / Menu</span>
                <kbd className="px-2 py-0.5 rounded bg-white border border-haven-border font-mono text-[11px] font-semibold text-haven-slate-900">
                  ESC
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-haven-border-light bg-haven-slate-50/70">
                <span className="text-haven-slate-700">Cycle Accessible Focus</span>
                <kbd className="px-2 py-0.5 rounded bg-white border border-haven-border font-mono text-[11px] font-semibold text-haven-slate-900">
                  Tab / Shift+Tab
                </kbd>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-haven-border-light bg-haven-slate-50/70">
                <span className="text-haven-slate-700">Select Highlighted Result</span>
                <kbd className="px-2 py-0.5 rounded bg-white border border-haven-border font-mono text-[11px] font-semibold text-haven-slate-900">
                  Enter ↵
                </kbd>
              </div>
            </div>
          </div>

          {/* Design System & Guidance */}
          <div className="p-4 rounded-xl border border-haven-border bg-haven-blue-50/60 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-haven-blue-700" />
              <h5 className="text-xs font-bold text-haven-navy-900">About HAVEN Platform</h5>
            </div>
            <p className="text-xs text-haven-slate-500 leading-relaxed">
              Tagline: <em>&ldquo;A safer, smarter and more caring place for every resident.&rdquo;</em><br />
              HAVEN combines high-contrast clinical clarity with warm, non-hospital residential dignity.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                variant="subtle"
                size="sm"
                leftIcon={<Palette className="w-3.5 h-3.5 text-haven-blue-700" />}
                onClick={() => {
                  onOpenChange(false);
                  navigate('/design-system');
                }}
              >
                Inspect Design System Tokens
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="primary" size="sm">
              Close Help
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
