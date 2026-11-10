import { useState } from 'react';
import {
  ChartColumn,
  Download,
  Printer,
  Building2,
  Pill,
  Users,
  AlertTriangle,
  IndianRupee,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useDocumentTitle } from '../../hooks/useDocumentTitle.ts';
import { Button } from '../../components/ui/Button.tsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card.tsx';
import { Select } from '../../components/ui/Select.tsx';

// Recharts datasets
const OCCUPANCY_DATA = [
  { month: 'Jun', occupancy: 82, target: 85 },
  { month: 'Jul', occupancy: 84, target: 85 },
  { month: 'Aug', occupancy: 88, target: 90 },
  { month: 'Sep', occupancy: 89, target: 90 },
  { month: 'Oct', occupancy: 91, target: 90 },
  { month: 'Nov', occupancy: 90.6, target: 90 },
];

const CARE_TIER_DISTRIBUTION = [
  { name: 'Memory Care', value: 16, color: '#173B70' },
  { name: 'Skilled Nursing', value: 18, color: '#2457C5' },
  { name: 'Assisted Living', value: 14, color: '#3979D8' },
  { name: 'Independent Living', value: 10, color: '#6BA5F2' },
];

const MEDICATION_ADHERENCE_DATA = [
  { day: 'Mon', adherence: 94.2, missed: 2 },
  { day: 'Tue', adherence: 96.0, missed: 1 },
  { day: 'Wed', adherence: 91.5, missed: 4 },
  { day: 'Thu', adherence: 95.8, missed: 1 },
  { day: 'Fri', adherence: 93.0, missed: 3 },
  { day: 'Sat', adherence: 97.4, missed: 1 },
  { day: 'Sun', adherence: 91.6, missed: 3 },
];

const INCIDENT_BREAKDOWN_DATA = [
  { category: 'Falls & Mobility', count: 6, resolved: 5 },
  { category: 'Behavioral', count: 5, resolved: 4 },
  { category: 'Medication', count: 4, resolved: 4 },
  { category: 'Equipment', count: 2, resolved: 1 },
];

