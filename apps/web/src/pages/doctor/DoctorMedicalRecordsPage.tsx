import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  FileText,
  Search,
  User,
  ArrowRight,
  Stethoscope,
  Pill,
  AlertTriangle,
  FileCheck,
  Eye,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/Dialog.tsx';
import {
  getDoctorAuthorizedResidents,
  MOCK_CLINICAL_NOTES,
  MOCK_CLINICAL_DOCUMENTS,
  type ClinicalDocument,
} from '../../mock/doctorWorkspaceData.ts';
import { MOCK_PRESCRIPTIONS } from '../../mock/medicationsData.ts';
import { MOCK_DETAILED_INCIDENTS } from '../../mock/incidentsData.ts';

export function DoctorMedicalRecordsPage() {
  useDocumentTitle('Resident Medical Records — Doctor');
  const navigate = useNavigate();

  const authorizedResidents = useMemo(() => getDoctorAuthorizedResidents(), []);
  const [selectedResidentId, setSelectedResidentId] = useState<string>(
    authorizedResidents[0]?.id || 'RES-044'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWing, setSelectedWing] = useState('all');
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'note' | 'prescription' | 'incident'>('all');
  const [previewDoc, setPreviewDoc] = useState<ClinicalDocument | null>(null);

  // Selected resident data
  const currentResident = useMemo(() => {
    return authorizedResidents.find((r) => r.id === selectedResidentId) || authorizedResidents[0];
  }, [authorizedResidents, selectedResidentId]);

  // Filtered resident list
  const filteredResidents = useMemo(() => {
    return authorizedResidents.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.fullName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.placement.room.toLowerCase().includes(q);
      const matchesWing = selectedWing === 'all' || r.placement.wing === selectedWing;
      return matchesSearch && matchesWing;
    });
  }, [authorizedResidents, searchQuery, selectedWing]);

  // Build longitudinal timeline for selected resident
  const residentTimeline = useMemo(() => {
    if (!currentResident) return [];

    const events: {
      id: string;
      date: string;
      time: string;
      type: 'note' | 'prescription' | 'incident';
      title: string;
      subtitle: string;
      author: string;
      status: string;
      details: string;
    }[] = [];

    // Notes
    MOCK_CLINICAL_NOTES
      .filter((n) => n.residentId === currentResident.id)
      .forEach((n) => {
        events.push({
          id: n.id,
          date: n.date,
          time: n.time,
          type: 'note',
          title: `${n.type}: ${n.clinicalAssessment.slice(0, 50)}...`,
          subtitle: `SOAP Assessment by ${n.authorName} (${n.authorKmc})`,
          author: n.authorName,
          status: n.status,
          details: n.carePlanDirective,
        });
      });

    // Prescriptions
    MOCK_PRESCRIPTIONS
      .filter((p) => p.residentId === currentResident.id)
      .forEach((p) => {
        events.push({
          id: p.id,
          date: p.authorizedDate,
          time: '09:00 AM',
          type: 'prescription',
          title: `Prescription Authorized: ${p.medicationName} (${p.dosage})`,
          subtitle: `${p.frequency} · ${p.route} · Indication: ${p.indication}`,
          author: p.prescribingDoctor,
          status: p.status,
          details: p.instructions,
        });
      });

    // Incidents
    MOCK_DETAILED_INCIDENTS
      .filter((inc) => inc.residentId === currentResident.id)
      .forEach((inc) => {
        events.push({
          id: inc.id,
          date: inc.occurredAt.split('·')[0].trim(),
          time: inc.occurredAt.split('·')[1]?.trim() || '',
          type: 'incident',
          title: `Incident: ${inc.category} (${inc.reference})`,
          subtitle: `Severity: ${inc.severity.toUpperCase()} · Reported by ${inc.reportedBy}`,
          author: inc.assignedReviewer,
          status: inc.status,
          details: inc.summary,
        });
      });

    return events.filter((e) => {
      if (timelineFilter === 'all') return true;
      return e.type === timelineFilter;
    });
  }, [currentResident, timelineFilter]);

  // Documents for selected resident
  const currentDocuments = useMemo(() => {
    if (!currentResident) return [];
    return MOCK_CLINICAL_DOCUMENTS.filter((d) => d.residentId === currentResident.id);
  }, [currentResident]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-haven-navy-900 tracking-tight">
            Resident Medical Records Workspace
          </h1>
          <p className="text-xs text-haven-neutral-500 mt-1">
            Longitudinal clinical timelines, diagnostic summaries, and medical documentation for authorized caseload.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/doctor/notes')}
          >
            <FileText className="w-4 h-4 mr-1.5" /> Clinical Notes
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/doctor/residents/${currentResident?.id}`)}
          >
            <User className="w-4 h-4 mr-1.5" /> Full Resident Profile
          </Button>
        </div>
      </div>

      {/* Main Two-Pane Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Pane: Resident Selector Directory (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b border-haven-neutral-100 space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-haven-navy-900">
                  Authorized Caseload
                </CardTitle>
                <Badge variant="outline" className="text-xs font-semibold">
                  {authorizedResidents.length} Residents
                </Badge>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-haven-neutral-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, room, ID..."
                  className="pl-8 text-xs h-8"
                />
              </div>

              <Select
                value={selectedWing}
                onChange={(e) => setSelectedWing(e.target.value)}
                className="text-xs h-8"
              >
                <option value="all">All Facility Wings</option>
                <option value="Orchard Meadow">Orchard Meadow</option>
                <option value="Garden Terrace">Garden Terrace</option>
                <option value="Sunrise Pavilion">Sunrise Pavilion</option>
                <option value="Highland Haven">Highland Haven</option>
              </Select>
            </CardHeader>

            <CardContent className="p-2 space-y-1 max-h-[620px] overflow-y-auto">
              {filteredResidents.map((resident) => {
                const isSelected = resident.id === currentResident?.id;
                return (
                  <button
                    key={resident.id}
                    onClick={() => setSelectedResidentId(resident.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-haven-royal-blue text-white shadow-xs'
                        : 'hover:bg-haven-ice-blue/60 text-haven-navy-900 border border-transparent hover:border-haven-blue-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar
                        name={resident.fullName}
                        size="md"
                        className={isSelected ? 'ring-2 ring-white/30' : ''}
                      />
                      <div className="truncate">
                        <span className={`text-xs font-bold block truncate ${isSelected ? 'text-white' : 'text-haven-navy-900'}`}>
                          {resident.fullName}
                        </span>
                        <span className={`text-[11px] block truncate ${isSelected ? 'text-blue-100' : 'text-haven-neutral-500'}`}>
                          {resident.placement.room} · {resident.placement.wing}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-mono block ${isSelected ? 'text-blue-100' : 'text-haven-neutral-400'}`}>
                        {resident.id}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase ${isSelected ? 'text-white' : 'text-haven-royal-blue'}`}>
                        {resident.careLevel.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right Pane: Longitudinal Record View (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {currentResident && (
            <>
              {/* Selected Resident Summary Card */}
              <Card className="border-haven-blue-200 bg-gradient-to-r from-haven-ice-blue to-white">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={currentResident.fullName}
                        size="lg"
                        className="ring-2 ring-haven-royal-blue/20"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-haven-navy-900">
                            {currentResident.fullName}
                          </h2>
                          <Badge variant="outline" className="font-mono text-xs">
                            {currentResident.id}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {currentResident.careLevel}
                          </Badge>
                        </div>
                        <p className="text-xs text-haven-neutral-600 mt-0.5">
                          {currentResident.age} Yrs · {currentResident.gender} · Room {currentResident.placement.room} ({currentResident.placement.wing})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/doctor/residents/${currentResident.id}`)}
                      >
                        Open 8-Tab Medical Profile <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>

                  {/* Vitals & Diagnoses Quick Row */}
                  <div className="mt-4 pt-3 border-t border-haven-blue-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-haven-neutral-500 block text-[11px]">Blood Pressure</span>
                      <span className="font-bold text-haven-navy-900">128/82 mmHg</span>
                    </div>
                    <div>
                      <span className="text-haven-neutral-500 block text-[11px]">Heart Rate</span>
                      <span className="font-bold text-haven-navy-900">74 bpm</span>
                    </div>
                    <div>
                      <span className="text-haven-neutral-500 block text-[11px]">SpO2 Saturation</span>
                      <span className="font-bold text-emerald-700">98%</span>
                    </div>
                    <div>
                      <span className="text-haven-neutral-500 block text-[11px]">Fall Risk</span>
                      <span className="font-bold text-amber-700">{currentResident.carePlan?.fallRiskLevel || 'Moderate'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Longitudinal Timeline Section */}
              <Card>
                <CardHeader className="pb-3 border-b border-haven-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-sm font-bold text-haven-navy-900">
                      Longitudinal Clinical Ledger
                    </CardTitle>
                    <p className="text-xs text-haven-neutral-500">
                      Chronological record of clinical assessments, prescriptions, and critical events
                    </p>
                  </div>

                  {/* Timeline filters */}
                  <div className="flex items-center gap-1.5 bg-haven-neutral-100 p-1 rounded-lg text-xs">
                    {[
                      { key: 'all', label: 'All' },
                      { key: 'note', label: 'Notes' },
                      { key: 'prescription', label: 'Prescriptions' },
                      { key: 'incident', label: 'Incidents' },
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setTimelineFilter(key as 'all' | 'note' | 'prescription' | 'incident')}
                        className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                          timelineFilter === key
                            ? 'bg-white text-haven-navy-900 shadow-xs font-semibold'
                            : 'text-haven-neutral-600 hover:text-haven-navy-900'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {residentTimeline.length > 0 ? (
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-haven-neutral-200">
                      {residentTimeline.map((item) => {
                        const Icon =
                          item.type === 'note'
                            ? Stethoscope
                            : item.type === 'prescription'
                            ? Pill
                            : AlertTriangle;
                        const iconColor =
                          item.type === 'note'
                            ? 'bg-haven-royal-blue text-white'
                            : item.type === 'prescription'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-600 text-white';

                        return (
                          <div key={item.id} className="relative group">
                            {/* Timeline bullet icon */}
                            <div
                              className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${iconColor}`}
                            >
                              <Icon className="w-3 h-3" />
                            </div>

                            <div className="p-4 rounded-xl border border-haven-neutral-200 bg-white hover:border-haven-blue-300 transition-colors shadow-xs">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-xs font-bold text-haven-navy-900">
                                    {item.title}
                                  </h4>
                                  <Badge variant="outline" className="font-mono text-[10px]">
                                    {item.id}
                                  </Badge>
                                </div>
                                <span className="text-[11px] font-mono text-haven-neutral-400 shrink-0">
                                  {item.date} · {item.time}
                                </span>
                              </div>

                              <p className="text-xs text-haven-neutral-600 mt-1">
                                {item.subtitle}
                              </p>
                              <p className="text-xs text-haven-neutral-800 mt-2 p-2.5 rounded-lg bg-haven-ice-blue/40 border border-haven-blue-50 leading-relaxed">
                                {item.details}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-haven-neutral-500 py-6 text-center">
                      No clinical events found for this filter criteria.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Attached Diagnostic Reports */}
              <Card>
                <CardHeader className="pb-3 border-b border-haven-neutral-100 flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-haven-navy-900">
                    Diagnostic Documents & Institutional Reports
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {currentDocuments.length} Verified Files
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-lg border border-haven-neutral-200 bg-white hover:border-haven-blue-300 transition-colors flex items-start justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-haven-navy-900 block">
                          {doc.title}
                        </span>
                        <span className="text-[11px] text-haven-neutral-500 block font-mono">
                          {doc.referenceNumber} · {doc.category}
                        </span>
                        <span className="text-[10px] text-haven-neutral-400 block">
                          Uploaded {doc.uploadDate}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewDoc(doc)}
                        className="shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" /> View
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-haven-navy-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-haven-royal-blue" />
              <span>{previewDoc?.title}</span>
            </DialogTitle>
          </DialogHeader>
          {previewDoc && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-lg bg-haven-ice-blue border border-haven-blue-100 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-haven-navy-900 block font-mono">
                    Ref: {previewDoc.referenceNumber}
                  </span>
                  <span className="text-haven-neutral-600">Category: {previewDoc.category}</span>
                </div>
                <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200">
                  {previewDoc.status}
                </Badge>
              </div>

              <div>
                <h5 className="font-bold text-haven-navy-900 mb-1">Clinical Summary & Findings:</h5>
                <p className="text-haven-neutral-700 leading-relaxed p-3 rounded-lg bg-haven-neutral-50 border border-haven-neutral-200">
                  {previewDoc.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[11px] text-haven-neutral-500 pt-2 border-t border-haven-neutral-200">
                <div>
                  <strong>Uploaded By:</strong> {previewDoc.uploadedBy}
                </div>
                <div>
                  <strong>Date:</strong> {previewDoc.uploadDate} ({previewDoc.fileSize})
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setPreviewDoc(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
