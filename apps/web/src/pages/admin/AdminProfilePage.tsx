import { useState } from 'react';
import {
  UserRound,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Award,
  CheckCircle2,
  Save,
  Laptop,
  Smartphone,
  LogOut,
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Avatar } from '../../components/ui/Avatar.tsx';

export function AdminProfilePage() {
  useDocumentTitle('Administrator Profile — HAVEN');

  const [fullName, setFullName] = useState('Rajesh Varma');
  const [email, setEmail] = useState('rajesh.varma@havenanandam.in');
  const [phone, setPhone] = useState('+91 98450 11200');
  const [title, setTitle] = useState('Healthcare Facility Administrator');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Administrator profile details updated successfully.');
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
              <UserRound className="h-3.5 w-3.5 text-[#2457C5]" />
              Account & Credentials
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            My Administrator Profile
          </h1>
          <p className="text-sm text-[#4A5568]">
            Manage executive contact info, verified healthcare management credentials, and authorized sessions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Card: Summary Card */}
        <Card className="border-[#E6ECF4] bg-white shadow-xs">
          <CardContent className="p-6 text-center">
            <div className="mx-auto flex justify-center">
              <Avatar name={fullName} size="xl" />
            </div>
            <h2 className="mt-3 text-lg font-bold text-[#173B70]">{fullName}</h2>
            <p className="text-xs font-medium text-[#2457C5]">{title}</p>
            <Badge variant="default" className="mt-2 text-xs">
              Staff ID: ADM-2024-001
            </Badge>

            <div className="mt-6 border-t border-[#E6ECF4] pt-4 text-left space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-[#4A5568]">
                <Building2 className="h-4 w-4 text-[#2457C5]" />
                <span>HAVEN Anandam Care Residence</span>
              </div>
              <div className="flex items-center gap-2 text-[#4A5568]">
                <Mail className="h-4 w-4 text-[#2457C5]" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4A5568]">
                <Phone className="h-4 w-4 text-[#2457C5]" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#4A5568]">
                <Calendar className="h-4 w-4 text-[#2457C5]" />
                <span>Joined: 15 Jan 2024</span>
              </div>
            </div>

            <div className="mt-6 border-t border-[#E6ECF4] pt-4 text-left">
              <h4 className="text-xs font-semibold text-[#173B70] mb-2">Verified Accreditations</h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Master of Hospital Administration (MHA)</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <span>Karnataka DHS Authorized Head</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Form: Details & Sessions */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-sm font-bold text-[#173B70]">Personal & Professional Details</CardTitle>
              <CardDescription className="text-xs">Update your administrative profile info</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-semibold text-[#173B70]">Full Name</label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#173B70]">Designation</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#173B70]">Official Email</label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#173B70]">Mobile Phone (+91)</label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="default" size="sm">
                    <Save className="mr-1.5 h-3.5 w-3.5" />
                    Save Profile Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Active Logins & Terminals */}
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-sm font-bold text-[#173B70]">Active Sessions & Devices</CardTitle>
              <CardDescription className="text-xs">Current authorized devices with EHR access tokens</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-2 space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-lg border border-[#E6ECF4] bg-[#F4F8FF] p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-[#E4EDFF] p-2 text-[#2457C5]">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#173B70]">
                      Administrator Desktop (Koramangala Office)
                    </div>
                    <div className="text-[11px] text-[#718096]">
                      Windows 11 • Chrome 130 • IP 192.168.1.12 (Current Session)
                    </div>
                  </div>
                </div>
                <Badge variant="success">Active Now</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[#E6ECF4] bg-white p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-gray-100 p-2 text-[#718096]">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#173B70]">
                      Facility Rounds iPad Pro
                    </div>
                    <div className="text-[11px] text-[#718096]">
                      iPadOS 18 • Safari • Last active 42 mins ago
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-rose-600 hover:bg-rose-50"
                  onClick={() => showToast('iPad session terminated.')}
                >
                  <LogOut className="mr-1 h-3.5 w-3.5" />
                  Revoke
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
