'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import SectionReveal from '@/components/SectionReveal';
import GradientOrbs from '@/components/GradientOrbs';

const galleryItems = [
  { src: '/images/facial.png', category: 'face', titleEn: 'Gold Facial Treatment', titleAr: 'فيشل ذهبي' },
  { src: '/images/hair.png', category: 'hair', titleEn: 'Professional Hair Styling', titleAr: 'تصفيف شعر محترف' },
  { src: '/images/nails.png', category: 'nails', titleEn: 'Elegant Nail Art', titleAr: 'فن الأظافر الأنيق' },
  { src: '/images/henna-1.png', category: 'henna', titleEn: 'Intricate Henna Design', titleAr: 'تصميم حناء معقد' },
  { src: '/images/henna-2.png', category: 'henna', titleEn: 'Bridal Henna', titleAr: 'حناء عرائس' },
  { src: '/images/team.jpg', category: 'face', titleEn: 'Our Expert Team', titleAr: 'فريقنا المحترف' },
];

const filterKeys = ['all', 'face', 'hair', 'nails', 'henna'];

export default function GalleryPage({ params }) {
  const { locale } = use(params);
  const isRtl = locale === 'ar';
  const t = useTranslations('galleryPage');
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div style={{ fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)' }}>
      {/* Header */}
      <section style={{
        position: 'relative',
        paddingTop: '8rem',
        paddingBottom: '3rem',
        background: 'linear-gradient(160deg, #FFFBF2 0%, #FFF5E0 50%, #E8D5A3 100%)',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
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
            style={{ fontSize: '1.05rem', color: 'var(--color-text-light)', maxWidth: '550px', margin: '0 auto' }}
          >
            {t('description')}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section style={{
        position: 'sticky',
        top: '60px',
        zIndex: 30,
        background: 'rgba(255, 248, 250, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        padding: '0.75rem 0',
      }}>
        <div className="section-container" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {filterKeys.map(key => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                background: activeFilter === key ? 'var(--color-magenta)' : 'rgba(255, 245, 224, 0.6)',
                color: activeFilter === key ? '#fff' : 'var(--color-text)',
                fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
              }}
            >
              {t(key)}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{ position: 'relative', padding: '3rem 0 8rem', background: 'var(--color-base)' }}>
        <div className="section-container">
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <GlassCard
                    style={{ padding: '0.5rem', cursor: 'pointer' }}
                    onClick={() => setLightbox(item)}
                  >
                    <div style={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '4/3' }}>
                      <Image
                        src={item.src}
                        alt={isRtl ? item.titleAr : item.titleEn}
                        width={600}
                        height={450}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>
                    <p style={{
                      textAlign: 'center',
                      padding: '0.75rem',
                      fontSize: '0.9rem',
                      color: 'var(--color-text)',
                      fontWeight: 500,
                      margin: 0,
                    }}>
                      {isRtl ? item.titleAr : item.titleEn}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(43, 30, 36, 0.9)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}
            >
              <Image
                src={lightbox.src}
                alt={isRtl ? lightbox.titleAr : lightbox.titleEn}
                width={1200}
                height={900}
                style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '12px' }}
              />
              <p style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: '1rem',
                marginTop: '1rem',
                fontWeight: 500,
              }}>
                {isRtl ? lightbox.titleAr : lightbox.titleEn}
              </p>
              <button
                onClick={() => setLightbox(null)}
                style={{
                  position: 'absolute',
                  top: '-1rem',
                  right: '-1rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--color-magenta)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
