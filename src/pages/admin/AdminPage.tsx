import { useCallback, useEffect, useRef, useState } from 'react';
import { Seo } from '@/components/Seo';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/cn';
import { contentSnapshot, type ContentData } from '@/lib/content';
import {
  ACTIONS_URL,
  CONTENT_PATH,
  GH_OWNER,
  GH_REPO,
  ghGetContentFile,
  ghPutContentFile,
  ghUser,
} from '@/lib/github';
import { collections, siteFields, type CollectionDef } from './schema';
import { SchemaForm, setPath } from './fields';

const TOKEN_KEY = 'aa-gh-token';
const DRAFT_KEY = 'aa-admin-draft';

type Banner = { kind: 'ok' | 'err' | 'info'; text: string } | null;

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) ?? '');
  const [login, setLogin] = useState<string | null>(null);
  const [content, setContent] = useState<ContentData | null>(null);
  const [tab, setTab] = useState<string>('site');
  const [selected, setSelected] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [fromDraft, setFromDraft] = useState(false);
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<Banner>(null);
  const tokenInput = useRef<HTMLInputElement>(null);

  // Keep the admin panel out of search engines.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const loadFromGitHub = useCallback(async (tok: string) => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        setContent(JSON.parse(draft) as ContentData);
        setFromDraft(true);
        setDirty(true);
        return;
      } catch {
        localStorage.removeItem(DRAFT_KEY);
      }
    }
    const remote = await ghGetContentFile(tok);
    if (remote) {
      setContent(JSON.parse(remote.text) as ContentData);
    } else {
      // First run — seed the editor with the content currently bundled in the site.
      setContent(contentSnapshot());
      setBanner({
        kind: 'info',
        text: 'No content.json in the repo yet — showing the current site content. Your first publish will create it.',
      });
    }
  }, []);

  const connect = useCallback(
    async (tok: string) => {
      setBusy(true);
      setBanner(null);
      try {
        const user = await ghUser(tok);
        localStorage.setItem(TOKEN_KEY, tok);
        setToken(tok);
        setLogin(user.login);
        await loadFromGitHub(tok);
      } catch (e) {
        setBanner({ kind: 'err', text: `Could not connect: ${e instanceof Error ? e.message : e}` });
        setLogin(null);
      } finally {
        setBusy(false);
      }
    },
    [loadFromGitHub],
  );

  // Auto-connect with a previously saved token.
  useEffect(() => {
    if (token) void connect(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((fn: (draft: ContentData) => void) => {
    setContent((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      fn(next);
      localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      return next;
    });
    setDirty(true);
  }, []);

  const publish = async () => {
    if (!content) return;
    setBusy(true);
    setBanner(null);
    try {
      const remote = await ghGetContentFile(token); // fresh sha avoids conflicts
      await ghPutContentFile(token, JSON.stringify(content, null, 2), remote?.sha);
      localStorage.removeItem(DRAFT_KEY);
      setDirty(false);
      setFromDraft(false);
      setBanner({
        kind: 'ok',
        text: 'Published! The site is rebuilding and will be live in ~2 minutes.',
      });
    } catch (e) {
      setBanner({ kind: 'err', text: `Publish failed: ${e instanceof Error ? e.message : e}` });
    } finally {
      setBusy(false);
    }
  };

  const discardDraft = async () => {
    localStorage.removeItem(DRAFT_KEY);
    setDirty(false);
    setFromDraft(false);
    setContent(null);
    setBusy(true);
    try {
      const remote = await ghGetContentFile(token);
      setContent(remote ? (JSON.parse(remote.text) as ContentData) : contentSnapshot());
      setBanner({ kind: 'info', text: 'Draft discarded — reloaded the published content.' });
    } catch (e) {
      setBanner({ kind: 'err', text: `Reload failed: ${e instanceof Error ? e.message : e}` });
    } finally {
      setBusy(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setLogin(null);
    setContent(null);
  };

  const backupHref = content
    ? `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(content, null, 2))}`
    : '#';

  /* ----------------------------- Token gate ----------------------------- */
  if (!login || !content) {
    return (
      <>
        <Seo title="Admin" description="Content admin panel." path="/admin" />
        <section className="container flex min-h-[70vh] items-center justify-center py-16">
          <div className="card w-full max-w-lg p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand">
              <Icon name="shield" size={24} />
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold">Admin panel</h1>
            {busy ? (
              <p className="mt-3 text-sm text-muted">Connecting to GitHub…</p>
            ) : (
              <>
                <p className="mt-3 text-sm text-muted text-pretty">
                  Edit everything on this site and publish with one click — no code. Connect with a
                  GitHub token that can write to{' '}
                  <span className="font-mono text-xs text-ink">
                    {GH_OWNER}/{GH_REPO}
                  </span>
                  . The token is stored only in this browser.
                </p>
                <ol className="mt-4 space-y-2 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="font-semibold text-brand">1.</span>
                    <span>
                      GitHub → Settings → Developer settings →{' '}
                      <a
                        className="text-brand underline"
                        href="https://github.com/settings/personal-access-tokens/new"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Fine-grained tokens → Generate new token
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-brand">2.</span>
                    <span>
                      Repository access: <strong className="text-ink">Only select repositories</strong> →{' '}
                      {GH_REPO}
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-brand">3.</span>
                    <span>
                      Permissions → Contents: <strong className="text-ink">Read and write</strong>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-brand">4.</span>
                    <span>Generate, copy, and paste it below.</span>
                  </li>
                </ol>
                <form
                  className="mt-5 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const v = tokenInput.current?.value.trim();
                    if (v) void connect(v);
                  }}
                >
                  <input
                    ref={tokenInput}
                    type="password"
                    placeholder="github_pat_…"
                    aria-label="GitHub personal access token"
                    className="field font-mono text-xs"
                  />
                  <button type="submit" className="btn-primary shrink-0">
                    Connect
                  </button>
                </form>
              </>
            )}
            {banner && (
              <p
                className={cn(
                  'mt-4 rounded-lg border px-4 py-2.5 text-sm',
                  banner.kind === 'err'
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                    : 'border-border bg-surface-2/60 text-muted',
                )}
              >
                {banner.text}
              </p>
            )}
          </div>
        </section>
      </>
    );
  }

  /* ------------------------------- Editor ------------------------------- */
  const activeCollection = collections.find((c) => c.key === tab);

  return (
    <>
      <Seo title="Admin" description="Content admin panel." path="/admin" />
      <section className="container py-10 pb-32">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow mb-1">Admin panel</p>
            <h1 className="font-display text-3xl font-bold">Site content</h1>
            <p className="mt-1 text-sm text-subtle">
              Connected as <span className="font-medium text-ink">{login}</span> · edits commit to{' '}
              <span className="font-mono text-xs">{CONTENT_PATH}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={backupHref} download="content-backup.json" className="btn-ghost text-sm">
              Download backup
            </a>
            <button type="button" onClick={signOut} className="btn-ghost text-sm">
              Sign out
            </button>
          </div>
        </div>

        {/* Banners */}
        {fromDraft && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-500">
            <span>You have unpublished draft changes (restored from this browser).</span>
            <button type="button" onClick={discardDraft} className="font-semibold underline">
              Discard draft &amp; reload published
            </button>
          </div>
        )}
        {banner && (
          <p
            className={cn(
              'mt-5 rounded-xl border px-4 py-3 text-sm',
              banner.kind === 'ok' && 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
              banner.kind === 'err' && 'border-rose-500/40 bg-rose-500/10 text-rose-400',
              banner.kind === 'info' && 'border-border bg-surface-2/60 text-muted',
            )}
          >
            {banner.text}{' '}
            {banner.kind === 'ok' && (
              <a href={ACTIONS_URL} target="_blank" rel="noreferrer" className="underline">
                Watch the deploy
              </a>
            )}
          </p>
        )}

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Content sections">
          {[{ key: 'site', label: 'Site & Identity' }, ...collections, { key: 'json', label: 'Raw JSON' }].map(
            (t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => {
                  setTab(t.key);
                  setSelected(0);
                }}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-medium transition',
                  tab === t.key
                    ? 'bg-brand text-white shadow-glow'
                    : 'border border-border bg-surface text-muted hover:border-brand/50 hover:text-ink',
                )}
              >
                {t.label}
              </button>
            ),
          )}
        </div>

        {/* Panels */}
        <div className="mt-8">
          {tab === 'site' && (
            <div className="card p-6 sm:p-8">
              <h2 className="mb-6 font-display text-lg font-semibold">Site &amp; identity</h2>
              <SchemaForm
                key="site"
                fields={siteFields}
                item={content.site}
                onChange={(path, value) => update((d) => setPath(d.site, path, value))}
              />
            </div>
          )}

          {activeCollection && (
            <CollectionEditor
              def={activeCollection}
              content={content}
              selected={selected}
              setSelected={setSelected}
              update={update}
            />
          )}

          {tab === 'json' && (
            <JsonEditor
              content={content}
              applyRaw={(next) => {
                setContent(next);
                localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
                setDirty(true);
              }}
            />
          )}
        </div>
      </section>

      {/* Sticky publish bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-4 py-3">
          <p className="text-sm text-muted">
            {dirty ? (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Unpublished changes
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Everything published
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={publish}
            disabled={busy || !dirty}
            className="btn-primary"
          >
            {busy ? 'Working…' : 'Publish to live site'} <Icon name="rocket" size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Collection editor: item list + schema form                          */
/* ------------------------------------------------------------------ */

function CollectionEditor({
  def,
  content,
  selected,
  setSelected,
  update,
}: {
  def: CollectionDef;
  content: ContentData;
  selected: number;
  setSelected: (i: number) => void;
  update: (fn: (draft: ContentData) => void) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = content[def.key] as any[];
  const index = Math.min(selected, Math.max(items.length - 1, 0));
  const item = items[index];

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    update((d) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const arr = d[def.key] as any[];
      const [it] = arr.splice(from, 1);
      arr.splice(to, 0, it);
    });
    setSelected(to);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Item list */}
      <div className="card h-fit p-4 lg:sticky lg:top-24">
        <div className="flex items-center justify-between px-2 pb-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-subtle">
            {def.label}
          </h2>
          <button
            type="button"
            className="btn-secondary h-8 px-3 py-0 text-xs"
            onClick={() => {
              update((d) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (d[def.key] as any[]).unshift(def.template());
              });
              setSelected(0);
            }}
          >
            + Add
          </button>
        </div>
        <p className="px-2 pb-3 text-xs text-subtle text-pretty">{def.description}</p>
        <ul className="max-h-[50vh] space-y-1 overflow-y-auto">
          {items.map((it, i) => (
            <li key={i} className="group flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelected(i)}
                className={cn(
                  'flex-1 truncate rounded-lg px-3 py-2 text-left text-sm transition',
                  i === index ? 'bg-brand text-white' : 'text-muted hover:bg-surface-2 hover:text-ink',
                )}
              >
                {def.itemLabel(it)}
              </button>
              <span className="flex shrink-0 gap-0.5 opacity-0 transition group-hover:opacity-100">
                <IconBtn label="Move up" onClick={() => move(i, i - 1)}>↑</IconBtn>
                <IconBtn label="Move down" onClick={() => move(i, i + 1)}>↓</IconBtn>
                <IconBtn
                  label="Duplicate"
                  onClick={() => {
                    update((d) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const arr = d[def.key] as any[];
                      const copy = structuredClone(arr[i]);
                      if (copy.slug) copy.slug = `${copy.slug}-copy`;
                      arr.splice(i + 1, 0, copy);
                    });
                    setSelected(i + 1);
                  }}
                >
                  ⧉
                </IconBtn>
                <IconBtn
                  label="Delete"
                  danger
                  onClick={() => {
                    if (!window.confirm(`Delete “${def.itemLabel(it)}”?`)) return;
                    update((d) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (d[def.key] as any[]).splice(i, 1);
                    });
                    setSelected(Math.max(0, i - 1));
                  }}
                >
                  ✕
                </IconBtn>
              </span>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-subtle">Nothing here yet — add one.</li>
          )}
        </ul>
      </div>

      {/* Form */}
      <div className="card p-6 sm:p-8 lg:col-span-2">
        {item ? (
          <SchemaForm
            key={`${def.key}-${index}`}
            fields={def.fields}
            item={item}
            onChange={(path, value) =>
              update((d) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setPath((d[def.key] as any[])[index], path, value);
              })
            }
          />
        ) : (
          <p className="py-10 text-center text-muted">Add an item to start editing.</p>
        )}
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  danger,
}: {
  children: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        'grid h-7 w-7 place-items-center rounded-md border border-border bg-surface text-xs transition',
        danger ? 'text-rose-400 hover:border-rose-500/60' : 'text-muted hover:border-brand/60 hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Raw JSON power-editor                                                */
/* ------------------------------------------------------------------ */

function JsonEditor({
  content,
  applyRaw,
}: {
  content: ContentData;
  applyRaw: (c: ContentData) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="font-display text-lg font-semibold">Raw JSON</h2>
      <p className="mt-1 text-sm text-subtle">
        Full control — edit the entire content document directly, then apply. Publish afterwards as usual.
      </p>
      <textarea
        ref={areaRef}
        defaultValue={JSON.stringify(content, null, 2)}
        rows={24}
        spellCheck={false}
        className="field mt-4 resize-y font-mono text-xs leading-relaxed"
        aria-label="Raw content JSON"
      />
      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      <button
        type="button"
        className="btn-secondary mt-4"
        onClick={() => {
          try {
            const parsed = JSON.parse(areaRef.current?.value ?? '') as ContentData;
            if (!parsed || typeof parsed !== 'object' || !parsed.site || !Array.isArray(parsed.projects)) {
              throw new Error('JSON must contain at least "site" and "projects".');
            }
            setError(null);
            applyRaw(parsed);
          } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
          }
        }}
      >
        Validate &amp; apply
      </button>
    </div>
  );
}
