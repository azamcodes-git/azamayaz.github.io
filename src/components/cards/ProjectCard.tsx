import { Link } from 'react-router-dom';
import type { Project } from '@/data/types';
import { CoverArt } from '@/components/ui/CoverArt';
import { Icon } from '@/components/Icon';
import { useTilt } from '@/lib/hooks';
import { cn } from '@/lib/cn';

export function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const tilt = useTilt(featured ? 2.5 : 5);
  return (
    <Link
      to={`/projects/${project.slug}`}
      {...tilt}
      className={cn(
        'group card tilt spotlight flex flex-col overflow-hidden',
        'hover:border-brand/50 hover:shadow-glow',
        featured && 'lg:flex-row',
      )}
    >
      <div className={cn('p-3', featured && 'lg:w-1/2')}>
        <CoverArt
          from={project.cover.from}
          to={project.cover.to}
          label={project.title}
          aspect={featured ? 'aspect-[16/11] h-full' : 'aspect-[16/10]'}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className={cn('flex flex-1 flex-col p-5', featured && 'lg:w-1/2 lg:justify-center lg:p-8')}>
        <div className="flex flex-wrap items-center gap-2">
          {project.categories.slice(0, featured ? 3 : 2).map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
          <span className="ml-auto text-xs text-subtle">{project.year}</span>
        </div>
        <h3 className={cn('mt-4 font-display font-semibold', featured ? 'text-2xl' : 'text-xl')}>
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted text-pretty">{project.tagline}</p>
        {featured && (
          <p className="mt-4 line-clamp-3 text-sm text-subtle text-pretty">{project.overview}</p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          View case
          <Icon
            name="arrow-right"
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
