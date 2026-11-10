import { Link } from 'react-router';
import { Button } from '../components/ui/Button.tsx';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-haven-blue-50 text-haven-slate-900 flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-haven-warning-soft text-haven-warning border border-haven-warning-border">
          404 Not Found
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-haven-navy-900">
          Page Not Found
        </h1>
        <p className="text-sm text-haven-slate-500 leading-relaxed">
          The destination you requested does not exist or may have been relocated within HAVEN.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link to="/admin/dashboard">
            <Button variant="primary">Return to Admin Command Centre</Button>
          </Link>
          <Link to="/design-system">
            <Button variant="outline">Design System Gallery</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
