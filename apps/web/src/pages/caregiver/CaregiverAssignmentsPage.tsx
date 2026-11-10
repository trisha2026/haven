import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  QrCode,
  ShieldAlert,
  Camera,
  UserCheck,
  Pill,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import {
  ACTIVE_TEMPORARY_ASSIGNMENTS,
  isResidentAuthorizedForCaregiver,
  ACTIVE_CAREGIVER,
  type TemporaryAssignmentRecord,
} from '../../mock/caregiverWorkspaceData.ts';
import { MOCK_FULL_RESIDENTS } from '../../mock/residentsData.ts';
import type { FullResident } from '../../types/resident.ts';

export function CaregiverAssignmentsPage() {
  useDocumentTitle('QR Scan & Temporary Assignments — Caregiver');
  const navigate = useNavigate();

  // QR Scanning Simulation State
  const [scanQuery, setScanQuery] = useState('');
  const [scannedResident, setScannedResident] = useState<FullResident | null>(null);
  const [scanAuthResult, setScanAuthResult] = useState<{
    authorized: boolean;
    reason: string;
    assignmentType?: 'permanent' | 'temporary';
  } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Temporary assignments state
  const [assignments] = useState<TemporaryAssignmentRecord[]>(
    ACTIVE_TEMPORARY_ASSIGNMENTS
  );

  // Quick Test Bar IDs
  const sampleResidents = [
    { id: 'RES-041', name: 'Ananya Sharma (Primary)', expected: 'authorized' },
    { id: 'RES-044', name: 'Raghavendra Kulkarni (EMG Standby)', expected: 'authorized' },
    { id: 'RES-015', name: 'Vikram Hegde (Unauthorized Wing)', expected: 'denied' },
    { id: 'RES-001', name: 'Meera Krishnan (Primary)', expected: 'authorized' },
  ];

  const handleResolveResident = (idToLookup: string) => {
    setIsScanning(true);
    setScannedResident(null);
    setScanAuthResult(null);

    setTimeout(() => {
      const trimmed = idToLookup.trim().toUpperCase();
      const found = MOCK_FULL_RESIDENTS.find(
        (r) => r.id.toUpperCase() === trimmed || r.fullName.toLowerCase().includes(idToLookup.toLowerCase().trim())
      );

      if (found) {
        setScannedResident(found);
        const auth = isResidentAuthorizedForCaregiver(found.id);
        setScanAuthResult(auth);
      } else {
        setScannedResident(null);
        setScanAuthResult({
          authorized: false,
          reason: `No resident record found with ID "${idToLookup}". Please verify QR wristband barcode.`,
        });
      }
      setIsScanning(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <QrCode className="h-3.5 w-3.5 text-[#2457C5]" />
              Bedside Verification & Cross-Coverage
            </span>
            <span className="text-xs text-[#64748B]">
              Caregiver: {ACTIVE_CAREGIVER.fullName}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            QR Resident Verification & Temporary Assignments
          </h1>
          <p className="text-sm text-[#4A5568]">
            Scan resident wristband QR codes to verify identity, check caseload authorization, and inspect active emergency assignments.
          </p>
        </div>
      </div>

      {/* SECTION 1: QR IDENTIFICATION WORKSPACE */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Scanner Simulation Card */}
        <Card className="lg:col-span-6 border-[#E6ECF4] bg-white shadow-xs p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#173B70] flex items-center gap-2">
                <Camera className="h-4 w-4 text-[#2457C5]" />
                Bedside QR Scanner Interface
              </h2>
              <Badge variant="outline" className="text-xs">
                Camera Optical Simulation
              </Badge>
            </div>

            {/* Simulated Camera Viewfinder */}
            <div className="relative rounded-2xl border-2 border-dashed border-[#2457C5]/40 bg-slate-900/95 p-8 text-center text-white overflow-hidden min-h-[220px] flex flex-col items-center justify-center">
              {/* Corner targeting brackets */}
              <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-[#3979D8]" />
              <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-[#3979D8]" />
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[#3979D8]" />
              <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#3979D8]" />

              {/* Scanning animation line */}
              <div className="absolute inset-x-8 top-1/2 h-0.5 bg-[#3979D8] opacity-80 animate-pulse shadow-[0_0_8px_#3979D8]" />

              <QrCode className="h-14 w-14 text-white/40 mb-2" />
              <p className="text-xs font-medium text-white/90">
                Align resident wristband or bedframe QR code within the frame
              </p>
              <p className="text-[11px] text-white/60 mt-1">
                Camera access simulated for secure desktop environment
              </p>
            </div>

            {/* Quick Test Bar */}
            <div>
              <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                Simulated QR Barcode Presets:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {sampleResidents.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setScanQuery(sample.id);
                      handleResolveResident(sample.id);
                    }}
                    className="p-2 rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/80 hover:bg-[#E4EDFF] hover:border-[#2457C5] transition-all text-left"
                  >
                    <div className="font-bold text-[#173B70]">{sample.id}</div>
                    <div className="text-[11px] text-[#4A5568] truncate">{sample.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Resident ID Fallback Input */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-[#173B70]">
                Manual Resident ID Fallback Entry:
              </label>
              <div className="flex gap-2 mt-1">
                <Input
                  placeholder="Enter Resident ID (e.g. RES-041 or RES-044)..."
                  value={scanQuery}
                  onChange={(e) => setScanQuery(e.target.value)}
                  className="text-xs"
                />
                <Button
                  variant="default"
                  size="sm"
                  disabled={isScanning || !scanQuery.trim()}
                  onClick={() => handleResolveResident(scanQuery)}
                  className="bg-[#173B70] text-white hover:bg-[#2457C5]"
                >
                  Resolve
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Scan Result Resolution Card */}
        <Card className="lg:col-span-6 border-[#E6ECF4] bg-white shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E6ECF4] pb-4">
              <h2 className="text-base font-bold text-[#173B70]">
                Authorization & Identity Output
              </h2>
              {scanAuthResult && (
                <Badge
                  variant={scanAuthResult.authorized ? 'success' : 'danger'}
                  className="text-xs font-bold uppercase"
                >
                  {scanAuthResult.authorized ? 'Access Authorized' : 'Access Restricted'}
                </Badge>
              )}
            </div>

            {isScanning ? (
              <div className="py-12 text-center text-xs text-[#64748B] space-y-2">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#2457C5] border-t-transparent" />
                <p>Decoding barcode and validating caseload authorization...</p>
              </div>
            ) : scannedResident && scanAuthResult ? (
              <div className="mt-4 space-y-4">
                {/* Authorized Result Card */}
                {scanAuthResult.authorized ? (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                      <div className="flex items-start gap-3">
                        <Avatar
                          name={scannedResident.fullName}
                          size="lg"
                          className="bg-white border border-emerald-300 text-emerald-900 font-bold"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-emerald-950">
                              {scannedResident.fullName}
                            </h3>
                            <Badge variant="outline" className="text-[10px] bg-white text-emerald-800">
                              {scannedResident.id}
                            </Badge>
                          </div>
                          <p className="text-xs text-emerald-800">
                            Age {scannedResident.age} ({scannedResident.gender}) · Room {scannedResident.placement.room} ({scannedResident.placement.wing})
                          </p>
                          <div className="text-[11px] font-semibold text-emerald-900 pt-0.5">
                            {scanAuthResult.reason}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-[#E6ECF4] p-3 text-xs space-y-1.5 text-[#334155]">
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Care Level:</span>
                        <span className="font-semibold text-[#2457C5]">{scannedResident.careLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Attending Physician:</span>
                        <span>{scannedResident.careTeam.primaryDoctor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748B]">Fall Risk Rating:</span>
                        <span className="font-bold text-rose-700">{scannedResident.carePlan?.fallRiskLevel || 'Medium'}</span>
                      </div>
                    </div>

                    {/* Quick Direct Actions for Verified Resident */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="text-xs bg-[#173B70] text-white hover:bg-[#2457C5]"
                        onClick={() => navigate(`/caregiver/residents/${scannedResident.id}`)}
                      >
                        <UserCheck className="mr-1.5 h-3.5 w-3.5" />
                        Open Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-[#2457C5] text-[#2457C5] hover:bg-[#F4F8FF]"
                        onClick={() => navigate('/caregiver/medications')}
                      >
                        <Pill className="mr-1.5 h-3.5 w-3.5" />
                        Administer Meds
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Access Denied Result Card */
                  <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-rose-100 p-2 text-rose-700">
                        <ShieldAlert className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-rose-950">
                          Caseload Access Restriction
                        </h4>
                        <div className="text-xs font-semibold text-rose-900 mt-1">
                          {scannedResident.fullName} ({scannedResident.id})
                        </div>
                        <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                          {scanAuthResult.reason}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md border border-rose-200 bg-white p-3 text-xs text-rose-900">
                      <span className="font-semibold">Security Rule:</span> Scanning a barcode verifies physical resident identity, but does NOT grant medical chart access unless the resident is permanently assigned to your caseload or covered under a valid emergency assignment.
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-16 text-center text-xs text-[#64748B] space-y-2">
                <QrCode className="mx-auto h-10 w-10 text-[#64748B]/40" />
                <p>No barcode scanned yet. Select a simulated QR preset or enter an ID to verify.</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* SECTION 2: TEMPORARY CROSS-COVERAGE ASSIGNMENTS */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E6ECF4] px-5 py-4 gap-2">
          <div>
            <CardTitle className="text-base font-bold text-[#173B70]">
              Authorized Temporary Emergency Assignments
            </CardTitle>
            <p className="text-xs text-[#64748B] mt-0.5">
              Time-bounded cross-coverage orders authorized by Facility Administration under emergency clinical protocols
            </p>
          </div>
          <Badge variant="default" className="text-xs">
            Admin Authorized Only
          </Badge>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="border-b border-[#E6ECF4] bg-[#F4F8FF] text-[#173B70] font-semibold">
              <tr>
                <th className="p-3.5">Assignment ID</th>
                <th className="p-3.5">Scope & Target</th>
                <th className="p-3.5">Authorized Window</th>
                <th className="p-3.5">Authorizing Admin</th>
                <th className="p-3.5">Clinical Protocol Reason</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECF4]">
              {assignments.map((asg) => (
                <tr key={asg.id} className="hover:bg-[#F4F8FF]/30 transition-colors">
                  <td className="p-3.5 font-bold text-[#173B70]">
                    {asg.id}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-[#173B70]">
                      {asg.targetResidentName ? `${asg.targetResidentName} (${asg.targetRoom})` : asg.targetWing}
                    </div>
                    <div className="text-[11px] text-[#2457C5]">{asg.scope}</div>
                  </td>
                  <td className="p-3.5 text-[#334155]">
                    <div className="font-semibold text-[#173B70]">{asg.startTime}</div>
                    <div className="text-[11px] text-[#64748B]">Until {asg.expiryTime}</div>
                  </td>
                  <td className="p-3.5 text-[#4A5568]">
                    {asg.authorizedBy}
                  </td>
                  <td className="p-3.5 max-w-xs text-[#4A5568]">
                    {asg.reason}
                  </td>
                  <td className="p-3.5">
                    <Badge
                      variant={asg.status === 'active' ? 'success' : 'secondary'}
                      className="capitalize text-[10px]"
                    >
                      {asg.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    {asg.targetResidentId && asg.status === 'active' ? (
                      <Button
                        variant="default"
                        size="sm"
                        className="h-7 text-xs bg-[#173B70] text-white hover:bg-[#2457C5]"
                        onClick={() => navigate(`/caregiver/residents/${asg.targetResidentId}`)}
                      >
                        Open Record
                      </Button>
                    ) : (
                      <span className="text-xs text-[#64748B]">Closed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
