import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  HeartHandshake,
  UserPlus,
  Search,
  CheckCircle2,
  Calendar,
  Users,
  LayoutGrid,
  List,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog.tsx';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/Table.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import { MOCK_CAREGIVERS, type Caregiver } from '../../mock/caregiversData.ts';

export function AdminCaregiversPage() {
  useDocumentTitle('Caregiver Staff Directory — Administrator');

  // Caregiver list state
  const [caregivers, setCaregivers] = useState<Caregiver[]>(MOCK_CAREGIVERS as unknown as Caregiver[]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWing, setSelectedWing] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCaregiverForProfile, setSelectedCaregiverForProfile] = useState<Caregiver | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // New caregiver form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Registered Nurse (RN)');
  const [newKnc, setNewKnc] = useState('KNC-');
  const [newPhone, setNewPhone] = useState('+91 98450 ');
  const [newEmail, setNewEmail] = useState('');
  const [newWing, setNewWing] = useState('Jasmine Wing');
  const [newShift, setNewShift] = useState('Morning (07:00 - 15:30)');

  // Metrics
  const totalStaff = caregivers.length;
  const onDutyCount = caregivers.filter((c) => c.status === 'On Duty').length;
  const onLeaveCount = caregivers.filter((c) => c.status === 'On Leave').length;
  const offDutyCount = caregivers.filter((c) => c.status === 'Off Duty').length;

  // Filtered Caregivers
  const filteredCaregivers = useMemo(() => {
    return caregivers.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.employeeId.toLowerCase().includes(q) ||
        c.kncRegistrationNumber.toLowerCase().includes(q) ||
        c.assignedWing.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q);

      const matchesWing = selectedWing === 'all' || c.assignedWing === selectedWing;
      const matchesRole = selectedRole === 'all' || c.role.includes(selectedRole);
      const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;

      return matchesSearch && matchesWing && matchesRole && matchesStatus;
    });
  }, [caregivers, searchQuery, selectedWing, selectedRole, selectedStatus]);

  // Handle Add Caregiver
  const handleAddCaregiver = () => {
    if (!newName || !newKnc) return;
    const newStaff: Caregiver = {
      id: `cg-${Date.now()}`,
      employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      fullName: newName,
      preferredName: newName.split(' ')[0],
      role: newRole,
      credentials: newRole,
      registrationNumber: newKnc,
      registrationStatus: 'verified',
      department: 'Nursing & Caregiving',
      assignedWing: newWing,
      phone: newPhone,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@havenanandam.in`,
      kncRegistrationNumber: newKnc,
      experienceYears: 4,
      availability: 'on_duty',
      status: 'On Duty',
      currentShift: newShift,
      shiftTiming: '07:00 - 15:30 IST',
      joinDate: '2024-01-15',
      assignedResidentIds: ['res-001', 'res-002'],
      assignedResidentsCount: 7,
      assignedResidents: [
        { id: 'res-001', name: 'Ananya Sharma', room: 'Room 101', careLevel: 'Memory Care' },
        { id: 'res-002', name: 'Raghav Kulkarni', room: 'Room 102', careLevel: 'High Dependency' },
      ],
      skills: ['Vital Signs Monitoring', 'Subcutaneous Injections', 'Dementia Care'],
      certifications: ['BLS Certified'],
      leaveBalanceDays: 14,
      recentShifts: [],
      notes: 'Active nurse',
    };

    setCaregivers([newStaff, ...caregivers]);
    showToast(`Caregiver ${newName} added successfully with employee ID ${newStaff.employeeId}.`);
    setIsAddModalOpen(false);
    setNewName('');
    setNewKnc('KNC-');
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
              <HeartHandshake className="h-3.5 w-3.5 text-[#2457C5]" />
              Nursing & Clinical Support
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Caregiver Staff Management
          </h1>
          <p className="text-sm text-[#4A5568]">
            Roster assignments, Karnataka Nursing Council credentials, wing allocation, and resident caseloads.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex rounded-md border border-[#E6ECF4] bg-white p-0.5 shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#E4EDFF] text-[#173B70] font-semibold'
                  : 'text-[#4A5568] hover:text-[#173B70]'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Staff Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#E4EDFF] text-[#173B70] font-semibold'
                  : 'text-[#4A5568] hover:text-[#173B70]'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              Roster Table
            </button>
          </div>

          <Button variant="default" size="sm" onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="mr-1.5 h-3.5 w-3.5" />
            Add Caregiver
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Total Caregivers</span>
              <Users className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalStaff}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Registered Nursing Staff</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Active On Duty</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">{onDutyCount}</div>
            <div className="mt-0.5 text-xs text-emerald-700">Currently Stationed</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>On Approved Leave</span>
              <Calendar className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">{onLeaveCount}</div>
            <div className="mt-0.5 text-xs text-amber-700">Cover Planned</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Caregiver-to-Resident Ratio</span>
              <ShieldCheck className="h-4 w-4 text-[#3979D8]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">1 : 7.2</div>
            <div className="mt-0.5 text-xs text-emerald-700">Meets NABH Standard</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
              <Input
                placeholder="Search by name, KNC ID, wing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <Select
              value={selectedWing}
              onChange={(e) => setSelectedWing(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Care Wings</option>
              <option value="Magnolia Wing">Magnolia Wing</option>
              <option value="Jasmine Wing">Jasmine Wing</option>
              <option value="Lotus Wing">Lotus Wing</option>
              <option value="Orchid Wing">Orchid Wing</option>
            </Select>

            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Designations</option>
              <option value="RN">RN (Registered Nurse)</option>
              <option value="LPN">LPN (Licensed Practical)</option>
              <option value="NP">NP (Nurse Practitioner)</option>
              <option value="CNA">CNA (Certified Nursing Asst)</option>
              <option value="DPT">DPT (Physical Therapist)</option>
            </Select>

            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Duty Statuses</option>
              <option value="On Duty">On Duty ({onDutyCount})</option>
              <option value="Off Duty">Off Duty ({offDutyCount})</option>
              <option value="On Leave">On Leave ({onLeaveCount})</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Staff View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCaregivers.map((staff) => {
            const isOnDuty = staff.status === 'On Duty';
            const isOnLeave = staff.status === 'On Leave';

            return (
              <Card
                key={staff.id}
                className="border-[#E6ECF4] bg-white transition-all hover:shadow-md"
              >
                <CardContent className="p-4">
                  {/* Top Bar with Avatar & Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={staff.name} size="md" />
                      <div>
                        <h3 className="font-semibold text-[#173B70]">{staff.name}</h3>
                        <p className="text-xs font-medium text-[#2457C5]">{staff.role}</p>
                      </div>
                    </div>
                    <Badge
                      variant={isOnDuty ? 'success' : isOnLeave ? 'warning' : 'secondary'}
                      className="text-[11px]"
                    >
                      {staff.status}
                    </Badge>
                  </div>

                  {/* KNC & Wing */}
                  <div className="mt-3 space-y-1.5 rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-2.5 text-xs text-[#4A5568]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#718096]">KNC Reg:</span>
                      <span className="font-semibold text-[#173B70]">{staff.kncRegistrationNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#718096]">Assigned Wing:</span>
                      <span className="font-medium text-[#173B70]">{staff.assignedWing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#718096]">Current Shift:</span>
                      <span className="text-[#173B70]">{staff.currentShift.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#718096]">Caseload:</span>
                      <span className="font-bold text-[#2457C5]">{staff.assignedResidentsCount} Residents</span>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {staff.skills.slice(0, 2).map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="rounded bg-[#E4EDFF] px-2 py-0.5 text-[10px] font-medium text-[#173B70]"
                      >
                        {skill}
                      </span>
                    ))}
                    {staff.skills.length > 2 && (
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-[#718096]">
                        +{staff.skills.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-between border-t border-[#E6ECF4] pt-2.5">
                    <span className="text-xs text-[#718096]">{staff.employeeId}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-[#2457C5] hover:bg-[#E4EDFF]"
                      onClick={() => setSelectedCaregiverForProfile(staff)}
                    >
                      View Profile
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role & Registration</TableHead>
                <TableHead>Wing & Shift</TableHead>
                <TableHead>Caseload</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCaregivers.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={staff.name} size="sm" />
                      <div>
                        <div className="font-semibold text-[#173B70]">{staff.name}</div>
                        <div className="text-xs text-[#718096]">{staff.employeeId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-medium text-[#173B70]">{staff.role}</div>
                    <div className="text-[11px] text-[#2457C5]">{staff.kncRegistrationNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-[#173B70]">{staff.assignedWing}</div>
                    <div className="text-[11px] text-[#718096]">{staff.currentShift}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-semibold">
                      {staff.assignedResidentsCount} residents
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        staff.status === 'On Duty'
                          ? 'success'
                          : staff.status === 'On Leave'
                          ? 'warning'
                          : 'secondary'
                      }
                    >
                      {staff.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-[#4A5568]">
                    <div>{staff.phone}</div>
                    <div className="text-[11px] text-[#718096]">{staff.email}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setSelectedCaregiverForProfile(staff)}
                    >
                      Profile & Caseload
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Add Caregiver Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Nursing / Caregiving Staff</DialogTitle>
            <DialogDescription>
              Register a new caregiver with verified Karnataka Nursing Council credentials.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Full Name (with honorific)</label>
              <Input
                placeholder="e.g. Divya Gowda RN"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Designation</label>
                <Select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="Registered Nurse (RN)">Registered Nurse (RN)</option>
                  <option value="Licensed Practical Nurse (LPN)">LPN</option>
                  <option value="Nurse Practitioner (NP)">Nurse Practitioner (NP)</option>
                  <option value="Certified Nursing Assistant (CNA)">CNA</option>
                  <option value="Physical Therapist (DPT)">Physical Therapist</option>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">KNC Registration</label>
                <Input
                  placeholder="KNC-XXXXX"
                  value={newKnc}
                  onChange={(e) => setNewKnc(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Mobile (+91)</label>
                <Input
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Email Address</label>
                <Input
                  placeholder="name@havenanandam.in"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#173B70]">Assigned Wing</label>
                <Select
                  value={newWing}
                  onChange={(e) => setNewWing(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="Magnolia Wing">Magnolia Wing</option>
                  <option value="Jasmine Wing">Jasmine Wing</option>
                  <option value="Lotus Wing">Lotus Wing</option>
                  <option value="Orchid Wing">Orchid Wing</option>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#173B70]">Default Shift</label>
                <Select
                  value={newShift}
                  onChange={(e) => setNewShift(e.target.value)}
                  className="mt-1 text-xs"
                >
                  <option value="Morning (07:00 - 15:30)">Morning (07:00 - 15:30)</option>
                  <option value="Afternoon (15:00 - 23:30)">Afternoon (15:00 - 23:30)</option>
                  <option value="Night (23:00 - 07:30)">Night (23:00 - 07:30)</option>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={!newName || !newKnc}
              onClick={handleAddCaregiver}
            >
              Add Staff Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Caregiver Profile Drawer / Dialog */}
      <Dialog
        open={Boolean(selectedCaregiverForProfile)}
        onOpenChange={(open) => !open && setSelectedCaregiverForProfile(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar name={selectedCaregiverForProfile?.name || 'Staff'} size="lg" />
              <div>
                <DialogTitle>{selectedCaregiverForProfile?.name}</DialogTitle>
                <DialogDescription>
                  {selectedCaregiverForProfile?.role} • {selectedCaregiverForProfile?.employeeId}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedCaregiverForProfile && (
            <div className="space-y-4 py-2 text-xs">
              {/* Credentials & Wing Card */}
              <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF] p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#718096]">Karnataka Nursing Council Registration:</span>
                  <span className="font-semibold text-[#173B70]">
                    {selectedCaregiverForProfile.kncRegistrationNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Assigned Wing:</span>
                  <span className="font-semibold text-[#173B70]">
                    {selectedCaregiverForProfile.assignedWing}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Current Shift:</span>
                  <span className="text-[#173B70]">
                    {selectedCaregiverForProfile.currentShift} ({selectedCaregiverForProfile.shiftTiming})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#718096]">Annual Leave Balance:</span>
                  <span className="font-semibold text-emerald-700">
                    {selectedCaregiverForProfile.leaveBalanceDays} days remaining
                  </span>
                </div>
              </div>

              {/* Assigned Residents Roster */}
              <div>
                <h4 className="font-semibold text-[#173B70] mb-2 flex items-center justify-between">
                  <span>Assigned Resident Caseload ({selectedCaregiverForProfile.assignedResidentsCount})</span>
                  <span className="text-[11px] text-[#718096]">Active Care Plan</span>
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {selectedCaregiverForProfile.assignedResidents?.map((res: { id: string; name: string; room: string; careLevel: string }) => (
                    <div
                      key={res.id}
                      className="flex items-center justify-between rounded-md border border-[#E6ECF4] bg-white p-2"
                    >
                      <div>
                        <Link
                          to={`/admin/residents/${res.id}`}
                          className="font-semibold text-[#173B70] hover:text-[#2457C5] hover:underline"
                        >
                          {res.name}
                        </Link>
                        <div className="text-[11px] text-[#718096]">
                          {res.room} • {res.careLevel}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        Primary Nurse
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competencies */}
              <div>
                <h4 className="font-semibold text-[#173B70] mb-1.5">Verified Clinical Competencies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCaregiverForProfile.skills.map((s: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded bg-[#E4EDFF] px-2.5 py-1 text-xs font-medium text-[#173B70]"
                    >
                      <CheckCircle2 className="h-3 w-3 text-[#2457C5]" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCaregiverForProfile(null)}
            >
              Close
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                showToast(`Shift and resident assignment updated for ${selectedCaregiverForProfile?.name}.`);
                setSelectedCaregiverForProfile(null);
              }}
            >
              Update Caseload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
