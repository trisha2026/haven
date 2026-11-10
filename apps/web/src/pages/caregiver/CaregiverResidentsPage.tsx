import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  Search,
  LayoutGrid,
  List,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import { getAuthorizedResidents, ACTIVE_CAREGIVER } from '../../mock/caregiverWorkspaceData.ts';

export function CaregiverResidentsPage() {
  useDocumentTitle('My Assigned Residents — Caregiver');
  const navigate = useNavigate();

  const authorizedResidents = useMemo(() => getAuthorizedResidents(), []);

  // State
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareLevel, setSelectedCareLevel] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState('all');

  // Filtered residents
  const filteredResidents = useMemo(() => {
    return authorizedResidents.filter((resident) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        resident.fullName.toLowerCase().includes(q) ||
        resident.id.toLowerCase().includes(q) ||
        resident.placement.room.toLowerCase().includes(q) ||
        resident.careLevel.toLowerCase().includes(q);

      const matchesCare = selectedCareLevel === 'all' || resident.careLevel === selectedCareLevel;
      const matchesAssignment =
        selectedAssignment === 'all' || resident.assignmentType === selectedAssignment;

      return matchesSearch && matchesCare && matchesAssignment;
    });
  }, [authorizedResidents, searchQuery, selectedCareLevel, selectedAssignment]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4EDFF] px-2.5 py-0.5 text-xs font-semibold text-[#173B70]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2457C5]" />
              Authorized Caseload Directory
            </span>
            <span className="text-xs text-[#64748B]">
              Primary Wing: {ACTIVE_CAREGIVER.assignedWing}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            My Assigned Residents
          </h1>
          <p className="text-sm text-[#4A5568]">
            Access care plans, vitals, today’s medication schedule, and daily care tasks for residents under your active care.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-[#E6ECF4] bg-white p-0.5 shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#173B70] text-white'
                  : 'text-[#64748B] hover:text-[#173B70]'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#173B70] text-white'
                  : 'text-[#64748B] hover:text-[#173B70]'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Scope Notice Banner */}
      <div className="rounded-xl border border-[#E6ECF4] bg-[#F4F8FF] p-4 text-xs text-[#173B70]">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-[#2457C5] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Privacy & Role-Based Access Enforced:</span> You are viewing only residents permanently assigned to your primary caseload (Garden Terrace) or authorized under active temporary emergency assignment. Unassigned facility records are restricted to respect clinical confidentiality.
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <Card className="border-[#E6ECF4] bg-white shadow-xs">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#64748B]" />
              <Input
                placeholder="Search by resident name, ID (e.g. RES-041), or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <div>
              <Select
                value={selectedCareLevel}
                onChange={(e) => setSelectedCareLevel(e.target.value)}
                className="text-xs"
              >
                <option value="all">All Care Levels</option>
                <option value="Assisted Living">Assisted Living</option>
                <option value="Skilled Nursing">Skilled Nursing</option>
                <option value="Memory Care">Memory Care</option>
                <option value="Independent Living">Independent Living</option>
              </Select>
            </div>

            <div>
              <Select
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
                className="text-xs"
              >
                <option value="all">All Assignment Types</option>
                <option value="permanent">Primary Caseload (Permanent)</option>
                <option value="temporary">Temporary Standby (EMG)</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 1. Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResidents.map((resident) => (
            <Card
              key={resident.id}
              className="border-[#E6ECF4] bg-white shadow-xs hover:border-[#2457C5] transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                {/* Top Info Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={resident.fullName}
                      size="lg"
                      className="border border-[#E6ECF4] bg-[#E4EDFF] text-[#173B70] font-bold"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-[#173B70]">
                          {resident.fullName}
                        </h3>
                      </div>
                      <div className="text-xs text-[#64748B]">
                        {resident.id} · Age {resident.age} ({resident.gender})
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={resident.assignmentType === 'permanent' ? 'default' : 'warning'}
                    className="text-[10px] shrink-0"
                  >
                    {resident.assignmentType === 'permanent' ? 'Primary Caseload' : 'Temp Standby'}
                  </Badge>
                </div>

                {/* Placement & Doctor Info */}
                <div className="rounded-lg border border-[#E6ECF4] bg-[#F4F8FF]/60 p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Room & Bed:</span>
                    <span className="font-semibold text-[#173B70]">
                      {resident.placement.room} · {resident.placement.bed} ({resident.placement.wing})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Care Level:</span>
                    <span className="font-medium text-[#2457C5]">{resident.careLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Primary Doctor:</span>
                    <span className="text-[#334155]">{resident.careTeam.primaryDoctor.name}</span>
                  </div>
                </div>

                {/* Active Alerts */}
                {resident.alerts && resident.alerts.length > 0 && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-2.5 text-xs text-amber-900">
                    <div className="flex items-start gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="line-clamp-2">{resident.alerts[0]}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Action */}
              <div className="border-t border-[#E6ECF4] bg-slate-50/50 p-3 flex items-center justify-between">
                <span className="text-xs font-medium text-[#64748B]">
                  Status: <span className="text-emerald-700 capitalize">{resident.status}</span>
                </span>
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => navigate(`/caregiver/residents/${resident.id}`)}
                >
                  View Profile
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 2. Table View */}
      {viewMode === 'table' && (
        <Card className="border-[#E6ECF4] bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="border-b border-[#E6ECF4] bg-[#F4F8FF] text-[#173B70] font-semibold">
                <tr>
                  <th className="p-3">Resident</th>
                  <th className="p-3">Room & Wing</th>
                  <th className="p-3">Care Level</th>
                  <th className="p-3">Primary Doctor</th>
                  <th className="p-3">Assignment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6ECF4]">
                {filteredResidents.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F4F8FF]/40 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={r.fullName} size="sm" />
                        <div>
                          <div className="font-bold text-[#173B70]">{r.fullName}</div>
                          <div className="text-[11px] text-[#64748B]">{r.id} · Age {r.age}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-[#173B70]">{r.placement.room}</div>
                      <div className="text-[11px] text-[#64748B]">{r.placement.wing}</div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {r.careLevel}
                      </Badge>
                    </td>
                    <td className="p-3 text-[#334155]">{r.careTeam.primaryDoctor.name}</td>
                    <td className="p-3">
                      <Badge
                        variant={r.assignmentType === 'permanent' ? 'default' : 'warning'}
                        className="text-[10px]"
                      >
                        {r.assignmentType === 'permanent' ? 'Primary' : 'Emergency Standby'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="success" className="text-[10px] capitalize">
                        {r.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="default"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => navigate(`/caregiver/residents/${r.id}`)}
                      >
                        Open Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filteredResidents.length === 0 && (
        <Card className="border-[#E6ECF4] bg-white p-8 text-center">
          <p className="text-sm text-[#64748B]">No assigned residents matched your search criteria.</p>
        </Card>
      )}
    </div>
  );
}
