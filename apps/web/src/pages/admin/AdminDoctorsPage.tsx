import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Stethoscope,
  UserPlus,
  Search,
  CheckCircle2,
  Clock,
  Users,
  ChevronRight,
  Award,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import { MOCK_DOCTORS, type Doctor } from '../../mock/doctorsData.ts';
import { MOCK_FULL_RESIDENTS } from '../../mock/residentsData.ts';

export function AdminDoctorsPage() {
  useDocumentTitle('Visiting & Attending Physicians — Administrator');

  // Doctor list state
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS as unknown as Doctor[]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  // Modals & Drawers
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<Doctor | null>(null);
  const [selectedDoctorForAssign, setSelectedDoctorForAssign] = useState<Doctor | null>(null);
  const [residentToAssignId, setResidentToAssignId] = useState('');

  // Add doctor form state
  const [newName, setNewName] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('Geriatric Medicine');
  const [newKmc, setNewKmc] = useState('KMC-');
  const [newHospital, setNewHospital] = useState('Manipal Hospital, Bengaluru');
  const [newPhone, setNewPhone] = useState('+91 98450 ');
  const [newSchedule, setNewSchedule] = useState('Mon, Wed, Fri (09:00 - 13:00 IST)');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalDoctors = doctors.length;
  const onCallCount = doctors.filter((d) => d.availability === 'On-Call' || d.availability === 'Available').length;
  const totalConsultations = doctors.reduce((acc, d) => acc + d.assignedResidentsCount, 0);

  // Filtered doctors
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.kmcNumber.toLowerCase().includes(q) ||
        doc.hospitalAffiliation.toLowerCase().includes(q) ||
        doc.specialty.toLowerCase().includes(q);

      const matchesSpecialty = selectedSpecialty === 'all' || doc.specialty.includes(selectedSpecialty);
      const matchesAvailability = selectedAvailability === 'all' || doc.availability === selectedAvailability;

      return matchesSearch && matchesSpecialty && matchesAvailability;
    });
  }, [doctors, searchQuery, selectedSpecialty, selectedAvailability]);

  // Handle Add Doctor
  const handleAddDoctor = () => {
    if (!newName || !newKmc) return;
    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      name: newName,
      fullName: newName,
      preferredName: newName.split(' ')[0],
      title: 'Consulting Physician',
      type: 'Visiting Specialist',
      specialty: newSpecialty,
      kmcNumber: newKmc,
      registrationNumber: newKmc,
      registrationCouncil: 'Karnataka Medical Council (NMC Registered)',
      verificationStatus: 'verified',
      qualification: 'MBBS, MD',
      qualifications: 'MBBS, MD',
      hospitalAffiliation: newHospital,
      phone: newPhone,
      email: `${newName.toLowerCase().replace(/[^a-z]/g, '')}@manipalhospitals.com`,
      onCallSchedule: newSchedule,
      visitingSchedule: newSchedule,
      bio: 'Visiting consulting physician specializing in geriatric wellness.',
      activeAccessGrantsCount: 0,
      pendingAccessCount: 0,
      assignedResidentsCount: 0,
      assignedResidents: [],
      availability: 'Available',
    };

    setDoctors([newDoc, ...doctors]);
    showToast(`Doctor ${newName} registered with credentials ${newKmc}.`);
    setIsAddDoctorOpen(false);
    setNewName('');
    setNewKmc('KMC-');
  };

  // Handle Assign Resident
  const handleConfirmAssignResident = () => {
    if (!selectedDoctorForAssign || !residentToAssignId) return;
    const res = MOCK_FULL_RESIDENTS.find((r) => r.id === residentToAssignId);
    if (!res) return;

    setDoctors((prev) =>
      prev.map((d) =>
        d.id === selectedDoctorForAssign.id
          ? {
              ...d,
              assignedResidentsCount: d.assignedResidentsCount + 1,
              assignedResidents: [
                ...d.assignedResidents,
                {
                  residentId: res.id,
                  residentName: res.fullName,
                  room: `${res.placement.room}, ${res.placement.wing}`,
                  wing: res.placement.wing,
                  careLevel: res.careLevel,
                  assignmentType: 'Consulting Specialist',
                  assignedDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' }),
                  accessStatus: 'active',
                  primaryCondition: res.conditions[0]?.condition || 'Geriatric Care',
                },
              ],
            }
          : d
      )
    );

    showToast(`${res.fullName} assigned under the clinical care of ${selectedDoctorForAssign.name}.`);
    setSelectedDoctorForAssign(null);
    setResidentToAssignId('');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#173B70] px-4 py-3 text-sm font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-[#3979D8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <Stethoscope className="h-3.5 w-3.5 text-[#2457C5]" />
              Medical Directorate & Clinicians
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Attending & Visiting Physicians
          </h1>
          <p className="text-sm text-[#4A5568]">
            Karnataka Medical Council registration verification, specialist hospital affiliations, and resident panels.
          </p>
        </div>

        <Button variant="default" size="sm" onClick={() => setIsAddDoctorOpen(true)}>
          <UserPlus className="mr-1.5 h-3.5 w-3.5" />
          Register Doctor
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Medical Director</span>
              <Award className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-base font-bold text-[#173B70]">Dr. Anita Mehta</div>
            <div className="mt-0.5 text-xs text-[#718096]">MD (Geriatrics) • KMC-28491</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Empanelled Physicians</span>
              <Stethoscope className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalDoctors}</div>
            <div className="mt-0.5 text-xs text-[#718096]">5 Specialties Covered</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Available / On-Call</span>
              <Clock className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">{onCallCount}</div>
            <div className="mt-0.5 text-xs text-emerald-700">Ready for Teleconsult / Rounds</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Active Consultations</span>
              <Users className="h-4 w-4 text-[#3979D8]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalConsultations}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Residents Monitored</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
              <Input
                placeholder="Search physician, KMC number, hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Specialties</option>
              <option value="Geriatrics">Geriatric Medicine</option>
              <option value="Neurology">Neurology & Cognitive Health</option>
              <option value="Orthopaedics">Orthopaedics & Musculoskeletal</option>
              <option value="Endocrinology">Endocrinology & Diabetic Care</option>
              <option value="Psychiatry">Geriatric Psychiatry</option>
            </Select>

            <Select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Availabilities</option>
              <option value="Available">Available</option>
              <option value="On-Call">On-Call</option>
              <option value="In Consultation">In Consultation</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doc) => {
          const isAvailable = doc.availability === 'Available';
          const isOnCall = doc.availability === 'On-Call';

          return (
            <Card
              key={doc.id}
              className="border-[#E6ECF4] bg-white transition-all hover:shadow-md"
            >
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={doc.name} size="lg" />
                    <div>
                      <h3 className="font-bold text-[#173B70]">{doc.name}</h3>
                      <p className="text-xs font-medium text-[#2457C5]">{doc.qualification}</p>
                      <p className="text-[11px] text-[#4A5568]">{doc.specialty}</p>
                    </div>
                  </div>
                  <Badge
                    variant={isAvailable ? 'success' : isOnCall ? 'default' : 'warning'}
                    className="text-[10px]"
                  >
                    {doc.availability}
                  </Badge>
                </div>

                {/* Details Box */}
                <div className="mt-4 space-y-2 rounded-lg border border-[#E6ECF4] bg-[#F4F8FF] p-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#718096]">KMC Registration:</span>
                    <span className="font-semibold text-[#173B70]">{doc.kmcNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718096]">Affiliated Hospital:</span>
                    <span className="font-medium text-[#173B70] text-right truncate max-w-[180px]">
                      {doc.hospitalAffiliation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#718096]">Rounds Schedule:</span>
                    <span className="text-[#173B70] text-right">{doc.visitingSchedule}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E6ECF4] pt-1.5">
                    <span className="text-[#718096]">Assigned Patients:</span>
                    <span className="font-bold text-[#2457C5]">{doc.assignedResidentsCount} Residents</span>
                  </div>
                </div>

                {/* Contact info */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-[#718096]">
                  <span>{doc.phone}</span>
                  <span className="truncate max-w-[160px]">{doc.email}</span>
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex items-center justify-between border-t border-[#E6ECF4] pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs text-[#173B70]"
                    onClick={() => {
                      setSelectedDoctorForAssign(doc);
                    }}
                  >
                    Assign Resident
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-[#2457C5] hover:bg-[#E4EDFF]"
                    onClick={() => setSelectedDoctorForProfile(doc)}
                  >
                    View Caseload
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Register Doctor Modal */}
      <Dialog open={isAddDoctorOpen} onOpenChange={setIsAddDoctorOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Register Consulting Physician</DialogTitle>
            <DialogDescription>
              Add a licensed doctor with verified Karnataka Medical Council (KMC) accreditation.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Full Name (with Dr. prefix)</label>
              <Input
                placeholder="e.g. Dr. Raghavendra Rao"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Clinical Specialty</label>
                <Select
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="Geriatric Medicine">Geriatric Medicine</option>
                  <option value="Neurology & Cognitive Health">Neurology</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Orthopaedics">Orthopaedics</option>
                  <option value="Geriatric Psychiatry">Geriatric Psychiatry</option>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">KMC Reg Number</label>
                <Input
                  placeholder="KMC-XXXXX"
                  value={newKmc}
                  onChange={(e) => setNewKmc(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#173B70]">Hospital Affiliation</label>
              <Input
                value={newHospital}
                onChange={(e) => setNewHospital(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Phone (+91)</label>
                <Input
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Rounds Timing</label>
                <Input
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsAddDoctorOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={!newName || !newKmc}
              onClick={handleAddDoctor}
            >
              Verify & Register Physician
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Resident Modal */}
      <Dialog
        open={Boolean(selectedDoctorForAssign)}
        onOpenChange={(open) => !open && setSelectedDoctorForAssign(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Resident to {selectedDoctorForAssign?.name}</DialogTitle>
            <DialogDescription>
              Assign clinical oversight for a resident to this physician ({selectedDoctorForAssign?.specialty}).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Select Resident</label>
              <Select
                value={residentToAssignId}
                onChange={(e) => setResidentToAssignId(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="">Select resident requiring specialist consultation...</option>
                {MOCK_FULL_RESIDENTS.slice(0, 15).map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.fullName} ({r.placement.room}) — {r.careLevel}
                  </option>
                ))}
              </Select>
            </div>

            <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-2.5 text-xs text-[#4A5568]">
              <div className="font-semibold text-[#173B70]">Electronic Health Record Provisioning</div>
              <p className="mt-1">
                The physician will automatically receive chart access, prescription creation authorization, and notification alerts for this resident.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDoctorForAssign(null)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={!residentToAssignId}
              onClick={handleConfirmAssignResident}
            >
              Confirm Clinical Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Doctor Profile Drawer */}
      <Dialog
        open={Boolean(selectedDoctorForProfile)}
        onOpenChange={(open) => !open && setSelectedDoctorForProfile(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar name={selectedDoctorForProfile?.name || 'Dr'} size="lg" />
              <div>
                <DialogTitle>{selectedDoctorForProfile?.name}</DialogTitle>
                <DialogDescription>
                  {selectedDoctorForProfile?.specialty} • {selectedDoctorForProfile?.kmcNumber}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedDoctorForProfile && (
            <div className="space-y-4 py-2 text-xs">
              <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF] p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#718096]">Karnataka Medical Council:</span>
                  <span className="font-semibold text-[#173B70]">
                    {selectedDoctorForProfile.kmcNumber} (Verified)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Affiliated Institute:</span>
                  <span className="font-semibold text-[#173B70]">
                    {selectedDoctorForProfile.hospitalAffiliation}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Availability Status:</span>
                  <Badge variant="success">{selectedDoctorForProfile.availability}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Facility Rounds:</span>
                  <span className="text-[#173B70]">{selectedDoctorForProfile.visitingSchedule}</span>
                </div>
              </div>

              {/* Assigned Residents */}
              <div>
                <h4 className="font-semibold text-[#173B70] mb-2 flex items-center justify-between">
                  <span>Assigned Resident Panel ({selectedDoctorForProfile.assignedResidentsCount})</span>
                  <span className="text-[11px] text-[#718096]">Active Care Plans</span>
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {selectedDoctorForProfile.assignedResidents.map((res, idx) => (
                    <div
                      key={res.residentId || idx}
                      className="flex items-center justify-between rounded-md border border-[#E6ECF4] bg-white p-2.5"
                    >
                      <div>
                        <Link
                          to={`/admin/residents/${res.residentId}`}
                          className="font-semibold text-[#173B70] hover:text-[#2457C5] hover:underline"
                        >
                          {res.residentName}
                        </Link>
                        <div className="text-[11px] text-[#718096]">
                          {res.room} • {res.primaryCondition || res.careLevel}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {res.careLevel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDoctorForProfile(null)}
            >
              Close
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                showToast(`Clinical privileges re-verified for ${selectedDoctorForProfile?.name}.`);
                setSelectedDoctorForProfile(null);
              }}
            >
              Verify Clinical Privileges
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
