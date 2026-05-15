'use client';

import React, { useState } from 'react';
import type { Locale } from '@lib/i18n';
import { motion } from 'framer-motion';
import Container from '@components/Container';
import Card from '@components/Card';
import Button from '@components/Button';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { cn } from '@lib/utils';

type ContactInfoItem = {
  key: 'email' | 'phone' | 'address' | 'whatsapp';
  title: string;
  content: string;
  link: string;
};

type StylePayload = {
  sectionClass: string;
  containerClass: string;
  headingClass: string;
  textClass: string;
  cardClass: string;
  buttonVariant: 'primary' | 'outline' | 'ghost';
};

interface ContactClientProps {
  locale: Locale;
  heroTitle: string;
  heroSubtitle: string;
  mapEmbedUrl?: string;
  contactInfo: ContactInfoItem[];
  heroStyle: StylePayload;
  contentStyle: StylePayload;
  mapStyle: StylePayload;
}

export default function ContactClient({
  locale,
  heroTitle,
  heroSubtitle,
  mapEmbedUrl,
  contactInfo,
  heroStyle,
  contentStyle,
  mapStyle,
}: ContactClientProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const iconByKey = {
    email: Mail,
    phone: Phone,
    address: MapPin,
    whatsapp: MessageCircle,
  } as const;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = locale === 'en' ? 'Name is required' : 'الاسم مطلوب';
    }
    if (!formData.email.trim()) {
      newErrors.email = locale === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'en' ? 'Invalid email address' : 'البريد الإلكتروني غير صحيح';
    }
    if (!formData.message.trim()) {
      newErrors.message = locale === 'en' ? 'Message is required' : 'الرسالة مطلوبة';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
          sourcePage: `/${locale}/contact`,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message || (locale === 'en' ? 'Unable to submit contact form.' : 'تعذر إرسال طلب الاتصال.'));
      }

      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <section className={cn('min-h-screen flex items-center justify-center relative overflow-hidden pt-20', heroStyle.sectionClass)}>
        <div className="absolute inset-0">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-premium-accent/20 via-transparent to-transparent rounded-full blur-3xl opacity-20" />
        </div>

        <Container className={heroStyle.containerClass}>
          <motion.div
            className="relative z-10 text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className={cn('text-gradient', heroStyle.headingClass)}>{heroTitle}</h1>
            <p className={cn('text-dark-400 max-w-2xl mx-auto', heroStyle.textClass)}>{heroSubtitle}</p>
          </motion.div>
        </Container>
      </section>

      <section className={contentStyle.sectionClass}>
        <Container className={contentStyle.containerClass}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = iconByKey[info.key];
                  return (
                    <motion.div
                      key={info.key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <Card hover className={cn('h-full', contentStyle.cardClass)}>
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-premium-accent/10 w-fit">
                              <IconComponent className="w-5 h-5 text-premium-accent" />
                            </div>
                            <h3 className="text-lg font-semibold">{info.title}</h3>
                            <p className="text-dark-400 break-all">{info.content}</p>
                          </div>
                        </Card>
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Card className={contentStyle.cardClass}>
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div>
                      <label className="block text-sm font-semibold mb-2">{locale === 'en' ? 'Your Name' : 'اسمك'}</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg bg-dark-900 border text-white placeholder-dark-500 focus:outline-none transition-colors duration-300",
                          errors.name ? "border-red-500 focus:border-red-500" : "border-dark-700 focus:border-premium-accent"
                        )}
                        placeholder={locale === 'en' ? 'John Doe' : 'أحمد علي'}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">{locale === 'en' ? 'Your Email' : 'بريدك الإلكتروني'}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg bg-dark-900 border text-white placeholder-dark-500 focus:outline-none transition-colors duration-300",
                          errors.email ? "border-red-500 focus:border-red-500" : "border-dark-700 focus:border-premium-accent"
                        )}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">{locale === 'en' ? 'Your Message' : 'رسالتك'}</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg bg-dark-900 border text-white placeholder-dark-500 focus:outline-none transition-colors duration-300 resize-none",
                          errors.message ? "border-red-500 focus:border-red-500" : "border-dark-700 focus:border-premium-accent"
                        )}
                        placeholder={locale === 'en' ? 'Tell us about your project...' : 'أخبرنا عن مشروعك...'}
                      />
                      {errors.message && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message}</p>}
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2" loading={isSubmitting} variant={contentStyle.buttonVariant}>
                      {locale === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                      <Send className="w-5 h-5" />
                    </Button>

                    {status === 'success' ? (
                      <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                        {locale === 'en'
                          ? 'Message sent successfully. We will respond shortly.'
                          : 'تم إرسال الرسالة بنجاح. سنرد عليك قريبًا.'}
                      </p>
                    ) : null}

                    {status === 'error' ? (
                      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {errorMessage || (locale === 'en' ? 'Failed to send message.' : 'فشل إرسال الرسالة.')}
                      </p>
                    ) : null}
                  </form>
                </Card>
              </motion.div>
            </div>

            <div>
              <motion.div
                className={cn('relative rounded-xl overflow-hidden h-96 border border-dark-700', mapStyle.cardClass)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                {mapEmbedUrl ? (
                  mapEmbedUrl.includes('google.com/maps/embed') ? (
                    <iframe src={mapEmbedUrl} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-premium-accent/20 to-blue-500/20 p-6">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🗺️</div>
                        <p className="text-dark-400 mb-4">{locale === 'en' ? 'Open map in Google Maps' : 'افتح الخريطة في خرائط Google'}</p>
                        <a href={mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-premium-accent text-white">
                          {locale === 'en' ? 'Open in Maps' : 'افتح في الخرائط'}
                        </a>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-premium-accent/20 to-blue-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🗺️</div>
                      <p className="text-dark-400">
                        {locale === 'en' ? 'Map integration coming soon' : 'تكامل الخريطة قريبًا'}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