export function AdminReportsAnalyticsPage() {
  useDocumentTitle('Reports & Analytics — Administrator');

  // Selected Report Category
  const [selectedReport, setSelectedReport] = useState<
    'occupancy' | 'medication' | 'workforce' | 'incidents' | 'inventory'
  >('occupancy');

  const [dateRange, setDateRange] = useState('30d');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportCSV = () => {
    showToast(`Exported ${selectedReport.toUpperCase()} dataset to CSV.`);
  };

  const handlePrint = () => {
    window.print();
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
              <ChartColumn className="h-3.5 w-3.5 text-[#2457C5]" />
              Executive Business Intelligence
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173B70]">
            Reports & Clinical Analytics
          </h1>
          <p className="text-sm text-[#4A5568]">
            Facility occupancy trends, medication administration compliance, workforce analytics, and safety benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs sm:w-40"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Current Quarter</option>
            <option value="ytd">Year to Date (2026)</option>
          </Select>

          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export CSV
          </Button>

          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-1.5 h-3.5 w-3.5" />
            Print Report
          </Button>
        </div>
      </div>

      {/* Report Module Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E6ECF4] pb-3">
        <button
          onClick={() => setSelectedReport('occupancy')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            selectedReport === 'occupancy'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          Census & Occupancy
        </button>

        <button
          onClick={() => setSelectedReport('medication')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            selectedReport === 'medication'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <Pill className="h-3.5 w-3.5" />
          Medication & eMAR
        </button>

        <button
          onClick={() => setSelectedReport('workforce')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            selectedReport === 'workforce'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          Workforce & Shifts
        </button>

        <button
          onClick={() => setSelectedReport('incidents')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            selectedReport === 'incidents'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          Safety & Incidents
        </button>

        <button
          onClick={() => setSelectedReport('inventory')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            selectedReport === 'inventory'
              ? 'bg-[#173B70] text-white shadow-xs'
              : 'border border-[#E6ECF4] bg-white text-[#4A5568] hover:bg-[#F4F8FF]'
          }`}
        >
          <IndianRupee className="h-3.5 w-3.5" />
          Pharmacy & Procurement
        </button>
      </div>

      {/* Dynamic Report Content */}
      {selectedReport === 'occupancy' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Occupancy Trend Line Chart */}
            <Card className="border-[#E6ECF4] bg-white shadow-xs">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-bold text-[#173B70]">
                  6-Month Bed Occupancy Velocity (%)
                </CardTitle>
                <CardDescription className="text-xs">
                  Historical occupancy trend vs target threshold (90%)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={OCCUPANCY_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E6ECF4" />
                      <XAxis dataKey="month" stroke="#718096" fontSize={12} />
                      <YAxis stroke="#718096" domain={[70, 100]} fontSize={12} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="occupancy"
                        stroke="#2457C5"
                        strokeWidth={2.5}
                        name="Occupancy %"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#718096"
                        strokeDasharray="4 4"
                        name="Target %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Care Tier Distribution Pie Chart */}
            <Card className="border-[#E6ECF4] bg-white shadow-xs">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-bold text-[#173B70]">
                  Resident Care Tier Distribution (58 Census)
                </CardTitle>
                <CardDescription className="text-xs">
                  Acuity segmentation across care wings
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={CARE_TIER_DISTRIBUTION}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {CARE_TIER_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedReport === 'medication' && (
        <div className="space-y-6">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-bold text-[#173B70]">
                Daily eMAR Adherence Rate vs Missed Doses
              </CardTitle>
              <CardDescription className="text-xs">
                7-day rolling adherence compliance across 214 daily doses
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MEDICATION_ADHERENCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E6ECF4" />
                    <XAxis dataKey="day" stroke="#718096" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#2457C5" domain={[85, 100]} fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#E53E3E" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="adherence"
                      fill="#2457C5"
                      name="Adherence %"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="missed"
                      fill="#E53E3E"
                      name="Missed / Overdue Doses"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedReport === 'incidents' && (
        <div className="space-y-6">
          <Card className="border-[#E6ECF4] bg-white shadow-xs">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-bold text-[#173B70]">
                Safety Incidents by Category & Resolution Status
              </CardTitle>
              <CardDescription className="text-xs">
                Total reported (17) vs clinical resolution completed (14)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={INCIDENT_BREAKDOWN_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E6ECF4" />
                    <XAxis dataKey="category" stroke="#718096" fontSize={12} />
                    <YAxis stroke="#718096" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#173B70"
                      name="Total Recorded"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="resolved"
                      fill="#2457C5"
                      name="Resolved with CAPA"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedReport === 'workforce' && (
        <Card className="border-[#E6ECF4] bg-white shadow-xs p-6 text-center">
          <Users className="mx-auto h-8 w-8 text-[#2457C5]" />
          <h3 className="mt-2 text-base font-bold text-[#173B70]">Workforce & Shift Analytics</h3>
          <p className="mt-1 text-xs text-[#4A5568]">
            Monthly staff punctuality rate: 94.6% • Total scheduled shifts: 420 • Relief dispatches: 8
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 max-w-lg mx-auto text-left">
            <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3 text-xs">
              <div className="text-[#718096]">Day Shift Ratio</div>
              <div className="text-base font-bold text-[#173B70] mt-0.5">1 : 7.2</div>
            </div>
            <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3 text-xs">
              <div className="text-[#718096]">Night Shift Ratio</div>
              <div className="text-base font-bold text-[#173B70] mt-0.5">1 : 8.1</div>
            </div>
            <div className="rounded-md border border-[#E6ECF4] bg-[#F4F8FF] p-3 text-xs">
              <div className="text-[#718096]">Leave Utilization</div>
              <div className="text-base font-bold text-emerald-700 mt-0.5">74%</div>
            </div>
          </div>
        </Card>
      )}

      {selectedReport === 'inventory' && (
        <Card className="border-[#E6ECF4] bg-white shadow-xs p-6 text-center">
          <IndianRupee className="mx-auto h-8 w-8 text-[#2457C5]" />
          <h3 className="mt-2 text-base font-bold text-[#173B70]">Pharmacy & Supply Chain Spend</h3>
          <p className="mt-1 text-xs text-[#4A5568]">
            Total on-hand stock valuation: ₹2,48,700 INR • Average order cycle time: 2.8 Days
          </p>
        </Card>
      )}
    </div>
  );
}
