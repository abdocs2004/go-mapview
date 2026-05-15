'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from './Card';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href?: string;
  features?: string[];
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  href,
  features,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card>
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-premium-accent/10 w-fit">
            <Icon className="w-6 h-6 text-premium-accent" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-dark-400 text-sm">{description}</p>

          {features && (
            <ul className="space-y-2 pt-4">
              {features.map((feature, i) => (
                <li key={i} className="text-sm text-dark-400 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-premium-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {href && (
            <Link href={href} className="inline-block pt-4">
              <Button variant="ghost" size="sm" className="gap-2 pl-0">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
