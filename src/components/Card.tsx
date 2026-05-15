'use client';

import React from 'react';
import { cn } from '@lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl bg-dark-800/50 backdrop-blur-sm border border-dark-700 p-6 md:p-8',
          hover && 'transition-all duration-300 hover:border-premium-accent/50 hover:shadow-neon',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
