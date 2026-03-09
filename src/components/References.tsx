'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import LocalizedLink from './LocalizedLink';
import { useTranslation } from '@/i18n/LanguageContext';
import ScrollReveal from './ScrollReveal';

export interface Project {
  title: string;
  tags: string[];
  description: string;
  website: string;
  image: string;
  bgColor: string;
}

export const homepageProjects: Project[] = [
  {
    title: 'JAGR WEDDINGS',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro fotografa Filipa Jagra jsem vytvořil web na míru, který je moderní, přehledný a reprezentuje jeho práci.',
    website: 'https://jagrweddings.com',
    image: 'screencapture-jagrweddings-2025-08-08-12_49_50-1.png',
    bgColor: '#0a0a0a',
  },
  {
    title: 'SCHLIEGER.CZ, SCHLIEGER.DE',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS', 'E-SHOP'],
    description: 'Pro firmu Schlieger.cz jsem kompletně redesignoval web od A do Z, včetně všech funkcionalit a designu, což pomohlo firmě vydělat v roce 2024 přes 4 miliardy korun.',
    website: 'https://schlieger.cz',
    image: 'screencapture-schlieger-cz-2025-08-08-12_34_35-1.png',
    bgColor: '#DC2626',
  },
  {
    title: 'DOMY SOBĚ',
    tags: ['PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro firmu Domy Sobě, která pomáhá bytovým domům šetřit, jsem vytvořil moderní a přehledný informační web.',
    website: 'https://ptkoncept.cz',
    image: 'reference-ptkoncept-min.png',
    bgColor: '#DC2626',
  },
  {
    title: 'DENIS FUECO & WORKSHOP',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS', 'E-SHOP'],
    description: 'Po vytvoření informativního webu před pár lety se mi Denis opět ozval s rozšířením webu o novou podstránku Workshop se zakomponováním funkce e-shopu.',
    website: 'https://denisfueco.com/spolu-workshop-vietnam-2024/',
    image: 'Reference-DenisFueco_workshop.png',
    bgColor: '#8B6847',
  },
  {
    title: 'SUKOVÁ PHOTOGRAPHY',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro fotografku Lucii jsem navrhl logo a vytvořil přehlednou prezentační webovou stránku s funkcí jazykové mutace.',
    website: 'https://sukovaphotography.com',
    image: 'Luciesukova-1.png',
    bgColor: '#2D3B3A',
  },
  {
    title: 'LEVITATE',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS', 'REZERVAČNÍ SYSTÉM', 'E-SHOP'],
    description: 'Pro fine dining restauraci L E V I T A T E jsem vytvořil přehlednou prezentační webovou stránku s e-shopem, rezervačním systémem a jazykovými mutacemi.',
    website: 'https://levitate.cz',
    image: 'levitate.cz_-1-1.png',
    bgColor: '#9B8F7A',
  },
  {
    title: 'WOLLEM',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS', 'E-SHOP'],
    description: 'Pro Wollem nabízející drahé šperky v centru Prahy jsem vytvořil přehledný e-shop s animacemi, platební bránou a formuláři.',
    website: 'https://wollem.com',
    image: 'Wollem-1-1.png',
    bgColor: '#6B0F1A',
  },
];

export const allProjects: Project[] = [
  ...homepageProjects,
  {
    title: 'HASÚ RESTAURANT & SUSHI BAR',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS', 'REZERVAČNÍ SYSTÉM'],
    description: 'Pro restauraci Hasú jsem vytvořil přehledný prezentační web s rezervačním systémem a jazykovými mutacemi.',
    website: 'https://hasu-restaurant.de',
    image: 'Hasu.de_-2.png',
    bgColor: '#4A3728',
  },
  {
    title: 'KATKA MALINOVÁ',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro fotografku Katku Malinovou jsem vytvořil prezentační web, kde nabízí své podnikatelské služby a zobrazuje své portfólio.',
    website: 'https://katkamalinova.cz',
    image: 'katkamalinova-min.png',
    bgColor: '#1a1a2e',
  },
  {
    title: 'BOHEMIA DIRECT',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ'],
    description: 'Pro obchodní firmu Bohemia Direct jsem vytvořil responzivní prezentační web s galerií, kalkulačkou a animacemi.',
    website: 'https://budevastobavit.cz',
    image: 'Bude-Vas-To-Bavit-min-1.png',
    bgColor: '#2D4A3E',
  },
  {
    title: 'PHAMILY RESIDENCE',
    tags: ['NÁVRH WEBU A LOGA', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro rezidenci sídlící v Da Nang ve Vietnamu jsem vytvořil prezentační web s rezervačním systémem pro rezervaci pokojů.',
    website: 'https://phamilyresidence.com',
    image: 'phamilyresidence.com_-2.png',
    bgColor: '#3D5A4E',
  },
  {
    title: 'TĀST',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro fine dining restauraci tāst v centru Prahy jsem vytvořil přehlednou prezentační webovou stránku s rezervačním systémem a jazykovými mutacemi.',
    website: 'https://tastrestaurant.cz',
    image: 'tast-min.png',
    bgColor: '#1C1C1C',
  },
  {
    title: 'YORI RESTAURANT',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro asijskou restauraci Yori na Masarykově nábřeží v Praze jsem vytvořil přehledný web s podporou vícejazyčnosti.',
    website: 'https://yorirestaurant.cz',
    image: 'Yori-Restaurant-1.png',
    bgColor: '#8B4513',
  },
  {
    title: 'STUDIO DETOXIKACE',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS', 'E-SHOP'],
    description: 'Pro paní Dagmar Císařovou jsem vytvořil prezentační web, kde nabízí své podnikatelské služby a alternativní způsoby léčení.',
    website: 'https://studio-detoxikace.cz',
    image: 'Studio-Detoxikace-1.png',
    bgColor: '#5B7553',
  },
  {
    title: 'DENIS FUECO',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS', 'E-SHOP'],
    description: 'Pro známého fotografa jsem vytvořil prezentační web nabízející své služby s portfóliem a e-shopem, díky čemuž má Denis možnost prodávat své presety online.',
    website: 'https://denisfueco.com',
    image: 'denisfueco-min-1.png',
    bgColor: '#3A2518',
  },
  {
    title: 'MAJI',
    tags: ['PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS', 'E-SHOP'],
    description: 'Pro více než 10 let působící firmu Maji s několika pobočkami jsem vytvořil E-shop nabízející malířské produkty.',
    website: 'https://maji.cz',
    image: 'Snímek-obrazovky-2022-04-04-v-15.41.19.png',
    bgColor: '#2C3E50',
  },
  {
    title: 'LILI BEAUTY',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro makeup a hairstyle artistku jsem vytvořil webovou stránku s portfóliem a e-shopem.',
    website: 'https://lilibeauty.cz',
    image: 'Reference-LiliBeauty-min.png',
    bgColor: '#D4A0A0',
  },
  {
    title: 'ATALIAN',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro globální firmu působící ve více než 20 zemích na světě zaměřující se na údržbu, čištění, bezpečnost, katering, atp. jsem vytvořil plně responzivní prezentační web s jazykovými mutacemi.',
    website: 'https://atalian.cz',
    image: 'screencapture-atalian-cz-2022-04-04-15_46_00.png',
    bgColor: '#1B3A5C',
  },
  {
    title: 'DIGITÁLNÍTREND',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro klienta jsem vytvořil online magazín/news web zabývající se kryptoměnami, akciemi, investováním apod.',
    website: 'https://digitalnitrend.cz',
    image: 'digitalnitrend.png',
    bgColor: '#1A1A2E',
  },
  {
    title: 'CRYPTOSVĚT',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro klienta jsem vytvořil aktuálně jeden z nejčtenějších online magazínů zabývajících se kryptoměnami a investováním.',
    website: 'https://cryptosvet.cz',
    image: 'cryptosvet-2.png',
    bgColor: '#0D1B2A',
  },
  {
    title: 'INSIGHTLAB',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro InsightLab jsem vytvořil plně responzivní prezentační web nabízející chytrá řešení pro firmy, které chtějí porozumět zákazníkovi.',
    website: 'https://insightlab.cz',
    image: 'insightlab.cz_-1.png',
    bgColor: '#16213E',
  },
  {
    title: 'AK NGUYEN',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ'],
    description: 'Pro advokátní kancelář AK Nguyen jsem vytvořil informativní web.',
    website: 'https://aknguyen.cz',
    image: 'reference-aknguyen-min.png',
    bgColor: '#2C2C2C',
  },
  {
    title: 'MYMILLENIUM',
    tags: ['PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro MyMillenium jsem vytvořil responzivní webovou stránku dle návrhu klienta nabízející moderní a stylové prostory v Liberci.',
    website: 'https://mymillenium.cz',
    image: 'mymillenium.cz_-1.png',
    bgColor: '#3E2723',
  },
  {
    title: 'YGOLFTRAVEL',
    tags: ['NÁVRH WEBU', 'PROGRAMOVÁNÍ', 'KÓDOVÁNÍ', 'WORDPRESS'],
    description: 'Pro YGolfTravel jsem vytvořil responzivní web nabízející pobytové balíčky plné zážitků.',
    website: 'https://ygolftravel.cz',
    image: 'Ygolftravel.png',
    bgColor: '#2E7D32',
  },
];

// Helper to interpolate between two hex colors
function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.replace('#', ''), 16);
  const bh = parseInt(b.replace('#', ''), 16);

  const ar = (ah >> 16) & 0xff;
  const ag = (ah >> 8) & 0xff;
  const ab = ah & 0xff;

  const br = (bh >> 16) & 0xff;
  const bg = (bh >> 8) & 0xff;
  const bb = bh & 0xff;

  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);

  return `#${((rr << 16) | (rg << 8) | rb).toString(16).padStart(6, '0')}`;
}

