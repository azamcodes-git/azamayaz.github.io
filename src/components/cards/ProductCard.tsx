import { Link } from 'react-router-dom';
import type { Product } from '@/data/types';
import { CoverArt } from '@/components/ui/CoverArt';
import { Icon } from '@/components/Icon';
import { useTilt } from '@/lib/hooks';

export function ProductCard({ product }: { product: Product }) {
  const tilt = useTilt(5);
  return (
    <Link
      to={`/products/${product.slug}`}
      {...tilt}
      className="group card tilt spotlight flex flex-col overflow-hidden hover:border-brand/50 hover:shadow-glow"
    >
      <div className="relative p-3">
        {product.badge && (
          <span className="absolute right-5 top-5 z-10 rounded-full bg-brand px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-white shadow-glow">
            {product.badge}
          </span>
        )}
        <CoverArt
          from={product.cover.from}
          to={product.cover.to}
          label={product.name}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="chip self-start">{product.category}</span>
        <h3 className="mt-4 font-display text-xl font-semibold">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted text-pretty">{product.summary}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">View product</span>
          <Icon
            name="arrow-right"
            size={16}
            className="text-brand transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
