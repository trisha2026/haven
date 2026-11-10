import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  BedDouble,
  Building2,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Search,
  ArrowRightLeft,
  UserPlus,
  RefreshCw,
  LayoutGrid,
  List,
  Sparkles,
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
import { MOCK_ROOMS_BEDS, type RoomBed } from '../../mock/roomsBedsData.ts';
import { MOCK_FULL_RESIDENTS } from '../../mock/residentsData.ts';

export function AdminRoomsBedsPage() {
  useDocumentTitle('Rooms & Beds Management — Administrator');

  // Rooms dataset state
  const [rooms, setRooms] = useState<RoomBed[]>(MOCK_ROOMS_BEDS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWing, setSelectedWing] = useState('all');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);
  const [selectedRoomForAction, setSelectedRoomForAction] = useState<RoomBed | null>(null);

  // Form states for modals
  const [allocateResidentId, setAllocateResidentId] = useState('');
  const [transferTargetRoomId, setTransferTargetRoomId] = useState('');
  const [transferReason, setTransferReason] = useState('Clinical recommendation for higher nursing supervision');
  const [maintenanceNotes, setMaintenanceNotes] = useState('Scheduled deep sanitization and motorized bed check.');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const totalBeds = rooms.length;
  const occupiedBeds = rooms.filter((r) => r.status === 'occupied').length;
  const availableBeds = rooms.filter((r) => r.status === 'available').length;
  const maintenanceBeds = rooms.filter((r) => r.status === 'maintenance').length;
  const occupancyRate = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  // Filtered rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        room.roomNumber.toLowerCase().includes(q) ||
        room.wing.toLowerCase().includes(q) ||
        (room.residentName && room.residentName.toLowerCase().includes(q)) ||
        room.bedNumber.toLowerCase().includes(q);

      const matchesWing = selectedWing === 'all' || room.wing === selectedWing;
      const matchesFloor = selectedFloor === 'all' || room.floor.toString() === selectedFloor;
      const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;
      const matchesType = selectedType === 'all' || room.roomType === selectedType;

      return matchesSearch && matchesWing && matchesFloor && matchesStatus && matchesType;
    });
  }, [rooms, searchQuery, selectedWing, selectedFloor, selectedStatus, selectedType]);

  // Handle Allocate
  const handleConfirmAllocate = () => {
    if (!selectedRoomForAction || !allocateResidentId) return;
    const resident = MOCK_FULL_RESIDENTS.find((r) => r.id === allocateResidentId);
    if (!resident) return;

    setRooms((prev) =>
      prev.map((r) =>
        r.id === selectedRoomForAction.id
          ? {
              ...r,
              status: 'occupied',
              residentId: resident.id,
              residentName: resident.fullName,
              residentAge: resident.age,
              residentGender: resident.gender,
              careClassification: resident.careLevel,
              primaryCaregiver: resident.careTeam?.primaryNurse?.name,
              attendingDoctor: resident.careTeam?.primaryDoctor?.name,
              admissionDate: new Date().toISOString().split('T')[0],
            }
          : r
      )
    );
    showToast(`Resident ${resident.fullName} allocated to ${selectedRoomForAction.roomNumber} (${selectedRoomForAction.bedNumber}).`);
    setIsAllocateOpen(false);
    setSelectedRoomForAction(null);
    setAllocateResidentId('');
  };

  // Handle Transfer
  const handleConfirmTransfer = () => {
    if (!selectedRoomForAction || !transferTargetRoomId) return;
    const targetRoom = rooms.find((r) => r.id === transferTargetRoomId);
    if (!targetRoom || targetRoom.status !== 'available') return;

    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === selectedRoomForAction.id) {
          return {
            ...r,
            status: 'available',
            residentId: undefined,
            residentName: undefined,
            residentAge: undefined,
            residentGender: undefined,
            careClassification: undefined,
            primaryCaregiver: undefined,
            attendingDoctor: undefined,
            admissionDate: undefined,
          };
        }
        if (r.id === targetRoom.id) {
          return {
            ...r,
            status: 'occupied',
            residentId: selectedRoomForAction.residentId,
            residentName: selectedRoomForAction.residentName,
            residentAge: selectedRoomForAction.residentAge,
            residentGender: selectedRoomForAction.residentGender,
            careClassification: selectedRoomForAction.careClassification,
            primaryCaregiver: selectedRoomForAction.primaryCaregiver,
            attendingDoctor: selectedRoomForAction.attendingDoctor,
            admissionDate: selectedRoomForAction.admissionDate,
          };
        }
        return r;
      })
    );
    showToast(
      `Resident ${selectedRoomForAction.residentName} transferred to ${targetRoom.roomNumber} (${targetRoom.bedNumber}).`
    );
    setIsTransferOpen(false);
    setSelectedRoomForAction(null);
    setTransferTargetRoomId('');
  };

  // Handle Toggle Maintenance
  const handleConfirmMaintenance = () => {
    if (!selectedRoomForAction) return;
    const willBeMaintenance = selectedRoomForAction.status !== 'maintenance';

    setRooms((prev) =>
      prev.map((r) =>
        r.id === selectedRoomForAction.id
          ? {
              ...r,
              status: willBeMaintenance ? 'maintenance' : 'available',
              residentId: undefined,
              residentName: undefined,
            }
          : r
      )
    );
    showToast(
      `${selectedRoomForAction.roomNumber} marked as ${willBeMaintenance ? 'Under Maintenance' : 'Available for Occupancy'}.`
    );
    setIsMaintenanceOpen(false);
    setSelectedRoomForAction(null);
  };

  // Handle Discharge/Vacate
  const handleVacateRoom = (room: RoomBed) => {
    if (window.confirm(`Confirm discharge and vacate room ${room.roomNumber} for ${room.residentName}?`)) {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === room.id
            ? {
                ...r,
                status: 'available',
                residentId: undefined,
                residentName: undefined,
                residentAge: undefined,
                residentGender: undefined,
                careClassification: undefined,
                primaryCaregiver: undefined,
                attendingDoctor: undefined,
                admissionDate: undefined,
              }
            : r
        )
      );
      showToast(`Room ${room.roomNumber} vacated and flagged for housekeeping sanitization.`);
    }
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

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <Building2 className="h-3.5 w-3.5 text-[#2457C5]" />
              HAVEN Anandam Care Residence
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Rooms & Bed Capacity Management
          </h1>
          <p className="text-sm text-[#4A5568]">
            Real-time census, wing allocation, room sanitation status and resident room transfer control.
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
              Visual Grid
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
              Table View
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              showToast('Room statuses synchronized with nurse call system.');
            }}
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Sync Status
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Total Beds</span>
              <BedDouble className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">{totalBeds}</div>
            <div className="mt-0.5 text-xs text-[#718096]">Across 4 Care Wings</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Occupied</span>
              <CheckCircle2 className="h-4 w-4 text-[#2457C5]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#2457C5]">{occupiedBeds}</div>
            <div className="mt-0.5 text-xs text-[#718096]">{occupancyRate}% Occupancy Rate</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Available</span>
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-700">{availableBeds}</div>
            <div className="mt-0.5 text-xs text-emerald-700">Ready for Admission</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Maintenance</span>
              <Wrench className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-amber-700">{maintenanceBeds}</div>
            <div className="mt-0.5 text-xs text-amber-700">Deep Cleaning / Repairs</div>
          </CardContent>
        </Card>

        <Card className="border-[#E6ECF4] bg-white shadow-xs col-span-2 sm:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A5568]">
              <span>Care Wings</span>
              <Building2 className="h-4 w-4 text-[#3979D8]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-[#173B70]">4 Floors</div>
            <div className="mt-0.5 text-xs text-[#718096]">16 Rooms per Floor</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#718096]" />
              <Input
                placeholder="Search room, resident, wing..."
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
              <option value="all">All Wings (All 4)</option>
              <option value="Magnolia Wing">Magnolia (Memory Care)</option>
              <option value="Jasmine Wing">Jasmine (Skilled Nursing)</option>
              <option value="Lotus Wing">Lotus (Assisted Living)</option>
              <option value="Orchid Wing">Orchid (Independent/Respite)</option>
            </Select>

            <Select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Floors</option>
              <option value="1">Floor 1 (Ground)</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
              <option value="4">Floor 4</option>
            </Select>

            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Statuses</option>
              <option value="occupied">Occupied ({occupiedBeds})</option>
              <option value="available">Available ({availableBeds})</option>
              <option value="maintenance">Maintenance ({maintenanceBeds})</option>
            </Select>

            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs"
            >
              <option value="all">All Room Types</option>
              <option value="Single Deluxe">Single Deluxe</option>
              <option value="Standard Twin">Standard Twin</option>
              <option value="Memory Care Suite">Memory Care Suite</option>
              <option value="Executive Suite">Executive Suite</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredRooms.map((room) => {
            const isOccupied = room.status === 'occupied';
            const isAvailable = room.status === 'available';
            const isMaintenance = room.status === 'maintenance';

            return (
              <Card
                key={room.id}
                className={`relative overflow-hidden border transition-all hover:shadow-md ${
                  isOccupied
                    ? 'border-[#E6ECF4] bg-white'
                    : isAvailable
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-amber-200 bg-amber-50/20'
                }`}
              >
                {/* Status Indicator Bar */}
                <div
                  className={`h-1.5 w-full ${
                    isOccupied ? 'bg-[#2457C5]' : isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />

                <CardContent className="p-4">
                  {/* Room Number & Status Badge */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-[#173B70]">{room.roomNumber}</span>
                        <span className="text-xs font-medium text-[#718096]">({room.bedNumber})</span>
                      </div>
                      <div className="text-xs text-[#4A5568]">
                        {room.wing} • Floor {room.floor}
                      </div>
                    </div>

                    <Badge
                      variant={isOccupied ? 'default' : isAvailable ? 'success' : 'warning'}
                      className="capitalize"
                    >
                      {room.status}
                    </Badge>
                  </div>

                  {/* Room Type & Amenities */}
                  <div className="mt-2 text-xs text-[#718096]">
                    <span className="font-medium text-[#173B70]">{room.roomType}</span>
                  </div>

                  {/* Resident Info or Empty State */}
                  <div className="mt-3 min-h-[72px] rounded-md border border-[#E6ECF4] bg-[#F4F8FF]/50 p-2.5">
                    {isOccupied ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Avatar name={room.residentName || 'Resident'} size="sm" />
                          <div className="min-w-0 flex-1">
                            {room.residentId ? (
                              <Link
                                to={`/admin/residents/${room.residentId}`}
                                className="block truncate text-xs font-semibold text-[#173B70] hover:text-[#2457C5] hover:underline"
                              >
                                {room.residentName}
                              </Link>
                            ) : (
                              <span className="block truncate text-xs font-semibold text-[#173B70]">
                                {room.residentName}
                              </span>
                            )}
                            <div className="text-[11px] text-[#718096]">
                              {room.residentGender}, {room.residentAge} yrs
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#4A5568]">
                          <span className="truncate">{room.careClassification}</span>
                          <span className="text-[#718096]">Admitted {room.admissionDate}</span>
                        </div>
                      </div>
                    ) : isAvailable ? (
                      <div className="flex h-full flex-col items-center justify-center py-2 text-center">
                        <Sparkles className="h-5 w-5 text-emerald-500" />
                        <span className="mt-1 text-xs font-medium text-emerald-800">Bed Ready for Allocation</span>
                      </div>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center py-2 text-center">
                        <Wrench className="h-5 w-5 text-amber-600" />
                        <span className="mt-1 text-xs font-medium text-amber-800">Under Sanitization / Repair</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 flex items-center justify-between gap-1 border-t border-[#E6ECF4] pt-2.5">
                    {isOccupied && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-[#2457C5] hover:bg-[#E4EDFF]"
                          onClick={() => {
                            setSelectedRoomForAction(room);
                            setIsTransferOpen(true);
                          }}
                        >
                          <ArrowRightLeft className="mr-1 h-3 w-3" />
                          Transfer
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-rose-600 hover:bg-rose-50"
                          onClick={() => handleVacateRoom(room)}
                        >
                          Vacate
                        </Button>
                      </>
                    )}

                    {isAvailable && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          className="h-7 w-full text-xs"
                          onClick={() => {
                            setSelectedRoomForAction(room);
                            setIsAllocateOpen(true);
                          }}
                        >
                          <UserPlus className="mr-1 h-3 w-3" />
                          Allocate Bed
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-amber-700 hover:bg-amber-50"
                          onClick={() => {
                            setSelectedRoomForAction(room);
                            setIsMaintenanceOpen(true);
                          }}
                        >
                          <Wrench className="h-3 w-3" />
                        </Button>
                      </>
                    )}

                    {isMaintenance && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-full text-xs text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                        onClick={() => {
                          setSelectedRoomForAction(room);
                          setIsMaintenanceOpen(true);
                        }}
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Release to Service
                      </Button>
                    )}
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
                <TableHead>Room / Bed</TableHead>
                <TableHead>Wing & Floor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Resident</TableHead>
                <TableHead>Care Level</TableHead>
                <TableHead>Primary Caregiver</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-semibold text-[#173B70]">
                    {room.roomNumber}{' '}
                    <span className="text-xs font-normal text-[#718096]">({room.bedNumber})</span>
                  </TableCell>
                  <TableCell className="text-xs text-[#4A5568]">
                    {room.wing} • Fl. {room.floor}
                  </TableCell>
                  <TableCell className="text-xs text-[#4A5568]">{room.roomType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        room.status === 'occupied'
                          ? 'default'
                          : room.status === 'available'
                          ? 'success'
                          : 'warning'
                      }
                      className="capitalize"
                    >
                      {room.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {room.residentName ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={room.residentName} size="sm" />
                        <div>
                          {room.residentId ? (
                            <Link
                              to={`/admin/residents/${room.residentId}`}
                              className="text-xs font-medium text-[#173B70] hover:text-[#2457C5] hover:underline"
                            >
                              {room.residentName}
                            </Link>
                          ) : (
                            <span className="text-xs font-medium text-[#173B70]">
                              {room.residentName}
                            </span>
                          )}
                          <div className="text-[11px] text-[#718096]">
                            {room.residentGender}, {room.residentAge} yrs
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs italic text-[#718096]">Unoccupied</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-[#4A5568]">
                    {room.careClassification || '—'}
                  </TableCell>
                  <TableCell className="text-xs text-[#4A5568]">
                    {room.primaryCaregiver || '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {room.status === 'occupied' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-[#2457C5]"
                            onClick={() => {
                              setSelectedRoomForAction(room);
                              setIsTransferOpen(true);
                            }}
                          >
                            Transfer
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-rose-600"
                            onClick={() => handleVacateRoom(room)}
                          >
                            Vacate
                          </Button>
                        </>
                      )}
                      {room.status === 'available' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => {
                            setSelectedRoomForAction(room);
                            setIsAllocateOpen(true);
                          }}
                        >
                          Allocate
                        </Button>
                      )}
                      {room.status === 'maintenance' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs text-emerald-700"
                          onClick={() => {
                            setSelectedRoomForAction(room);
                            setIsMaintenanceOpen(true);
                          }}
                        >
                          Release
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Allocate Bed Modal */}
      <Dialog open={isAllocateOpen} onOpenChange={setIsAllocateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Allocate Bed — {selectedRoomForAction?.roomNumber}</DialogTitle>
            <DialogDescription>
              Assign an admitted resident to {selectedRoomForAction?.roomNumber} (
              {selectedRoomForAction?.bedNumber}) in {selectedRoomForAction?.wing}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Select Resident</label>
              <Select
                value={allocateResidentId}
                onChange={(e) => setAllocateResidentId(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="">Choose resident from roster...</option>
                {MOCK_FULL_RESIDENTS.slice(0, 10).map((res) => (
                  <option key={res.id} value={res.id}>
                    {res.fullName} ({res.id}) — {res.careLevel}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#173B70]">Room Type & Amenities</label>
              <div className="mt-1 rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-2.5 text-xs text-[#4A5568]">
                <p className="font-semibold text-[#173B70]">{selectedRoomForAction?.roomType}</p>
                <p className="mt-0.5">Floor {selectedRoomForAction?.floor} • Dual nurse call pipeline enabled</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#173B70]">Effective Admission Date</label>
              <Input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="mt-1 text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsAllocateOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={!allocateResidentId}
              onClick={handleConfirmAllocate}
            >
              Confirm Allocation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Room Modal */}
      <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transfer Resident Room</DialogTitle>
            <DialogDescription>
              Transfer {selectedRoomForAction?.residentName} from{' '}
              {selectedRoomForAction?.roomNumber} to an available bed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Select Destination Room & Bed</label>
              <Select
                value={transferTargetRoomId}
                onChange={(e) => setTransferTargetRoomId(e.target.value)}
                className="mt-1 text-xs"
              >
                <option value="">Select available destination room...</option>
                {rooms
                  .filter((r) => r.status === 'available')
                  .map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.roomNumber} ({r.bedNumber}) — {r.wing} ({r.roomType})
                    </option>
                  ))}
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#173B70]">Clinical Reason for Transfer</label>
              <Input
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div className="rounded-md border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-800">
              <div className="flex items-center gap-1.5 font-semibold">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                Family Notification & Chart Update
              </div>
              <p className="mt-1">
                Upon transfer, the resident eMAR schedule, doctor rounds roster, and primary emergency contacts will be updated automatically.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsTransferOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={!transferTargetRoomId}
              onClick={handleConfirmTransfer}
            >
              Authorize & Complete Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maintenance Dialog */}
      <Dialog open={isMaintenanceOpen} onOpenChange={setIsMaintenanceOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedRoomForAction?.status === 'maintenance'
                ? 'Release Room from Maintenance'
                : 'Flag Room for Maintenance / Sanitization'}
            </DialogTitle>
            <DialogDescription>
              {selectedRoomForAction?.roomNumber} ({selectedRoomForAction?.bedNumber}) in{' '}
              {selectedRoomForAction?.wing}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-[#173B70]">Housekeeping & Engineering Notes</label>
              <Input
                value={maintenanceNotes}
                onChange={(e) => setMaintenanceNotes(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsMaintenanceOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleConfirmMaintenance}>
              Confirm Status Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
