import { testimonials } from '@/data/testimonials';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

export function Testimonials() {
  return (
    <Section id="testimonials" className="border-y border-border bg-surface/30">
      <SectionHeading
        align="center"
        eyebrow="Testimonials"
        title="Trusted to build the real thing"
        description="Feedback from the people behind the systems. Placeholders today — your words could be here next."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal as="article" key={t.initials} delay={i * 0.08} className="card flex flex-col p-6">
            <div className="flex gap-1 text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17.3 5.8 20.6l1.6-6.7L2.2 8.9l6.9-.6L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted text-pretty">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand to-accent text-sm font-semibold text-white">
                {t.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{t.name}</span>
                <span className="block text-xs text-subtle">
                  {t.role}, {t.company}
                </span>
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
