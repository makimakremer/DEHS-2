'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import type { Product } from "@shared/types";
import { getStrapiImageUrl, formatPrice } from "@/lib/strapi/client";
import { Badge } from '@/components/ui';
import { Zap, TrendingUp } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { attributes } = product;
  const imageUrl = getStrapiImageUrl(attributes.hauptbild?.data?.attributes?.url);
  const categorySlug = attributes.kategorie?.data?.attributes?.slug || "alle";

  return (
    <Link href={`/produkte/${categorySlug}/${attributes.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="card group overflow-hidden h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }}>
            <Image
              src={imageUrl}
              alt={attributes.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {attributes.neuheit && (
              <Badge variant="accent" icon={TrendingUp}>Neuheit</Badge>
            )}
            {!attributes.verfuegbar && (
              <Badge variant="neutral">Nicht verfügbar</Badge>
            )}
            {attributes.auslaufmodell && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">Auslauf</Badge>
            )}
          </div>

          {/* Energy class */}
          {attributes.energieeffizienzklasse && (
            <div className="absolute bottom-3 right-3">
              <Badge variant="success">
                {attributes.energieeffizienzklasse.replace(/_/g, "")}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Manufacturer */}
          {attributes.hersteller?.data && (
            <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wide">
              {attributes.hersteller.data.attributes.name}
            </p>
          )}

          {/* Name */}
          <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {attributes.name}
          </h3>

          {/* Article number */}
          <p className="text-xs text-neutral-500 mb-3">
            Art.-Nr.: {attributes.artikelnummer}
          </p>

          {/* Short description */}
          {attributes.kurzbeschreibung && (
            <p className="mb-3 line-clamp-2 text-sm text-neutral-600">
              {attributes.kurzbeschreibung}
            </p>
          )}

          {/* Power */}
          {attributes.leistungKw && (
            <div className="flex items-center gap-2 mb-4 text-sm text-neutral-600">
              <Zap size={16} className="text-accent-500" />
              <span>{attributes.leistungKw} kW</span>
            </div>
          )}

          {/* Price */}
          <div className="mt-auto pt-4 border-t border-neutral-100">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-neutral-500">ab</span>
              <span className="text-xl font-bold text-primary-600">
                {formatPrice(attributes.listenpreis)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
