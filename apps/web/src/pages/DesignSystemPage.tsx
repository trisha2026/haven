import { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Users,
  Search,
  Plus,
  Filter,
  Activity,
  BedDouble,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  Layers,
  Palette,
  Eye,
  Sliders,
  FileText,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Select,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Skeleton,
  EmptyState,
} from '../components/ui/index.ts';
import { HAVEN_COLORS } from '../theme/tokens.ts';
import { MOCK_RESIDENTS, MOCK_CARE_LEVELS, MOCK_FACILITY_WINGS } from '../mock/data.ts';

/**
 * Design system reference page (available at /design-system).
 * Showcases tokens and the custom HAVEN component library.
 */
export function DesignSystemPage() {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWing, setSelectedWing] = useState('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'tokens' | 'table-demo'>('overview');

  // Filter residents based on search and wing
  const filteredResidents = MOCK_RESIDENTS.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.careLevel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWing =
      selectedWing === 'all' ||
      (selectedWing === 'garden' && res.wing === 'Garden Terrace') ||
      (selectedWing === 'sunrise' && res.wing === 'Sunrise Pavilion') ||
      (selectedWing === 'orchard' && res.wing === 'Orchard Meadow') ||
      (selectedWing === 'highland' && res.wing === 'Highland Haven');
    return matchesSearch && matchesWing;
  });

  return (
    <div className="min-h-screen bg-haven-blue-50 text-haven-slate-900 flex flex-col font-sans">
      {/* Top Navigation & Brand Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-haven-border shadow-haven-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-haven-blue-700 flex items-center justify-center text-white shadow-haven-sm">
              <Heart className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-bold tracking-tight text-haven-navy-900">HAVEN</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-haven-blue-100 text-haven-blue-700 font-semibold">
                  Design System v2.0
                </span>
              </div>
              <p className="text-xs text-haven-slate-500 tracking-wide font-normal">
                Elderly Care &amp; Facility Management System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-haven-slate-100 p-1 rounded-xl border border-haven-border-light">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-haven-navy-900 shadow-haven-sm'
                  : 'text-haven-slate-500 hover:text-haven-slate-900'
              }`}
            >
              Overview &amp; Tokens
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'components'
                  ? 'bg-white text-haven-navy-900 shadow-haven-sm'
                  : 'text-haven-slate-500 hover:text-haven-slate-900'
              }`}
            >
              Component Gallery
            </button>
            <button
              onClick={() => setActiveTab('table-demo')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'table-demo'
                  ? 'bg-white text-haven-navy-900 shadow-haven-sm'
                  : 'text-haven-slate-500 hover:text-haven-slate-900'
              }`}
            >
              Care Directory Preview
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Badge variant="success" dot size="sm">
              Facility Grid Online
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Hero Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-haven-border shadow-haven-card relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-haven-blue-100 border border-haven-blue-500/20 text-haven-blue-700 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-haven-blue-700" />
              Royal Blue &amp; Ice Blue Design System v2.0
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-haven-navy-900 tracking-tight leading-tight">
              A safer, smarter and more caring place for every resident.
            </h1>
            <p className="text-base sm:text-lg text-haven-slate-500 leading-relaxed">
              HAVEN’s v2.0 design system pairs crisp royal blue clarity with serene ice-blue surfaces
              and calm slate neutrals. Designed for high clinical legibility, accessible focus, and dignified residential comfort.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                    Launch Check-in Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent maxWidth="md">
                  <DialogHeader>
                    <DialogTitle>Resident Care Check-In</DialogTitle>
                    <DialogDescription>
                      Record an observational note, update status, or log a vitals verification.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-2">
                    <Select
                      label="Select Resident"
                      options={MOCK_RESIDENTS.map((r) => ({
                        value: r.id,
                        label: `${r.name} (${r.room})`,
                      }))}
                      defaultValue="RES-041"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Blood Pressure" placeholder="120/80" inputSize="md" />
                      <Input label="Heart Rate (BPM)" placeholder="72" inputSize="md" />
                    </div>

                    <Select
                      label="Current Observation Status"
                      options={[
                        { value: 'active', label: 'Active & Engaged' },
                        { value: 'resting', label: 'Resting Comfortably in Room' },
                        { value: 'dining', label: 'In Communal Dining Pavilion' },
                        { value: 'therapy', label: 'In Physical Therapy Session' },
                      ]}
                      defaultValue="active"
                    />

                    <Input
                      label="Caregiver Clinical Note"
                      placeholder="e.g. Eleanor enjoyed morning garden walk; appetite normal."
                    />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="primary" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                        Save Check-In
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                leftIcon={<Sliders className="w-4 h-4" />}
                onClick={() => setActiveTab('components')}
              >
                Inspect Components
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 1: DESIGN TOKENS & COLOR PALETTE */}
        {(activeTab === 'overview' || activeTab === 'tokens') && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-haven-border pb-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-haven-navy-900 flex items-center gap-2.5">
                  <Palette className="w-6 h-6 text-haven-blue-700" />
                  Design Tokens &amp; Color Palette v2.0
                </h2>
                <p className="text-sm text-haven-slate-500">
                  Approved HAVEN Royal Blue &amp; Ice Blue tokens mapped to Tailwind CSS v4.
                </p>
              </div>
              <Badge variant="default" size="md">
                Royal Blue &amp; Ice Blue System
              </Badge>
            </div>

            {/* Core Brand Swatches */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-haven-slate-500">
                Core Brand Tokens (5)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { name: 'navy-900', hex: HAVEN_COLORS.brand.navy900, desc: 'Brand, Major Headings', textDark: false },
                  { name: 'blue-700', hex: HAVEN_COLORS.brand.blue700, desc: 'Primary Interactive & Focus', textDark: false },
                  { name: 'blue-500', hex: HAVEN_COLORS.brand.blue500, desc: 'Links, Charts, Highlights', textDark: false },
                  { name: 'blue-100', hex: HAVEN_COLORS.brand.blue100, desc: 'Selected States & Secondary', textDark: true },
                  { name: 'blue-50', hex: HAVEN_COLORS.brand.blue50, desc: 'Main App Background', textDark: true },
                ].map((color) => (
                  <div
                    key={color.name}
                    className="rounded-2xl border border-haven-border overflow-hidden bg-white shadow-haven-sm flex flex-col"
                  >
                    <div
                      className="h-28 w-full p-3 flex flex-col justify-end transition-transform hover:scale-[1.02]"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded backdrop-blur-xs w-fit ${
                          color.textDark ? 'text-haven-slate-900 bg-white/80' : 'text-white bg-black/30'
                        }`}
                      >
                        {color.hex}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-sm text-haven-slate-900">{color.name}</h4>
                        <p className="text-xs text-haven-slate-500 mt-0.5">{color.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutral Swatches */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-haven-slate-500">
                Neutral Tokens (7)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { name: 'white', hex: HAVEN_COLORS.neutral.white, desc: 'Sidebar, cards, dialogs', textDark: true },
                  { name: 'slate-50', hex: HAVEN_COLORS.neutral.slate50, desc: 'Subtle sections', textDark: true },
                  { name: 'slate-100', hex: HAVEN_COLORS.neutral.slate100, desc: 'Neutral separators', textDark: true },
                  { name: 'border', hex: HAVEN_COLORS.neutral.border, desc: 'Subtle borders', textDark: true },
                  { name: 'slate-500', hex: HAVEN_COLORS.neutral.slate500, desc: 'Secondary text', textDark: false },
                  { name: 'slate-700', hex: HAVEN_COLORS.neutral.slate700, desc: 'Body text', textDark: false },
                  { name: 'slate-900', hex: HAVEN_COLORS.neutral.slate900, desc: 'Primary text', textDark: false },
                ].map((color) => (
                  <div
                    key={color.name}
                    className="rounded-2xl border border-haven-border overflow-hidden bg-white shadow-haven-sm flex flex-col"
                  >
                    <div
                      className="h-20 w-full p-2.5 flex flex-col justify-end transition-transform hover:scale-[1.02]"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-xs w-fit ${
                          color.textDark ? 'text-haven-slate-900 bg-white/80' : 'text-white bg-black/30'
                        }`}
                      >
                        {color.hex}
                      </span>
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-xs text-haven-slate-900">{color.name}</h4>
                        <p className="text-[11px] text-haven-slate-500 mt-0.5">{color.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic Status Colors */}
            <div className="p-6 rounded-2xl bg-white border border-haven-border space-y-4 shadow-haven-card">
              <h3 className="text-xs font-bold uppercase tracking-wider text-haven-slate-500">
                Calming Semantic Status Accents (Exact bg / fg pairs)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="p-4 rounded-xl bg-haven-success-soft border border-haven-success-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-haven-success uppercase tracking-wider">Success</span>
                    <p className="text-[11px] text-haven-slate-500 mt-0.5">#E8F5EF / #16856B</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-haven-success" />
                </div>
                <div className="p-4 rounded-xl bg-haven-info-soft border border-haven-info-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-haven-info uppercase tracking-wider">Information</span>
                    <p className="text-[11px] text-haven-slate-500 mt-0.5">#EAF2FF / #2457C5</p>
                  </div>
                  <Building2 className="w-5 h-5 text-haven-info" />
                </div>
                <div className="p-4 rounded-xl bg-haven-warning-soft border border-haven-warning-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-haven-warning uppercase tracking-wider">Warning</span>
                    <p className="text-[11px] text-haven-slate-500 mt-0.5">#FFF5E5 / #A96B12</p>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-haven-warning" />
                </div>
                <div className="p-4 rounded-xl bg-haven-danger-soft border border-haven-danger-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-haven-danger uppercase tracking-wider">Critical</span>
                    <p className="text-[11px] text-haven-slate-500 mt-0.5">#FDEDEC / #C84D45</p>
                  </div>
                  <Activity className="w-5 h-5 text-haven-danger" />
                </div>
                <div className="p-4 rounded-xl bg-haven-neutral-soft border border-haven-neutral-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-haven-neutral uppercase tracking-wider">Neutral</span>
                    <p className="text-[11px] text-haven-slate-500 mt-0.5">#F1F5F9 / #64748B</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-haven-neutral" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: COMPONENT GALLERY */}
        {(activeTab === 'overview' || activeTab === 'components') && (
          <section className="space-y-10">
            <div className="border-b border-haven-border pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-haven-navy-900 flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-haven-blue-700" />
                Custom Component System
              </h2>
              <p className="text-sm text-haven-slate-500">
                100% custom crafted with Tailwind CSS v4, TypeScript, React 19, and Lucide React.
              </p>
            </div>

            {/* 1. BUTTONS */}
            <Card variant="default" padding="lg">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <CardTitle>Button System</CardTitle>
                    <CardDescription>
                      6 variants with accessible focus rings, active spring presses, sizes, and loading state.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBtnLoading(!isBtnLoading)}
                  >
                    Toggle Spinner ({isBtnLoading ? 'ON' : 'OFF'})
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Variants */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-haven-slate-500 mb-3">
                    Variants
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" isLoading={isBtnLoading} leftIcon={<Heart className="w-4 h-4" />}>
                      Primary Blue-700
                    </Button>
                    <Button variant="secondary" isLoading={isBtnLoading}>
                      Secondary Blue-100
                    </Button>
                    <Button variant="outline" isLoading={isBtnLoading} leftIcon={<Filter className="w-4 h-4" />}>
                      Outline
                    </Button>
                    <Button variant="subtle" isLoading={isBtnLoading}>
                      Subtle Surface
                    </Button>
                    <Button variant="ghost" isLoading={isBtnLoading}>
                      Ghost
                    </Button>
                    <Button variant="danger" isLoading={isBtnLoading} leftIcon={<AlertTriangle className="w-4 h-4" />}>
                      Critical Alert
                    </Button>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-haven-slate-500 mb-3">
                    Sizes
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small (32px)</Button>
                    <Button size="md">Medium (40px)</Button>
                    <Button size="lg">Large (48px)</Button>
                    <Button size="icon" aria-label="Facility Settings">
                      <Sliders className="w-4 h-4" />
                    </Button>
                    <Button disabled leftIcon={<ShieldCheck className="w-4 h-4" />}>
                      Disabled State
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. BADGES */}
            <Card variant="default" padding="lg">
              <CardHeader>
                <CardTitle>Badge Component</CardTitle>
                <CardDescription>
                  Information tags for care tiers, room statuses, vitals, and facility alerts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="default">Default Blue-100</Badge>
                  <Badge variant="secondary">Secondary Slate</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="success" dot>
                    Active / Resting
                  </Badge>
                  <Badge variant="warning" dot>
                    Check Due
                  </Badge>
                  <Badge variant="danger" dot>
                    Fall Risk
                  </Badge>
                  <Badge variant="info" icon={<Building2 className="w-3.5 h-3.5 mr-1" />}>
                    Memory Wing
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <Badge size="sm" variant="success">
                    Small Tag
                  </Badge>
                  <Badge size="md" variant="default" icon={<Heart className="w-3.5 h-3.5 mr-1 text-haven-blue-700" />}>
                    Care Level: Memory
                  </Badge>
                  <Badge size="md" variant="outline" dot>
                    Assisted Living 2
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* 3. INPUT & SELECT FORM CONTROLS */}
            <Card variant="default" padding="lg">
              <CardHeader>
                <CardTitle>Form Controls: Input & Select</CardTitle>
                <CardDescription>
                  Caregiver data entry with accessible labels, error validations, icons, and keyboard focus states.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Input
                  label="Resident Search"
                  placeholder="Search by name, room or wing..."
                  leftIcon={<Search className="w-4 h-4" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  helperText="Search records dynamically"
                />

                <Select
                  label="Facility Wing"
                  leftIcon={<Building2 className="w-4 h-4" />}
                  options={MOCK_FACILITY_WINGS}
                  value={selectedWing}
                  onChange={(e) => setSelectedWing(e.target.value)}
                  helperText="Filter by residential zone"
                />

                <Input
                  label="Emergency Contact"
                  placeholder="+91 98450 12834"
                  required
                  error="Valid phone format required"
                />

                <Input
                  label="Care Tier"
                  defaultValue="Level 3 - Memory Support"
                  disabled
                  helperText="Locked by head physician"
                />

                <Select
                  label="Care Plan Tier"
                  options={MOCK_CARE_LEVELS}
                  defaultValue="assisted"
                  helperText="Select personalized care protocol"
                />

                <Input
                  label="Last Vital Recorded"
                  placeholder="120/80 mmHg"
                  inputSize="md"
                  rightIcon={<Activity className="w-4 h-4 text-haven-success" />}
                  helperText="Recorded by Nurse Chen at 14:30"
                />
              </CardContent>
            </Card>

            {/* 4. CARDS & ELEVATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default" interactive>
                <CardHeader action={<Badge variant="success">Room 204</Badge>}>
                  <CardTitle>Ananya Sharma</CardTitle>
                  <CardDescription>Sunrise Pavilion • Assisted Living</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-haven-slate-500">
                    <Clock className="w-4 h-4 text-haven-slate-500" />
                    <span>Last medication check: 15 mins ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-haven-slate-500">
                    <Heart className="w-4 h-4 text-haven-danger" />
                    <span>Heart rate: 72 bpm (Normal)</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-haven-slate-500">Primary: Priya Shetty, RN</span>
                  <Button variant="ghost" size="sm" rightIcon={<Eye className="w-3.5 h-3.5" />}>
                    Profile
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="elevated" interactive>
                <CardHeader action={<Badge variant="warning" dot>Routine Check</Badge>}>
                  <CardTitle>Vikram Hegde</CardTitle>
                  <CardDescription>Garden Terrace • Memory Care</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-haven-slate-500">
                    <BedDouble className="w-4 h-4 text-haven-slate-500" />
                    <span>Resting in quarters</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-haven-slate-500">
                    <Activity className="w-4 h-4 text-haven-warning" />
                    <span>Hydration assistance requested</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-haven-slate-500">Primary: Rahul Patil, LPN</span>
                  <Button variant="ghost" size="sm" rightIcon={<Eye className="w-3.5 h-3.5" />}>
                    Profile
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="subtle">
                <CardHeader action={<Badge variant="info">Room 108-A</Badge>}>
                  <CardTitle>Raghavendra Kulkarni</CardTitle>
                  <CardDescription>Orchard Meadow • Skilled Nursing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-haven-slate-500">
                    <Calendar className="w-4 h-4 text-haven-slate-500" />
                    <span>Physical therapy at 15:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-haven-slate-500">
                    <ShieldCheck className="w-4 h-4 text-haven-success" />
                    <span>All dietary protocols verified</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-haven-slate-500">Primary: Deepak Gowda, NP</span>
                  <Button variant="ghost" size="sm" rightIcon={<Eye className="w-3.5 h-3.5" />}>
                    Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* 5. SKELETON LOADERS */}
            <Card variant="default" padding="lg">
              <CardHeader>
                <CardTitle>Skeleton Component</CardTitle>
                <CardDescription>
                  Warm shimmering placeholders that avoid jarring clinical loading flickers.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile card skeleton */}
                <div className="p-6 rounded-2xl border border-haven-border bg-haven-slate-50 space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton variant="circular" width={48} height={48} />
                    <div className="space-y-2 flex-1">
                      <Skeleton variant="text" width="60%" height={16} />
                      <Skeleton variant="text" width="40%" height={12} />
                    </div>
                  </div>
                  <Skeleton variant="rectangular" height={54} />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton variant="text" width="30%" height={12} />
                    <Skeleton variant="text" width="20%" height={28} />
                  </div>
                </div>

                {/* Table lines skeleton */}
                <div className="p-6 rounded-2xl border border-haven-border bg-haven-slate-50 space-y-3">
                  <Skeleton variant="text" width="40%" height={18} className="mb-4" />
                  <Skeleton variant="text" height={14} />
                  <Skeleton variant="text" height={14} width="90%" />
                  <Skeleton variant="text" height={14} width="75%" />
                  <Skeleton variant="text" height={14} width="85%" />
                </div>
              </CardContent>
            </Card>

            {/* 6. EMPTY STATES */}
            <Card variant="default" padding="lg">
              <CardHeader>
                <CardTitle>EmptyState Component</CardTitle>
                <CardDescription>
                  Dignified and reassuring placeholders for empty queues, reports, or lists.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmptyState
                  icon={<ShieldCheck className="text-haven-success" />}
                  title="No Unresolved Incidents"
                  description="All resident care plans and facility safety protocols are currently in optimal compliance."
                  action={
                    <Button variant="subtle" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
                      View Compliance Log
                    </Button>
                  }
                />

                <EmptyState
                  compact
                  icon={<Heart className="text-haven-blue-700" />}
                  title="Daily Vitals Complete"
                  description="All afternoon check-ins for the Garden Terrace pavilion have been logged."
                  action={
                    <Button variant="primary" size="sm">
                      Record New Vital
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </section>
        )}

        {/* SECTION 3: RESIDENT CARE DIRECTORY (TABLE DEMO) */}
        {(activeTab === 'overview' || activeTab === 'table-demo') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-haven-border pb-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-haven-navy-900 flex items-center gap-2.5">
                  <Users className="w-6 h-6 text-haven-blue-700" />
                  Resident Care Directory (Table Demo)
                </h2>
                <p className="text-sm text-haven-slate-500">
                  Demonstrating Table, TableHeader, TableRow, TableCell, Badges, and filter controls.
                </p>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:w-72">
                <Input
                  placeholder="Filter by name, room or care..."
                  leftIcon={<Search className="w-4 h-4" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  inputSize="sm"
                />
              </div>
              <div className="w-full sm:w-60">
                <Select
                  options={MOCK_FACILITY_WINGS}
                  value={selectedWing}
                  onChange={(e) => setSelectedWing(e.target.value)}
                  selectSize="sm"
                />
              </div>
              <div className="text-xs text-haven-slate-500 ml-auto">
                Showing {filteredResidents.length} of {MOCK_RESIDENTS.length} residents
              </div>
            </div>

            {/* Table Component */}
            {filteredResidents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resident</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Care Tier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Primary Caregiver</TableHead>
                    <TableHead>Last Vital Check</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResidents.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell className="font-medium text-haven-slate-900">
                        <div>
                          <div className="font-semibold">{res.name}</div>
                          <div className="text-xs text-haven-slate-500">
                            Age {res.age} • &quot;{res.preferredName}&quot;
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-haven-slate-900">
                          <BedDouble className="w-3.5 h-3.5 text-haven-slate-500" />
                          <span>{res.room}</span>
                        </div>
                        <div className="text-[11px] text-haven-slate-500">{res.wing}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            res.careLevel === 'Memory Care'
                              ? 'info'
                              : res.careLevel === 'Assisted Living'
                              ? 'default'
                              : res.careLevel === 'Skilled Nursing'
                              ? 'warning'
                              : 'secondary'
                          }
                          size="sm"
                        >
                          {res.careLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            res.status === 'active'
                              ? 'success'
                              : res.status === 'in-clinic'
                              ? 'warning'
                              : res.status === 'resting'
                              ? 'secondary'
                              : 'outline'
                          }
                          dot
                          size="sm"
                        >
                          {res.status === 'active'
                            ? 'Active'
                            : res.status === 'in-clinic'
                            ? 'In Clinic'
                            : res.status === 'resting'
                            ? 'Resting'
                            : 'With Family'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-haven-slate-500">
                        {res.primaryNurse}
                      </TableCell>
                      <TableCell className="text-xs text-haven-slate-900">
                        <div className="flex items-center gap-1 text-haven-slate-500">
                          <Clock className="w-3 h-3 text-haven-slate-500" />
                          <span>{res.lastCheckIn}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Check In
                            </Button>
                          </DialogTrigger>
                          <DialogContent maxWidth="md">
                            <DialogHeader>
                              <DialogTitle>Quick Check-In: {res.name}</DialogTitle>
                              <DialogDescription>
                                {res.room} • {res.wing} ({res.careLevel})
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                              <Input
                                label="Vital Check Note"
                                placeholder="Normal respiration, comfortable and alert."
                              />
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button variant="primary">Record</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState
                icon={<Search className="text-haven-slate-500" />}
                title="No residents match criteria"
                description={`No active resident found for "${searchQuery}" in the selected facility wing.`}
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedWing('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                }
              />
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-haven-border bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-haven-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-haven-blue-700 text-white flex items-center justify-center font-bold text-[10px]">
              H
            </div>
            <span>
              <strong className="text-haven-navy-900">HAVEN</strong> — Elderly Care &amp; Facility Management System
            </span>
          </div>
          <p className="italic">
            &quot;A safer, smarter and more caring place for every resident.&quot;
          </p>
          <div>Frontend Design System v2.0 • Tailwind CSS v4 • React 19</div>
        </div>
      </footer>
    </div>
  );
}

