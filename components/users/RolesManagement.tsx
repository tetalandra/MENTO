'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/ui/icons';

type RoleName = 'Student' | 'Teacher' | 'Admin';
type PanelSide = 'available' | 'given';

interface PermissionCategory {
  id: string;
  label: string;
  actions: string[];
}

/** Each module has related sub-permissions shown in the flyout (Appointments match the design exactly). */
const PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    id: 'user-management',
    label: 'User Management',
    actions: ['View Details', 'Create', 'Edit', 'Deactivate', 'Assign Role'],
  },
  {
    id: 'report-session',
    label: 'Report & Session Management',
    actions: ['View Details', 'Create', 'Export', 'Delete', 'Archive'],
  },
  {
    id: 'template',
    label: 'Template Management',
    actions: ['View Details', 'Create', 'Edit', 'Delete', 'Duplicate'],
  },
  {
    id: 'recording',
    label: 'Session Recording',
    actions: ['View Details', 'Record', 'Review', 'Delete', 'Share'],
  },
  {
    id: 'appointments',
    label: 'Appointments Management',
    actions: ['View Details', 'Request', 'Cancel', 'Approve', 'Reschedule'],
  },
  {
    id: 'ai-reports',
    label: 'Reports Generation with AI',
    actions: ['View Details', 'Generate', 'Export', 'Regenerate', 'Delete'],
  },
  {
    id: 'profile-matching',
    label: 'Profile Matching',
    actions: ['View Details', 'Match', 'Unmatch', 'Approve', 'Request'],
  },
  {
    id: 'analytics',
    label: 'System Analytics',
    actions: ['View Details', 'View Dashboard', 'Export', 'Filter', 'Share'],
  },
  {
    id: 'settings',
    label: 'Settings',
    actions: ['View Details', 'Edit', 'Reset', 'Notifications', 'Security'],
  },
];

const DEFAULT_GIVEN: Record<RoleName, string[]> = {
  Student: ['appointments', 'profile-matching', 'settings'],
  Teacher: [
    'report-session',
    'recording',
    'appointments',
    'ai-reports',
    'profile-matching',
    'settings',
  ],
  Admin: PERMISSION_CATEGORIES.map(c => c.id),
};

function TransferButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 min-w-10 items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 font-urbanist text-sm font-semibold text-mento-navy transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      aria-label={label}
    >
      {label}
    </button>
  );
}

function FilterInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Icon
        name="search"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
      />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Filter"
        className="h-10 w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-mento-navy"
      />
    </div>
  );
}

