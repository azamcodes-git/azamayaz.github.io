import type { Service } from '@/data/types';
import { Icon, type IconName } from '@/components/Icon';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group card card-hover h-full p-6">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand transition group-hover:scale-110">
        <Icon name={service.icon as IconName} size={24} />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">{service.title}</h3>
      <p className="mt-2 text-sm text-muted text-pretty">{service.short}</p>
    </div>
  );
}
