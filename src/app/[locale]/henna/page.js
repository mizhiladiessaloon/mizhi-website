'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import SectionReveal from '@/components/SectionReveal';
import GradientOrbs from '@/components/GradientOrbs';
import { services, businessInfo } from '@/data/services';

export default function HennaPage({ params }) {
  const { locale } = use(params);
  const isRtl = locale === 'ar';
  const t = useTranslations('hennaPage');
  const [activeMode, setActiveMode] = useState('salon');

  const hennaData = services.henna;
  const currentData = activeMode === 'home' ? hennaData.home : hennaData.salon;

  return (
    <div style={{ fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)' }}>
      {/* Header */}
      <section style={{
        position: 'relative',
        paddingTop: '9rem',
        paddingBottom: '5rem',
        background: 'linear-gradient(rgba(255, 251, 242, 0.75), rgba(232, 213, 163, 0.85)), url("/images/henna services.webp") center/cover no-repeat',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <GradientOrbs variant="hero" />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '0.75rem',
            }}>
              {t('title')}
            </h1>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-light)',
              maxWidth: '550px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              {t('description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mode Toggle */}
      <section style={{
        padding: '2rem 0',
        background: 'var(--color-base)',
      }}>
        <div className="section-container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            background: 'var(--color-blush)',
            padding: '0.35rem',
            borderRadius: '50px',
            maxWidth: '400px',
            margin: '0 auto',
          }}>
            {['salon', 'home'].map(mode => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  background: activeMode === mode ? 'var(--color-magenta)' : 'transparent',
                  color: activeMode === mode ? '#fff' : 'var(--color-text)',
                  fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
                }}
              >
                {mode === 'home' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Image src="/images/home.png" alt="" width={18} height={18} style={{ objectFit: 'contain', filter: activeMode === mode ? 'brightness(0) invert(1)' : 'none' }} />
                    <span>{t('homeService')}</span>
                  </span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Image src="/images/spa.png" alt="" width={18} height={18} style={{ objectFit: 'contain', filter: activeMode === mode ? 'brightness(0) invert(1)' : 'none' }} />
                    <span>{t('salonService')}</span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section style={{
        position: 'relative',
        padding: '2rem 0 4rem',
        background: 'var(--color-base)',
      }}>
        <GradientOrbs variant="subtle" />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}>
            {/* Hand Designs */}
            <SectionReveal>
              <GlassCard intensity="strong" hover={false} style={{ padding: '2rem' }}>
                <h3 style={{
                  fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  {t('hand')}
                </h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  marginBottom: '1.5rem',
                }}>
                  {isRtl ? currentData.titleAr : currentData.titleEn}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentData.hand.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 245, 224, 0.3)',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>
                        {isRtl ? item.nameAr : item.nameEn}
                      </span>
                      <span style={{
                        fontWeight: 700,
                        color: 'var(--color-magenta)',
                        fontSize: '0.95rem',
                      }}>
                        {item.price} {isRtl ? 'د.إ' : 'AED'}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </SectionReveal>

            {/* Leg Designs */}
            <SectionReveal delay={0.1}>
              <GlassCard intensity="strong" hover={false} style={{ padding: '2rem' }}>
                <h3 style={{
                  fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  {t('leg')}
                </h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  marginBottom: '1.5rem',
                }}>
                  {isRtl ? currentData.titleAr : currentData.titleEn}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentData.leg.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        background: 'rgba(255, 245, 224, 0.3)',
                        borderRadius: '12px',
                      }}
                    >
                      <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>
                        {isRtl ? item.nameAr : item.nameEn}
                      </span>
                      <span style={{
                        fontWeight: 700,
                        color: 'var(--color-magenta)',
                        fontSize: '0.95rem',
                      }}>
                        {item.price} {isRtl ? 'د.إ' : 'AED'}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </SectionReveal>
          </div>

          {/* Book Henna CTA */}
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <a
                href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(
                  isRtl
                    ? `مرحباً، أود حجز خدمة حناء (${activeMode === 'home' ? 'منزلية' : 'صالون'})`
                    : `Hi, I'd like to book a henna service (${activeMode === 'home' ? 'Home' : 'Salon'})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}
              >
                {t('bookHenna')}
              </a>
            </div>
          </SectionReveal>

          {/* Henna Gallery */}
          <SectionReveal>
            <h2 style={{
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}>
              {t('gallery')}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.25rem',
            }}>
              {['/images/henna-1.webp', '/images/henna-2.webp', '/images/henna-3.webp', '/images/henna-4.webp'].map((src, i) => (
                <GlassCard key={i} style={{ padding: '0.5rem' }}>
                  <div style={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '1' }}>
                    <Image
                      src={src}
                      alt={`Henna design ${i + 1}`}
                      width={400}
                      height={400}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </GlassCard>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
