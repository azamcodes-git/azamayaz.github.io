import { useState } from 'react';
import type { FaqItem } from '@/data/types';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/cn';

interface FaqProps {
  items: FaqItem[];
}

/** Accessible accordion. Emits FAQPage JSON-LD via the parent (see buildFaqSchema). */
export function Faq({ items }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface/60">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <span className="font-medium text-ink">{item.question}</span>
                <Icon
                  name="chevron-down"
                  size={18}
                  className={cn(
                    'shrink-0 text-subtle transition-transform duration-300',
                    isOpen && 'rotate-180 text-brand',
                  )}
                />
              </button>
            </h3>
            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted text-pretty">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Builds FAQPage structured data from FAQ items. */
export function buildFaqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}
