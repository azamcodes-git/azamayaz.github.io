import { useId, type ReactNode } from 'react';
import type { FieldDef } from './schema';

/* ------------------------------------------------------------------ */
/* Dot-path helpers                                                    */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPath(obj: any, path: string): any {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setPath(obj: any, path: string, value: unknown): void {
  const keys = path.split('.');
  const last = keys.pop()!;
  let target = obj;
  for (const k of keys) {
    if (target[k] == null || typeof target[k] !== 'object') target[k] = {};
    target = target[k];
  }
  target[last] = value;
}

/* ------------------------------------------------------------------ */
/* Field primitives — uncontrolled, commit on blur/change so typing    */
/* stays smooth. Parent keys the form per item to remount defaults.    */
/* ------------------------------------------------------------------ */

function Shell({ id, label, hint, children }: { id: string; label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-subtle">{hint}</p>}
    </div>
  );
}

interface CommitProps<T> {
  label: string;
  hint?: string;
  value: T;
  onCommit: (v: T) => void;
}

export function TextField({ label, hint, value, onCommit }: CommitProps<string>) {
  const id = useId();
  return (
    <Shell id={id} label={label} hint={hint}>
      <input id={id} type="text" defaultValue={value ?? ''} onBlur={(e) => onCommit(e.target.value)} className="field" />
    </Shell>
  );
}

export function TextAreaField({ label, hint, value, onCommit, rows = 4 }: CommitProps<string> & { rows?: number }) {
  const id = useId();
  return (
    <Shell id={id} label={label} hint={hint}>
      <textarea id={id} rows={rows} defaultValue={value ?? ''} onBlur={(e) => onCommit(e.target.value)} className="field resize-y" />
    </Shell>
  );
}

export function NumberField({ label, hint, value, onCommit }: CommitProps<number>) {
  const id = useId();
  return (
    <Shell id={id} label={label} hint={hint}>
      <input
        id={id}
        type="number"
        defaultValue={Number.isFinite(value) ? value : ''}
        onBlur={(e) => onCommit(parseInt(e.target.value, 10) || 0)}
        className="field"
      />
    </Shell>
  );
}

export function CheckboxField({ label, hint, value, onCommit }: CommitProps<boolean>) {
  const id = useId();
  return (
    <div className="flex items-center gap-3 pt-7">
      <input
        id={id}
        type="checkbox"
        defaultChecked={!!value}
        onChange={(e) => onCommit(e.target.checked)}
        className="h-4 w-4 accent-[rgb(var(--brand))]"
      />
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {hint && <span className="text-xs text-subtle">{hint}</span>}
    </div>
  );
}

export function SelectField({ label, hint, value, options, onCommit }: CommitProps<string> & { options: string[] }) {
  const id = useId();
  return (
    <Shell id={id} label={label} hint={hint}>
      <select id={id} defaultValue={value ?? options[0]} onChange={(e) => onCommit(e.target.value)} className="field">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Shell>
  );
}

/** string[] <-> one-entry-per-line textarea. */
export function LinesField({ label, hint, value, onCommit, rows = 5 }: CommitProps<string[]> & { rows?: number }) {
  const id = useId();
  const text = (value ?? []).join('\n');
  return (
    <Shell id={id} label={label} hint={hint ?? 'One entry per line.'}>
      <textarea
        id={id}
        rows={rows}
        defaultValue={text}
        onBlur={(e) =>
          onCommit(
            e.target.value
              .split('\n')
              .map((l) => l.trim())
              .filter(Boolean),
          )
        }
        className="field resize-y font-mono text-xs leading-relaxed"
      />
    </Shell>
  );
}

/** object[] <-> "a | b | c" lines with the given keys. */
export function PairsField({
  label,
  hint,
  value,
  keys,
  onCommit,
  rows = 5,
}: CommitProps<Record<string, string>[]> & { keys: string[]; rows?: number }) {
  const id = useId();
  const text = (value ?? []).map((it) => keys.map((k) => String(it?.[k] ?? '')).join(' | ')).join('\n');
  const parse = (t: string) =>
    t
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split('|').map((s) => s.trim());
        return Object.fromEntries(keys.map((k, i) => [k, parts[i] ?? ''])) as Record<string, string>;
      });
  return (
    <Shell id={id} label={label} hint={hint ?? `One per line — format: ${keys.join(' | ')}`}>
      <textarea
        id={id}
        rows={rows}
        defaultValue={text}
        onBlur={(e) => onCommit(parse(e.target.value))}
        className="field resize-y font-mono text-xs leading-relaxed"
      />
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Schema-driven form                                                  */
/* ------------------------------------------------------------------ */

interface SchemaFormProps {
  fields: FieldDef[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  onChange: (path: string, value: unknown) => void;
}

export function SchemaForm({ fields, item, onChange }: SchemaFormProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => {
        const value = getPath(item, f.path);
        const commit = (v: unknown) => onChange(f.path, v);
        const wide = f.type === 'textarea' || f.type === 'lines' || f.type === 'pairs';
        return (
          <div key={f.path} className={wide ? 'sm:col-span-2' : undefined}>
            {f.type === 'text' && <TextField label={f.label} hint={f.hint} value={value ?? ''} onCommit={commit} />}
            {f.type === 'textarea' && (
              <TextAreaField label={f.label} hint={f.hint} value={value ?? ''} rows={f.rows} onCommit={commit} />
            )}
            {f.type === 'number' && <NumberField label={f.label} hint={f.hint} value={value ?? 0} onCommit={commit} />}
            {f.type === 'checkbox' && (
              <CheckboxField label={f.label} hint={f.hint} value={!!value} onCommit={commit} />
            )}
            {f.type === 'select' && (
              <SelectField label={f.label} hint={f.hint} value={value ?? ''} options={f.options} onCommit={commit} />
            )}
            {f.type === 'lines' && (
              <LinesField label={f.label} hint={f.hint} value={value ?? []} rows={f.rows} onCommit={commit} />
            )}
            {f.type === 'pairs' && (
              <PairsField label={f.label} hint={f.hint} value={value ?? []} keys={f.keys} rows={f.rows} onCommit={commit} />
            )}
          </div>
        );
      })}
    </div>
  );
}
