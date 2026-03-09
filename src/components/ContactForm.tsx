'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/i18n/LanguageContext';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  services: string[];
  message: string;
  file?: File;
}

const ContactForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+420',
    services: [],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const services = t('contactForm.services') as string[];
  const countryCodes = t('contactForm.countryCodes') as Record<string, string>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryCodeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, countryCode: e.target.value }));
  };

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, you would:
      // 1. Upload file to storage if present
      // 2. Save contact data to Supabase
      // 3. Send confirmation email

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+420',
          services: [],
          message: '',
        });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return isOpen ? (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      style={{
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
        className="bg-gray-950 rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            {t('contactForm.heading')}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-3xl font-light"
          >
            ×
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-500/20 border border-green-500 rounded p-4 mb-6 text-green-400">
            {t('contactForm.successMessage')}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-500/20 border border-red-500 rounded p-4 mb-6 text-red-400">
            {t('contactForm.errorMessage')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              {t('contactForm.nameLabel')}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
              placeholder={t('contactForm.namePlaceholder')}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              {t('contactForm.emailLabel')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
              placeholder={t('contactForm.emailPlaceholder')}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              {t('contactForm.phoneLabel')}
            </label>
            <div className="flex gap-2">
              <select
                value={formData.countryCode}
                onChange={handleCountryCodeChange}
                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
              >
                {Object.entries(countryCodes).map(([code, label]) => (
                  <option key={code} value={label.split(' ')[0]}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
                placeholder={t('contactForm.phonePlaceholder')}
                required
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              {t('contactForm.servicesLabel')}
            </label>
            <div className="space-y-2">
              {services.map((service) => (
                <label key={service} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceChange(service)}
                    className="w-4 h-4 rounded accent-red-500"
                  />
                  <span className="text-white/70 text-sm">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              {t('contactForm.messageLabel')}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-red-500 resize-none"
              placeholder={t('contactForm.messagePlaceholder')}
              rows={4}
              required
            />
          </div>

          {/* File upload */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              {t('contactForm.fileLabel')}
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white/70 focus:outline-none focus:border-red-500"
            />
            {formData.file && (
              <p className="text-white/60 text-xs mt-2">
                File: {formData.file.name}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 text-white px-6 py-3 rounded font-bold uppercase hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? t('contactForm.submittingButton')
              : t('contactForm.submitButton')}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default ContactForm;
