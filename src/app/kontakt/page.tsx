'use client';

import React, { useState } from 'react';
import { Header, SideLabels, Footer } from '@/components';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from '@/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useTranslation();
  const serviceOptions = t('contactForm.services') as string[];
  const pk = t('pages.kontakt') as Record<string, string>;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as string[],
    message: '',
  });

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(pk.successAlert);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <PageTitle translationKey="pages.kontakt.title" />
      <Header />
      <SideLabels />

      <div className="pt-32 pb-32 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-condensed text-5xl md:text-7xl text-white uppercase mb-12 leading-none">
            {pk.heading}<br />{pk.headingContinued}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                {pk.nameLabel}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                {pk.emailLabel}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                {pk.phoneLabel}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition"
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-white text-xs font-bold uppercase tracking-wider mb-4">
                {pk.servicesLabel}
              </label>
              <div className="flex flex-wrap gap-3">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`px-4 py-2 border rounded-full text-sm transition ${
                      formData.services.includes(service)
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-white/20 text-white/60 hover:border-white/40'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                {pk.messageLabel}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-500 transition resize-none"
                rows={4}
                required
              />
            </div>

            {/* File upload */}
            <div>
              <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                {pk.fileLabel}
              </label>
              <div className="border border-dashed border-white/20 rounded-lg p-6 text-center cursor-pointer hover:border-white/40 transition">
                <p className="text-white/40 text-sm">{t('pages.kontakt.fileLabel') as string}</p>
                <p className="text-white/30 text-xs mt-1">{pk.fileHint}</p>
                <input type="file" className="hidden" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-red-500 text-white px-8 py-3 font-bold uppercase hover:bg-red-600 transition tracking-wider"
            >
              {pk.submitButton}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