// Thumbnail component with wheel-scroll (like scrolling a webpage)
const ScrollableThumbnail: React.FC<{ src: string; alt: string; website: string }> = ({ src, alt, website }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const scrollPosRef = useRef(0);
  const maxScrollRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const calculateScroll = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const scale = containerWidth / (img.naturalWidth || 1);
      const scaledHeight = img.naturalHeight * scale;
      const max = Math.max(0, scaledHeight - containerHeight);
      maxScrollRef.current = max;
      setCanScroll(max > 0);
    };

    if (img.complete) {
      calculateScroll();
    } else {
      img.addEventListener('load', calculateScroll);
      return () => img.removeEventListener('load', calculateScroll);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (maxScrollRef.current <= 0) return;

      // Prevent page scroll when scrolling inside thumbnail
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY;
      const speed = 1.5;
      scrollPosRef.current = Math.max(0, Math.min(maxScrollRef.current, scrollPosRef.current + delta * speed));

      if (imgRef.current) {
        imgRef.current.style.objectPosition = `center -${scrollPosRef.current}px`;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="block relative w-full h-72 md:h-96 overflow-hidden rounded-lg bg-white/5 group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        // Smoothly scroll back to top on mouse leave
        scrollPosRef.current = 0;
        if (imgRef.current) {
          imgRef.current.style.transition = 'object-position 0.4s ease';
          imgRef.current.style.objectPosition = 'center top';
          setTimeout(() => {
            if (imgRef.current) imgRef.current.style.transition = '';
          }, 400);
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none"
        style={{ objectPosition: 'center top' }}
        loading="lazy"
      />
      {/* Scroll hint on hover */}
      {isHovered && canScroll && (
        <div className="absolute bottom-3 right-3 bg-black/60 text-white/80 text-[10px] uppercase tracking-wider px-2 py-1 rounded pointer-events-none">
          ↕ Scroll
        </div>
      )}
    </div>
  );
};

const References: React.FC<{ projects?: Project[] }> = ({ projects = homepageProjects }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [bgColor, setBgColor] = useState('#0a0a0a');
  const rafRef = useRef<number | null>(null);

  // Smooth scroll-based background using requestAnimationFrame
  const updateBackground = useCallback(() => {
    if (!sectionRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;
    let secondClosestIndex = -1;
    let secondClosestDistance = Infinity;

    projectRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - itemCenter);

      if (distance < closestDistance) {
        secondClosestIndex = closestIndex;
        secondClosestDistance = closestDistance;
        closestIndex = i;
        closestDistance = distance;
      } else if (distance < secondClosestDistance) {
        secondClosestIndex = i;
        secondClosestDistance = distance;
      }
    });

    // If section is barely visible or no project items are near viewport center, stay dark
    if (sectionRect.top > window.innerHeight * 0.8) {
      setBgColor('#0a0a0a');
      return;
    }

    // Check if the first project item has scrolled close to viewport center
    const firstRef = projectRefs.current[0];
    if (firstRef) {
      const firstRect = firstRef.getBoundingClientRect();
      // If first project is still well below viewport center, blend from dark to first project color
      if (firstRect.top > window.innerHeight * 0.8) {
        const distanceToView = firstRect.top - window.innerHeight * 0.5;
        const fadeRange = window.innerHeight * 0.5;
        const t = Math.max(0, Math.min(1, distanceToView / fadeRange));
        setBgColor(lerpColor(projects[0].bgColor, '#0a0a0a', t));
        return;
      }
    }

    // If past the last project, use last project color
    const lastRef = projectRefs.current[projects.length - 1];
    if (lastRef) {
      const lastRect = lastRef.getBoundingClientRect();
      if (lastRect.bottom < viewportCenter) {
        setBgColor(projects[projects.length - 1].bgColor);
        return;
      }
    }

    // Blend between two closest projects for smooth transition
    if (secondClosestIndex >= 0 && closestDistance + secondClosestDistance > 0) {
      const total = closestDistance + secondClosestDistance;
      const t = closestDistance / total; // 0 = fully closest, 1 = fully second
      const blended = lerpColor(
        projects[closestIndex].bgColor,
        projects[secondClosestIndex].bgColor,
        t
      );
      setBgColor(blended);
    } else {
      setBgColor(projects[closestIndex].bgColor);
    }
  }, [projects]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateBackground);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    updateBackground();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateBackground]);

  // Get translated heading and button texts
  const heading = t('references.heading') as string;
  const visitWebButton = t('references.visitWebButton') as string;
  const contactButton = t('references.contactButton') as string;
  const allReferencesButton = t('references.allReferencesButton') as string;

  // Get translated projects data
  const translatedProjects = t('references.projects') as {
    title: string;
    description: string;
    tags: string[];
  }[];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-40 px-6 md:px-12"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* REFERENCE - huge outline text */}
        <ScrollReveal animation="up">
          <h2
            className="leading-[0.8] mb-20 md:mb-32 font-black tracking-tighter"
            style={{
              fontSize: 'clamp(5rem, 10vmax, 15rem)',
              WebkitTextStroke: '2px white',
              color: 'transparent',
              fontFamily: 'Arial Black, sans-serif',
              textAlign: 'left',
              fontWeight: 900,
            }}
          >
            {heading}
          </h2>
        </ScrollReveal>

        {/* Projects */}
        <div className="space-y-20 md:space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            // Merge translated data with non-translatable data
            const translatedProject = translatedProjects[index] || {
              title: project.title,
              description: project.description,
              tags: project.tags,
            };

            return (
              <div
                key={index}
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image Container */}
                <ScrollReveal animation={isEven ? 'left' : 'right'} className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                  <ScrollableThumbnail
                    src={`/images/${project.image}`}
                    alt={translatedProject.title}
                    website={project.website}
                  />
                </ScrollReveal>

                {/* Content Container */}
                <ScrollReveal animation={isEven ? 'right' : 'left'} delay={1} className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {translatedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-white/80 text-[10px] font-bold uppercase tracking-wider border border-white/30 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-3xl md:text-5xl font-black uppercase text-white mb-6 leading-tight tracking-tight">
                    {translatedProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
                    {translatedProject.description}
                  </p>

                  {/* Visit Link */}
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white font-bold uppercase text-sm border-l-2 border-white pl-4 hover:text-red-300 hover:border-red-300 transition-colors duration-300"
                  >
                    {visitWebButton}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </ScrollReveal>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-32 md:mt-48">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <LocalizedLink
              href="/kontakt"
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-bold uppercase text-sm transition-colors flex items-center gap-3 border-2 border-red-600 hover:border-red-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {contactButton}
            </LocalizedLink>

            <LocalizedLink
              href="/reference"
              className="border-2 border-white text-white px-10 py-4 font-bold uppercase text-sm hover:bg-white hover:text-[#6B0F1A] transition-colors flex items-center gap-3"
            >
              {allReferencesButton}
              <span>→</span>
            </LocalizedLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
