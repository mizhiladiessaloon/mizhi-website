'use client';

import { useState, Suspense, use } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import SectionReveal from '@/components/SectionReveal';
import GradientOrbs from '@/components/GradientOrbs';
import { services, businessInfo } from '@/data/services';

const categoryKeys = ['face', 'hair', 'nails', 'waxing', 'bleaching'];

function ServicesPageInner({ locale }) {
  const isRtl = locale === 'ar';
  const t = useTranslations('servicesPage');
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'all';
  const [activeTab, setActiveTab] = useState(initialTab);

  const filteredCategories = activeTab === 'all'
    ? categoryKeys.map(k => services[k])
    : [services[activeTab]].filter(Boolean);

  return (
    <div style={{ fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)' }}>
      <style>{`
        .category-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (min-width: 900px) {
          .category-grid {
            grid-template-columns: 1fr 1fr;
          }
          .category-grid.reverse .cat-image {
            order: 2;
          }
          .category-grid.reverse .cat-list {
            order: 1;
          }
        }
      `}</style>
      
      {/* Header */}
      <section style={{
        position: 'relative',
        paddingTop: '8rem',
        paddingBottom: '3rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image 
            src="/images/bg_image.webp" 
            alt="Services Background" 
            fill 
            style={{ objectFit: 'cover' }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255,251,242,0.85) 0%, rgba(255,245,224,0.75) 50%, rgba(232,213,163,0.85) 100%)' }}></div>
        </div>
        <GradientOrbs variant="hero" />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '0.75rem',
            }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-light)',
              maxWidth: '550px',
              margin: '0 auto',
            }}
          >
            {t('description')}
          </motion.p>
        </div>
      </section>

      {/* Tab Filters */}
      <section style={{
        position: 'sticky',
        top: '60px',
        zIndex: 30,
        background: 'rgba(255, 248, 250, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        padding: '0.75rem 0',
      }}>
        <div className="section-container" style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem',
          scrollbarWidth: 'none',
        }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              background: activeTab === 'all' ? 'var(--color-magenta)' : 'rgba(255, 245, 224, 0.6)',
              color: activeTab === 'all' ? '#fff' : 'var(--color-text)',
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
            }}
          >
            {t('all')}
          </button>
          {categoryKeys.map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                background: activeTab === key ? 'var(--color-magenta)' : 'rgba(255, 245, 224, 0.6)',
                color: activeTab === key ? '#fff' : 'var(--color-text)',
                fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
              }}
            >
              {isRtl ? services[key].titleAr : services[key].titleEn}
            </button>
          ))}
          <a
            href={`/${locale}/henna`}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '50px',
              border: '1px solid var(--color-magenta)',
              background: 'transparent',
              color: 'var(--color-magenta)',
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
            }}
          >
            {isRtl ? 'الحناء' : 'Henna'} →
          </a>
        </div>
      </section>

      {/* Service Lists */}
      <section style={{
        position: 'relative',
        padding: '3rem 0 8rem',
        background: 'var(--color-base)',
      }}>
        <GradientOrbs variant="subtle" />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCategories.map((category, catIndex) => (
                <div key={category.id} style={{ marginBottom: '4rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '2px solid var(--color-blush)',
                  }}>
                    <h2 style={{
                      fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      margin: 0,
                    }}>
                      {isRtl ? category.titleAr : category.titleEn}
                    </h2>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      background: 'var(--color-blush)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '10px',
                    }}>
                      {category.items.length} {isRtl ? 'خدمة' : 'services'}
                    </span>
                  </div>

                  <div className={`category-grid ${catIndex % 2 !== 0 ? 'reverse' : ''}`}>
                    {/* Image Column */}
                    {category.image && (
                      <div className="cat-image" style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'sticky',
                        top: '100px',
                        height: '500px',
                      }}>
                        <Image 
                          src={category.image}
                          alt={category.titleEn}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}

                    {/* Service items */}
                    <div className="cat-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {category.items.map((item, index) => (
                      <GlassCard
                        key={item.id}
                        intensity="strong"
                        hover={true}
                        style={{
                          padding: '1rem 1.5rem',
                          borderRadius: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div style={{ flex: '1 1 auto', minWidth: '150px' }}>
                          <h3 style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'var(--color-text)',
                            margin: 0,
                            fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
                          }}>
                            {isRtl ? item.nameAr : item.nameEn}
                          </h3>
                          {isRtl && (
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '0.2rem 0 0', direction: 'ltr', textAlign: 'right' }}>
                              {item.nameEn}
                            </p>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                          <div style={{
                            background: 'linear-gradient(135deg, var(--color-blush), rgba(232, 213, 163, 0.3))',
                            padding: '0.4rem 1rem',
                            borderRadius: '50px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: 'var(--color-magenta)',
                            whiteSpace: 'nowrap',
                          }}>
                            {typeof item.price === 'string' && item.price.includes('–')
                              ? `${t('from')} ${item.priceFrom} ${t('aed')}`
                              : `${item.price} ${t('aed')}`
                            }
                          </div>

                          <a
                            href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(
                              isRtl
                                ? `مرحباً، أود حجز خدمة: ${item.nameAr}`
                                : `Hi, I'd like to book: ${item.nameEn}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.4rem 1rem',
                              background: 'var(--color-magenta)',
                              color: '#fff',
                              borderRadius: '50px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              transition: 'all 0.3s ease',
                              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
                            }}
                          >
                            {t('bookService')}
                          </a>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage({ params }) {
  const { locale } = use(params);
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--color-base)' }} />}>
      <ServicesPageInner locale={locale} />
    </Suspense>
  );
}