function SubPermissionCheckbox({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm text-gray-800 transition hover:bg-[#f0f1f4]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 shrink-0 appearance-none rounded-[4px] border border-gray-300 bg-white checked:border-mento-navy checked:bg-mento-navy"
        style={{
          backgroundImage: checked
            ? "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E\")"
            : undefined,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <span>{label}</span>
    </label>
  );
}

function PermissionRow({
  category,
  selected,
  expanded,
  checkedActions,
  onToggleSelect,
  onToggleExpand,
  onToggleAction,
}: {
  category: PermissionCategory;
  selected: boolean;
  expanded: boolean;
  checkedActions: Set<string>;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
  onToggleAction: (action: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => {
          onToggleExpand();
          if (!selected) onToggleSelect();
        }}
        aria-expanded={expanded}
        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${
          selected || expanded
            ? 'bg-[#e8ecf4] font-medium text-mento-navy'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span>{category.label}</span>
        <Icon
          name="chevron-down"
          className={`size-3.5 shrink-0 text-gray-400 transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="relative z-10 ml-2 mt-1 mb-2 w-[min(100%,200px)] rounded-lg border border-gray-200 bg-white py-1.5 shadow-[0_8px_24px_rgba(26,38,74,0.12)]">
          {category.actions.map(action => (
            <SubPermissionCheckbox
              key={action}
              label={action}
              checked={checkedActions.has(action)}
              onChange={() => onToggleAction(action)}
            />
          ))}
        </div>
      )}
    </li>
  );
}

export function RolesManagement() {
  const [selectedRole, setSelectedRole] = useState<RoleName>('Student');
  const [givenByRole, setGivenByRole] = useState<Record<RoleName, string[]>>(() => ({
    Student: [...DEFAULT_GIVEN.Student],
    Teacher: [...DEFAULT_GIVEN.Teacher],
    Admin: [...DEFAULT_GIVEN.Admin],
  }));
  const [availableSelected, setAvailableSelected] = useState<Set<string>>(new Set());
  const [givenSelected, setGivenSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<{ side: PanelSide; id: string } | null>({
    side: 'available',
    id: 'appointments',
  });
  const [checkedActions, setCheckedActions] = useState<Record<string, Set<string>>>({});
  const [availableFilter, setAvailableFilter] = useState('');
  const [givenFilter, setGivenFilter] = useState('');
  const [showAllAvailable, setShowAllAvailable] = useState(false);
  const [showAllGiven, setShowAllGiven] = useState(false);

  const givenIds = givenByRole[selectedRole];

  const availableCategories = useMemo(() => {
    const q = availableFilter.trim().toLowerCase();
    return PERMISSION_CATEGORIES.filter(c => !q || c.label.toLowerCase().includes(q));
  }, [availableFilter]);

  const givenCategories = useMemo(() => {
    const q = givenFilter.trim().toLowerCase();
    return PERMISSION_CATEGORIES.filter(
      c => givenIds.includes(c.id) && (!q || c.label.toLowerCase().includes(q)),
    );
  }, [givenFilter, givenIds]);

  const visibleAvailable = showAllAvailable
    ? availableCategories
    : availableCategories.slice(0, 9);
  const visibleGiven = showAllGiven ? givenCategories : givenCategories;

  function selectRole(role: RoleName) {
    setSelectedRole(role);
    setAvailableSelected(new Set());
    setGivenSelected(new Set());
    setExpanded(null);
  }

  function toggleAvailable(id: string) {
    setAvailableSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleGiven(id: string) {
    setGivenSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleExpand(side: PanelSide, id: string) {
    setExpanded(prev => (prev?.side === side && prev.id === id ? null : { side, id }));
  }

  function moveRight() {
    if (availableSelected.size === 0) return;
    setGivenByRole(prev => {
      const existing = new Set(prev[selectedRole]);
      for (const id of availableSelected) existing.add(id);
      return { ...prev, [selectedRole]: [...existing] };
    });
    setAvailableSelected(new Set());
  }

  function moveAllRight() {
    setGivenByRole(prev => ({
      ...prev,
      [selectedRole]: PERMISSION_CATEGORIES.map(c => c.id),
    }));
    setAvailableSelected(new Set());
  }

  function moveLeft() {
    if (givenSelected.size === 0) return;
    setGivenByRole(prev => ({
      ...prev,
      [selectedRole]: prev[selectedRole].filter(id => !givenSelected.has(id)),
    }));
    setGivenSelected(new Set());
  }

  function moveAllLeft() {
    setGivenByRole(prev => ({ ...prev, [selectedRole]: [] }));
    setGivenSelected(new Set());
  }

  function toggleAction(categoryId: string, action: string) {
    setCheckedActions(prev => {
      const current = new Set(prev[categoryId] ?? []);
      if (current.has(action)) current.delete(action);
      else current.add(action);
      return { ...prev, [categoryId]: current };
    });
  }

  function resetConfig() {
    setGivenByRole({
      Student: [...DEFAULT_GIVEN.Student],
      Teacher: [...DEFAULT_GIVEN.Teacher],
      Admin: [...DEFAULT_GIVEN.Admin],
    });
    setAvailableSelected(new Set());
    setGivenSelected(new Set());
    setCheckedActions({});
    setExpanded({ side: 'available', id: 'appointments' });
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(26,38,74,0.04)] md:p-8">
        <div className="mb-6">
          <h2 className="font-urbanist text-2xl font-bold tracking-tight text-mento-navy">Roles</h2>
          <button
            type="button"
            className="mt-1 font-urbanist text-sm font-semibold text-[#2f6fed] transition hover:underline"
          >
            + Create new Role
          </button>
        </div>

        <div className="mb-8 max-w-[220px]">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="border-b border-gray-200 bg-[#f3f4f6] px-4 py-2.5 text-sm font-semibold text-mento-navy">
              Roles
            </div>
            {(['Student', 'Teacher', 'Admin'] as RoleName[]).map(role => (
              <button
                key={role}
                type="button"
                onClick={() => selectRole(role)}
                className={`block w-full border-b border-gray-100 px-4 py-2.5 text-left text-sm last:border-b-0 ${
                  selectedRole === role
                    ? 'bg-[#e8eaef] font-semibold text-mento-navy'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
          {/* Access Permission */}
          <div className="relative min-w-0 overflow-visible rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
              <h3 className="font-urbanist text-sm font-bold text-mento-navy">Access Permission</h3>
              <button
                type="button"
                onClick={() => setShowAllAvailable(v => !v)}
                className="shrink-0 text-xs font-bold uppercase tracking-wide text-[#2f6fed] hover:underline"
              >
                {showAllAvailable ? 'SHOW LESS' : 'SHOW ALL 18'}
              </button>
            </div>
            <div className="space-y-3 overflow-visible p-3">
              <FilterInput value={availableFilter} onChange={setAvailableFilter} />
              <ul className="space-y-0.5 overflow-visible">
                {visibleAvailable.map(cat => (
                  <PermissionRow
                    key={cat.id}
                    category={cat}
                    selected={availableSelected.has(cat.id)}
                    expanded={expanded?.side === 'available' && expanded.id === cat.id}
                    checkedActions={checkedActions[cat.id] ?? new Set()}
                    onToggleSelect={() => toggleAvailable(cat.id)}
                    onToggleExpand={() => toggleExpand('available', cat.id)}
                    onToggleAction={action => toggleAction(cat.id, action)}
                  />
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 py-2 lg:flex-col lg:gap-2.5 lg:pt-24">
            <TransferButton label=">" onClick={moveRight} disabled={availableSelected.size === 0} />
            <TransferButton label=">>" onClick={moveAllRight} />
            <TransferButton label="<" onClick={moveLeft} disabled={givenSelected.size === 0} />
            <TransferButton label="<<" onClick={moveAllLeft} disabled={givenIds.length === 0} />
          </div>

          {/* Given Access Permission */}
          <div className="relative min-w-0 overflow-visible rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
              <h3 className="font-urbanist text-sm font-bold text-mento-navy">
                Given Access Permission
              </h3>
              <button
                type="button"
                onClick={() => setShowAllGiven(v => !v)}
                className="shrink-0 text-xs font-bold uppercase tracking-wide text-[#2f6fed] hover:underline"
              >
                {showAllGiven ? 'SHOW LESS' : 'SHOW ALL 20'}
              </button>
            </div>
            <div className="space-y-3 overflow-visible p-3">
              <FilterInput value={givenFilter} onChange={setGivenFilter} />
              <ul className="space-y-0.5 overflow-visible">
                {visibleGiven.map(cat => (
                  <PermissionRow
                    key={cat.id}
                    category={cat}
                    selected={givenSelected.has(cat.id)}
                    expanded={expanded?.side === 'given' && expanded.id === cat.id}
                    checkedActions={checkedActions[cat.id] ?? new Set()}
                    onToggleSelect={() => toggleGiven(cat.id)}
                    onToggleExpand={() => toggleExpand('given', cat.id)}
                    onToggleAction={action => toggleAction(cat.id, action)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={resetConfig}
            className="inline-flex h-11 items-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-semibold text-mento-navy transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-lg bg-mento-navy px-6 text-sm font-semibold text-white transition hover:bg-[#152038]"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </section>
  );
}
