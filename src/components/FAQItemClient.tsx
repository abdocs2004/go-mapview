'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@lib/utils';
import { CMSRichText } from '@components/CMSRichText';

interface FAQItemProps {
  question: string;
  answer: unknown;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const renderAnswer = () => {
    if (!answer) return null;
    if (typeof answer === 'string') return <div className="whitespace-pre-wrap">{answer}</div>;
    return <CMSRichText data={answer} />;
  };

  return (
    <div className="border border-dark-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen((s) => !s)}
        className="w-full px-6 py-4 bg-dark-800 hover:bg-dark-700 transition-colors flex items-center justify-between"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-left">{question}</span>
        <ChevronDown className={cn('w-5 h-5 transition-transform', { 'rotate-180': isOpen })} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-dark-900 text-dark-300 text-sm leading-relaxed border-t border-dark-700">
          {renderAnswer()}
        </div>
      )}
    </div>
  );
}
