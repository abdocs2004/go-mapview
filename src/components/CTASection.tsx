'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container';
import Button from './Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}) => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-dark-900 to-dark-950">
      <Container>
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-premium-accent/20 to-blue-500/20" />
          <div className="relative px-8 md:px-16 py-16 md:py-24 text-center space-y-6 border border-premium-accent/30 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">{description}</p>
            <div className="flex gap-4 justify-center pt-4 flex-wrap">
              <Link href={ctaHref}>
                <Button size="lg" className="gap-2">
                  {ctaLabel}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link href={secondaryHref}>
                  <Button size="lg" variant="outline">
                    {secondaryLabel}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;
