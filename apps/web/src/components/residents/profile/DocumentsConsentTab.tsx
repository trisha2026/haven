import { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.tsx';
import { Badge } from '../../ui/Badge.tsx';
import { Button } from '../../ui/Button.tsx';
import type { FullResident } from '../../../types/resident.ts';

export interface DocumentsConsentTabProps {
  resident: FullResident;
}

export function DocumentsConsentTab({ resident }: DocumentsConsentTabProps) {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (title: string) => {
    setDownloadNotice(`Downloading authenticated copy of "${title}"...`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      {downloadNotice && (
        <div className="p-3 rounded-xl bg-haven-success-soft text-haven-success border border-haven-success-border text-xs flex items-center justify-between">
          <span>{downloadNotice}</span>
          <button
            type="button"
            onClick={() => setDownloadNotice(null)}
            className="text-haven-success font-bold ml-2 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      <Card variant="default" padding="lg" className="shadow-haven-card">
        <CardHeader className="pb-3 border-b border-haven-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <CardTitle as="h3" className="text-base">Legal Documents &amp; Signed Consents</CardTitle>
                <p className="text-xs text-haven-slate-500">
                  Encrypted digital document repository — HIPPA verified, admission agreements, and clinical directives.
                </p>
              </div>
            </div>

            <span className="text-xs text-haven-slate-500 font-medium">
              {resident.documents.length} Files on Record
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-5 space-y-3 text-xs">
          {resident.documents.length > 0 ? (
            <div className="space-y-3">
              {resident.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-white border border-haven-border shadow-haven-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-haven-blue-500/40 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-haven-blue-50 text-haven-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-haven-slate-900">
                          {doc.title}
                        </span>
                        <Badge variant="default" size="sm">
                          {doc.category}
                        </Badge>
                        <Badge variant="success" size="sm">
                          {doc.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-haven-slate-500 text-[11px]">
                        <span>Ref: <strong className="font-mono text-haven-slate-700">{doc.referenceNumber}</strong></span>
                        <span>Size: {doc.fileSize}</span>
                        <span>Uploaded: {doc.uploadDate}</span>
                        <span>Signed by: <strong>{doc.signedBy}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc.title)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      View
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownload(doc.title)}
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-haven-slate-500 bg-haven-slate-50 rounded-2xl">
              No formal documents uploaded to this resident record yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
