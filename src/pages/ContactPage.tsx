import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Faq, buildFaqSchema } from '@/components/sections/Faq';
import { Icon, type IconName } from '@/components/Icon';
import { site } from '@/data/site';
import { faqs } from '@/data/faqs';

const intents = [
  { value: 'project', label: 'Custom project' },
  { value: 'quote', label: 'Request a quote' },
  { value: 'demo', label: 'Request a demo' },
  { value: 'collab', label: 'Collaboration' },
  { value: 'other', label: 'Something else' },
];

const channels: { key: keyof typeof site.social; icon: IconName }[] = [
  { key: 'email', icon: 'mail' },
  { key: 'github', icon: 'github' },
  { key: 'linkedin', icon: 'linkedin' },
  { key: 'x', icon: 'x' },
];

export default function ContactPage() {
  const [params] = useSearchParams();
  const presetSubject = params.get('subject') ?? '';
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const intent = String(data.get('intent') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = presetSubject || `New enquiry (${intent}) from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nType: ${intent}\n\n${message}`;
    // No backend required: hand off to the visitor's mail client.
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <Seo
        title="Contact — Start a Project with Azam Ayaz"
        description="Get in touch with Azam Ayaz for custom software, AI development, quotes, demos, or collaboration. Send a project brief and get a direct, considered response."
        path="/contact"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Azam Ayaz',
            url: `${site.url}/contact`,
          },
          buildFaqSchema(faqs),
        ]}
      />

      <PageHeader
        eyebrow="Contact"
        title="Let’s build something worth shipping"
        description="Tell me what you’re working on. Whether it’s a full product, an AI feature, or a quick question — you’ll get a direct, thoughtful reply."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="card p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand">
                    <Icon name="check" size={28} />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold">Almost there</h2>
                  <p className="mt-2 max-w-sm text-sm text-muted text-pretty">
                    Your email draft should have opened. If it didn’t, reach me directly at{' '}
                    <a href={site.social.email.href} className="font-medium text-brand">
                      {site.email}
                    </a>
                    .
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-5">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {presetSubject && (
                    <p className="rounded-lg border border-brand/30 bg-brand-soft/40 px-4 py-2.5 text-sm text-ink">
                      Re: <span className="font-medium">{presetSubject}</span>
                    </p>
                  )}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="field"
                        placeholder="Your name"
                      />
                    </Field>
                    <Field label="Email" htmlFor="email">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="field"
                        placeholder="you@company.com"
                      />
                    </Field>
                  </div>
                  <Field label="What can I help with?" htmlFor="intent">
                    <select id="intent" name="intent" className="field" defaultValue="project">
                      {intents.map((i) => (
                        <option key={i.value} value={i.label}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Message" htmlFor="message">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="field resize-y"
                      placeholder="A few sentences about your project, goal, or question…"
                    />
                  </Field>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send message <Icon name="arrow-right" size={16} />
                  </button>
                  <p className="text-xs text-subtle">
                    Prefer email? Reach me directly at{' '}
                    <a href={site.social.email.href} className="text-brand">
                      {site.email}
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Side info */}
          <div className="space-y-6 lg:col-span-2">
            <Reveal className="card p-6">
              <h2 className="font-display text-lg font-semibold">Other ways to reach me</h2>
              <ul className="mt-4 space-y-3">
                {channels.map(({ key, icon }) => {
                  const s = site.social[key];
                  return (
                    <li key={key}>
                      <a
                        href={s.href}
                        target={key === 'email' ? undefined : '_blank'}
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/40 px-4 py-3 transition hover:border-brand/50"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface text-brand">
                          <Icon name={icon} size={18} />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-ink">{s.label}</span>
                          <span className="block text-xs text-subtle">{s.handle}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal className="card p-6">
              <h2 className="font-display text-lg font-semibold">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm">
                {[
                  'You send a short brief or question.',
                  'I reply directly with an honest take and suggested approach.',
                  'If it’s a fit, we scope it and get started.',
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-2xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-muted text-pretty">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Full FAQ */}
      <Section id="faq" className="scroll-mt-24 border-t border-border bg-surface/30">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title="Everything you might want to know"
          description="Clear answers about technologies, process, custom software, source code, support, and more."
        />
        <div className="mt-12">
          <Faq items={faqs} />
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
