'use client';

import { Header, SideLabels, Footer } from '@/components';
import References from '@/components/References';
import { allProjects } from '@/components/References';
import PageTitle from '@/components/PageTitle';
import { useTranslation } from '@/i18n/LanguageContext';

export default function ReferencePage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-black text-white" style={{ overflowX: 'clip' }}>
      <PageTitle translationKey="pages.reference.title" />
      <Header />
      <SideLabels />
      <div className="pt-32 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-condensed text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none mb-4">
            {t('pages.reference.heading1') as string}
          </h1>
          <h2 className="font-condensed text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none mb-12">
            {t('pages.reference.heading2') as string}
          </h2>
        </div>
      </div>
      <References projects={allProjects} />
      <Footer />
    </main>
  );
}
