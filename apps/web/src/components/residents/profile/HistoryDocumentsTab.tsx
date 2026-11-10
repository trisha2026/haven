import { useState } from 'react';
import {
  FileText,
  Download,
  AlertTriangle,
  History,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck,
  Filter,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import { Button } from '../../ui/Button.tsx';
import type { FullResident } from '../../../types/resident.ts';

export interface HistoryDocumentsTabProps {
  resident: FullResident;
  onDownloadDocument?: (docTitle: string) => void;
}

export function HistoryDocumentsTab({ resident, onDownloadDocument }: HistoryDocumentsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const documents = resident.documents || [];
  const incidents = resident.incidents || [];
  const attendance = resident.attendanceLogs || [];

  const filteredDocs = selectedCategory === 'all'
    ? documents
    : documents.filter((d) => d.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleDownload = (docTitle: string) => {
    if (onDownloadDocument) {
      onDownloadDocument(docTitle);
    } else {
      setDownloadSuccessToast(`Downloading document "${docTitle}"...`);
      setTimeout(() => setDownloadSuccessToast(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {downloadSuccessToast && (
        <div className="p-3.5 rounded-xl bg-haven-success-soft border border-haven-success-border text-haven-success text-xs font-semibold flex items-center justify-between transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{downloadSuccessToast}</span>
          </div>
          <button
            onClick={() => setDownloadSuccessToast(null)}
            className="text-haven-success hover:underline text-[11px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 1. Legal, Consent & Care Documents Repository */}
      <Card variant="default" padding="lg" className="shadow-haven-card">
        <CardHeader className="pb-3 border-b border-haven-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-haven-blue-700" />
              <div>
                <CardTitle as="h3" className="text-base">Document &amp; Consent Repository</CardTitle>
                <p className="text-xs text-haven-slate-500">
                  Digitized residency agreements, healthcare proxies, clinical consents &amp; advance care planning directives
                </p>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {['all', 'Agreement', 'Directives', 'Legal', 'Clinical'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === cat
                      ? 'bg-haven-blue-700 text-white shadow-sm'
                      : 'bg-haven-slate-100 text-haven-slate-600 hover:bg-haven-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Records' : cat}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-3 text-xs">
          {filteredDocs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-haven-slate-50 border border-haven-border space-y-3 hover:border-haven-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-haven-blue-100 text-haven-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-haven-slate-900 leading-snug">
                          {doc.title}
                        </h4>
                        <span className="text-[11px] text-haven-slate-500 font-medium">
                          Ref: {doc.referenceNumber || doc.id}
                        </span>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      {doc.status}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-haven-slate-600 text-[11px] pt-1 border-t border-haven-border-light">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-semibold text-haven-slate-800">{doc.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uploaded / Executed:</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Signatories:</span>
                      <span className="text-right truncate max-w-[200px]">{doc.signedBy}</span>
                    </div>
                  </div>

                  <Button
                    variant="subtle"
                    size="sm"
                    className="w-full text-xs"
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                    onClick={() => handleDownload(doc.title)}
                  >
                    Download ({doc.fileSize})
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-haven-slate-50 rounded-2xl border border-dashed border-haven-border space-y-2">
              <Filter className="w-6 h-6 text-haven-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-haven-slate-700">No documents found in this category</p>
              <p className="text-xs text-haven-slate-500">Switch filter to "All Records" to view other documents.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Incidents & Clinical Safety History */}
      <Card variant="default" padding="lg" className="shadow-haven-card">
        <CardHeader className="pb-3 border-b border-haven-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-haven-danger" />
              <div>
                <CardTitle as="h3" className="text-base">Safety Incidents &amp; Clinical Follow-Ups</CardTitle>
                <p className="text-xs text-haven-slate-500">
                  Documented safety events, slip/falls, or behavioural records
                </p>
              </div>
            </div>
            <Badge
              variant={incidents.length > 0 ? 'danger' : 'secondary'}
              size="sm"
            >
              {incidents.length} Logged
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-3 text-xs">
          {incidents.length > 0 ? (
            incidents.map((inc) => (
              <div
                key={inc.id}
                className="p-4 rounded-2xl bg-haven-danger-soft/30 border border-haven-danger-border space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-haven-danger">
                        {inc.category} Incident · {inc.reference}
                      </span>
                      <Badge variant="danger" size="sm">
                        {inc.severity} Severity
                      </Badge>
                    </div>
                    <span className="text-xs text-haven-slate-500 font-medium">
                      Occurred: {inc.date} · Location: {resident.placement.room}
                    </span>
                  </div>

                  <Badge variant="warning" size="sm">
                    {inc.status}
                  </Badge>
                </div>

                <p className="text-haven-slate-800 leading-relaxed font-medium">
                  {inc.summary}
                </p>

                <div className="p-3 rounded-xl bg-white border border-haven-danger-border/60 text-[11px] text-haven-slate-700 space-y-1">
                  <div>
                    <span className="font-bold text-haven-slate-900">Incident Review Status:</span>{' '}
                    {inc.status}
                  </div>
                  <div className="text-haven-slate-500 pt-0.5">
                    Logged by {inc.reporter}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 rounded-2xl bg-haven-slate-50 border border-dashed border-haven-border text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-haven-success mx-auto" />
              <p className="font-semibold text-haven-slate-800 text-sm">No Safety Incidents Recorded</p>
              <p className="text-xs text-haven-slate-500">
                Resident has clean clinical safety record during stay at HAVEN.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 3. Admission, Attendance & Activity History */}
      <Card variant="default" padding="lg" className="shadow-haven-card">
        <CardHeader className="pb-3 border-b border-haven-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-haven-blue-700" />
              <div>
                <CardTitle as="h3" className="text-base">Admission History &amp; Attendance Logs</CardTitle>
                <p className="text-xs text-haven-slate-500">
                  Verification checkpoints, dining check-ins and activity attendance
                </p>
              </div>
            </div>
            <Badge variant="secondary" size="sm">
              Admitted: {resident.placement.moveInDate}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-2.5 text-xs">
          {attendance.length > 0 ? (
            attendance.map((att) => (
              <div
                key={att.id}
                className="p-3.5 rounded-xl bg-haven-slate-50 border border-haven-border flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-haven-slate-900 block">{att.location}</span>
                    <span className="text-[11px] text-haven-slate-500">
                      {att.date} at {att.time} · Verified by {att.verifiedBy}
                    </span>
                  </div>
                </div>
                <Badge variant="success" size="sm">
                  {att.status}
                </Badge>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl bg-haven-slate-50 text-center text-haven-slate-500">
              No recent attendance logs logged for today.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
