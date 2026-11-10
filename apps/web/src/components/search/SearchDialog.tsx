import { useMemo, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import {
  Search,
  X,
  FileText,
  Users,
  HeartHandshake,
  BedDouble,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import type { UserRole } from '../../types/navigation.ts';
import {
  buildSearchIndex,
  SEARCH_SUGGESTIONS,
  SEARCH_TYPE_LABELS,
  type SearchResult,
  type SearchResultType,
} from '../../mock/search.ts';
import { useEscapeKey, useBodyScrollLock } from '../../hooks/useDismiss.ts';
import { useFocusTrap } from '../../hooks/useFocusTrap.ts';
import { cn } from '../../utils/cn.ts';

export interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: UserRole;
}

const TYPE_ICONS: Record<SearchResultType, React.ElementType> = {
  page: FileText,
  resident: Users,
  staff: HeartHandshake,
  room: BedDouble,
};

interface SearchModalProps {
  role: UserRole;
  onClose: () => void;
}

function SearchModal({ role, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const searchIndex = useMemo(() => buildSearchIndex(role), [role]);
  const suggestions = SEARCH_SUGGESTIONS[role] ?? [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Filter results by query
  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return searchIndex.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchSubtitle = item.subtitle.toLowerCase().includes(trimmed);
      const matchKeywords = item.keywords.includes(trimmed);
      return matchTitle || matchSubtitle || matchKeywords;
    });
  }, [query, searchIndex]);

  // Group filtered results by type
  const groupedResults = useMemo(() => {
    const groups: { type: SearchResultType; items: SearchResult[] }[] = [];
    const order: SearchResultType[] = ['page', 'resident', 'staff', 'room'];

    for (const type of order) {
      const items = filteredResults.filter((r) => r.type === type);
      if (items.length > 0) {
        groups.push({ type, items });
      }
    }
    return groups;
  }, [filteredResults]);

  // Flattened items for keyboard index selection
  const flatItems = useMemo(() => {
    return groupedResults.flatMap((g) => g.items);
  }, [groupedResults]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < flatItems.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : flatItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatItems[selectedIndex]) {
        handleSelect(flatItems[selectedIndex]);
      }
    }
  };

  const handleSelect = (result: SearchResult) => {
    onClose();
    navigate(result.href);
  };

  useEscapeKey(onClose, true);
  useBodyScrollLock(true);
  useFocusTrap(containerRef, true);

  let currentIndexTracker = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20" role="presentation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-haven-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Modal */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Global Search"
        className={cn(
          'relative w-full max-w-2xl bg-white rounded-2xl border border-haven-border shadow-haven-modal',
          'flex flex-col overflow-hidden text-haven-slate-900 animate-scale-in focus:outline-none'
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-haven-border px-4 py-3 sm:px-5">
          <Search className="w-5 h-5 text-haven-slate-500 shrink-0 mr-3" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={flatItems.length > 0}
            aria-controls="search-results-list"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search residents, wings, staff, modules, protocols..."
            className="w-full bg-transparent text-haven-slate-900 placeholder:text-haven-slate-500/60 text-base focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                handleQueryChange('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-haven-slate-500 hover:text-haven-slate-900 hover:bg-haven-slate-100 transition-colors mr-2 cursor-pointer"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-medium text-haven-slate-500 bg-haven-slate-50 border border-haven-border rounded">
            ESC
          </kbd>
        </div>

        {/* Content Area */}
        <div id="search-results-list" className="max-h-[60vh] overflow-y-auto haven-scroll p-4 space-y-4">
          {/* Empty query: Show Suggestions & Quick Prompts */}
          {!query.trim() && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-haven-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-haven-blue-700" />
                <span>Suggested Searches for your role</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      handleQueryChange(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-haven-slate-50 border border-haven-border text-haven-slate-700 hover:bg-haven-blue-100 hover:border-haven-blue-500/40 hover:text-haven-blue-700 transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-haven-border-light">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-haven-slate-500 mb-2">
                  Quick Navigation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {searchIndex.slice(0, 4).map((item) => {
                    const Icon = TYPE_ICONS[item.type];
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-haven-border-light bg-haven-slate-50/60 hover:bg-haven-blue-50/70 text-left transition-colors cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-haven-slate-100 text-haven-slate-700 flex items-center justify-center shrink-0 group-hover:bg-haven-blue-700 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-haven-slate-900 truncate">{item.title}</p>
                          <p className="text-xs text-haven-slate-500 truncate">{item.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Results matching query */}
          {query.trim() && groupedResults.length > 0 && (
            <div className="space-y-4">
              {groupedResults.map((group) => (
                <div key={group.type} className="space-y-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-haven-slate-500 px-2">
                    {SEARCH_TYPE_LABELS[group.type]}
                  </h4>
                  <div className="space-y-1">
                    {group.items.map((result) => {
                      const itemIndex = currentIndexTracker++;
                      const isSelected = itemIndex === selectedIndex;
                      const Icon = TYPE_ICONS[result.type];

                      return (
                        <div
                          key={result.id}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIndex(itemIndex)}
                          className={cn(
                            'flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-colors text-left',
                            isSelected
                              ? 'bg-haven-blue-100 text-haven-slate-900 shadow-haven-sm'
                              : 'hover:bg-haven-slate-100 text-haven-slate-700'
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                                isSelected
                                  ? 'bg-haven-blue-700 text-white'
                                  : 'bg-haven-slate-100 text-haven-slate-500'
                              )}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-haven-slate-900 truncate">
                                {result.title}
                              </p>
                              <p className="text-xs text-haven-slate-500 truncate">
                                {result.subtitle}
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <CornerDownLeft className="w-4 h-4 text-haven-blue-700 shrink-0 mr-1" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty search results */}
          {query.trim() && groupedResults.length === 0 && (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-haven-slate-100 text-haven-slate-500 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-haven-slate-900">
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-haven-slate-500 max-w-xs mx-auto">
                Try searching for resident names, room numbers, medication protocols, or staff members.
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-haven-border bg-haven-slate-50/80 px-4 py-2.5 text-xs text-haven-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-haven-border font-mono text-[10px] text-haven-slate-700">
                <ArrowUp className="w-2.5 h-2.5 inline" />
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-haven-border font-mono text-[10px] text-haven-slate-700">
                <ArrowDown className="w-2.5 h-2.5 inline" />
              </kbd>
              <span className="ml-1">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-haven-border font-mono text-[10px] text-haven-slate-700">
                ↵
              </kbd>
              <span className="ml-1">Select</span>
            </span>
          </div>
          <span className="text-[11px]">HAVEN Search Index</span>
        </div>
      </div>
    </div>
  );
}

export function SearchDialog({ open, onOpenChange, role }: SearchDialogProps) {
  if (!open) return null;

  return createPortal(
    <SearchModal role={role} onClose={() => onOpenChange(false)} />,
    document.body
  );
}
