'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import SectionReveal from '@/components/SectionReveal';
import GradientOrbs from '@/components/GradientOrbs';
import { services, signatureTreatments, businessInfo } from '@/data/services';
import { useState, use } from 'react';

export default function HomePage({ params }) {
  const { locale } = use(params);
  const isRtl = locale === 'ar';

  return (
    <div style={{ fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)' }}>
      <HeroSection locale={locale} isRtl={isRtl} />
      <WelcomeSection locale={locale} isRtl={isRtl} />
      <ServicesPreviewSection locale={locale} isRtl={isRtl} />
      <SignatureSection locale={locale} isRtl={isRtl} />
      <HomeVsSalonSection locale={locale} isRtl={isRtl} />
      <TestimonialsSection locale={locale} isRtl={isRtl} />
    </div>
  );
}

/* ============================
   HERO SECTION
   ============================ */
function HeroSection({ locale, isRtl }) {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/images/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Semi-transparent Overlay for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(160deg, rgba(255,251,242,0.85) 0%, rgba(255,245,224,0.7) 50%, rgba(232,213,163,0.85) 100%)',
      }} />

      <GradientOrbs variant="hero" />

      {/* Floral Accent - Top Right */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        [isRtl ? 'left' : 'right']: '-50px',
        width: '350px',
        height: '350px',
        backgroundImage: 'url(/images/hero-bg.png)',
        backgroundSize: 'cover',
        borderRadius: '50%',
        opacity: 0.2,
        filter: 'blur(20px)',
        zIndex: 1,
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '8rem 1.5rem 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              maxWidth: '700px',
              margin: '0 auto 1.25rem',
            }}
          >
            {t('title')}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--color-text-light)',
              maxWidth: '550px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            {t('description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a href={`/${locale}/booking`} className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              {t('cta')}
            </a>
            <a href={`/${locale}/services`} className="btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              {t('ctaSecondary')}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: '24px',
              height: '40px',
              borderRadius: '12px',
              border: '2px solid var(--color-magenta)',
              opacity: 0.4,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px',
            }}
          >
            <div style={{
              width: '4px',
              height: '8px',
              borderRadius: '2px',
              background: 'var(--color-magenta)',
            }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================
   WELCOME SECTION
   ============================ */
function WelcomeSection({ locale, isRtl }) {
  const t = useTranslations('welcome');

  return (
    <section style={{
      position: 'relative',
      padding: 'var(--section-pad) 0',
      background: 'var(--color-base)',
    }}>
      <GradientOrbs variant="subtle" />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionReveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Text */}
            <div>
              <span style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--color-blush), var(--color-rose))',
                color: 'var(--color-magenta)',
                padding: '0.4rem 1.2rem',
                borderRadius: '50px',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                letterSpacing: '0.05em',
              }}>
                🔒 {t('badge')}
              </span>

              <h2 style={{
                fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '1.25rem',
                lineHeight: 1.2,
              }}>
                {t('title')}
              </h2>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-light)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}>
                {t('description')}
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <Image src="/images/location.png" alt="Location" width={20} height={20} unoptimized />, text: t('location') },
                  { icon: <Image src="/images/location.png" alt="Location" width={20} height={20} unoptimized />, text: isRtl ? businessInfo.locations[1].nameAr : businessInfo.locations[1].name },
                  { icon: <Image src="/images/Beauty Services.png" alt="Beauty Services" width={20} height={20} unoptimized />, text: t('services') },
                  { icon: <Image src="/images/Expert Beauticians.png" alt="Expert Beauticians" width={20} height={20} unoptimized />, text: t('experience') },
                ].map((stat, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 245, 224, 0.5)',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>{stat.icon}</span>
                    {stat.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <GlassCard style={{ padding: '0.75rem', maxWidth: '650px', width: '100%', margin: '0 auto' }}>
              <div style={{ borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
                <Image
                  src="/images/Mizhi.jpg"
                  alt="Welcome to Mizhi Ladies Salon"
                  width={1200}
                  height={900}
                  style={{ width: '100%', maxHeight: '500px', display: 'block', objectFit: 'cover' }}
                />
              </div>
            </GlassCard>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ============================
   SERVICES PREVIEW SECTION
   ============================ */
function ServicesPreviewSection({ locale, isRtl }) {
  const t = useTranslations('servicesPreview');
  const categories = Object.values(services).filter(cat => cat.id !== 'henna');

  return (
    <section style={{
      position: 'relative',
      padding: 'var(--section-pad) 0',
      background: 'linear-gradient(180deg, var(--color-base) 0%, var(--color-blush) 50%, var(--color-base) 100%)',
    }}>
      <GradientOrbs variant="section" />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, var(--color-magenta), #D4247A)',
              color: '#fff',
              padding: '0.4rem 1.2rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              {t('badge')}
            </span>
            <h2 style={{
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '0.75rem',
            }}>
              {t('title')}
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-light)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              {t('description')}
            </p>
          </div>
        </SectionReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
          maxWidth: '1000px',
          margin: '0 auto 2.5rem auto'
        }}>
          {categories.map((cat, i) => (
            <SectionReveal key={cat.id} delay={i * 0.1}>
              <a href={`/${locale}/services?tab=${cat.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <GlassCard style={{ padding: '1.75rem 1.25rem', textAlign: 'center', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    marginBottom: '1rem',
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(212, 168, 67, 0.15)',
                    border: '2px solid #fff'
                  }}>
                    <Image src={cat.image} alt={cat.titleEn} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <h3 style={{
                    fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    marginBottom: '0.5rem',
                  }}>
                    {isRtl ? cat.titleAr : cat.titleEn}
                  </h3>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-magenta)',
                    fontWeight: 600,
                    margin: 0,
                  }}>
                    {t('startingFrom')} {cat.items[0]?.price || '—'} AED
                  </p>
                </GlassCard>
              </a>
            </SectionReveal>
          ))}

          {/* Henna special tile */}
          <SectionReveal delay={categories.length * 0.1}>
            <a href={`/${locale}/henna`} style={{ textDecoration: 'none', display: 'block' }}>
              <GlassCard style={{
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'linear-gradient(135deg, rgba(212, 168, 67, 0.08), rgba(232, 213, 163, 0.15))',
                border: '1px solid rgba(212, 168, 67, 0.15)',
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  marginBottom: '1rem',
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(212, 168, 67, 0.15)',
                  border: '2px solid #fff'
                }}>
                  <Image src="/images/henna.jpg" alt="Henna Services" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 style={{
                  fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: '0.5rem',
                }}>
                  {isRtl ? 'الحناء' : 'Henna'}
                </h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-magenta)',
                  fontWeight: 600,
                  margin: 0,
                }}>
                  {isRtl ? 'منزلية + صالون' : 'Home + Salon'}
                </p>
              </GlassCard>
            </a>
          </SectionReveal>
        </div>

        <SectionReveal>
          <div style={{ textAlign: 'center' }}>
            <a href={`/${locale}/services`} className="btn-secondary" style={{ fontSize: '0.95rem' }}>
              {t('viewAll')} →
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ============================
   SIGNATURE TREATMENTS SECTION
   ============================ */
function SignatureSection({ locale, isRtl }) {
  const t = useTranslations('signature');

  return (
    <section style={{
      position: 'relative',
      padding: 'var(--section-pad) 0',
      background: 'var(--color-base)',
    }}>
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'var(--color-gold)',
              color: 'var(--color-text)',
              padding: '0.4rem 1.2rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              ⭐ {t('badge')}
            </span>
            <h2 style={{
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '0.75rem',
            }}>
              {t('title')}
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-light)',
              maxWidth: '500px',
              margin: '0 auto',
            }}>
              {t('description')}
            </p>
          </div>
        </SectionReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {signatureTreatments.map((treatment, i) => (
            <SectionReveal key={treatment.id} delay={i * 0.1}>
              <GlassCard style={{ padding: '2rem 1.5rem', position: 'relative' }}>
                {/* Price badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  [isRtl ? 'left' : 'right']: '1rem',
                  background: 'linear-gradient(135deg, var(--color-magenta), #D4247A)',
                  color: '#fff',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}>
                  {treatment.price} AED
                </div>

                <div style={{
                  display: 'inline-block',
                  background: 'rgba(212, 168, 67, 0.08)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  color: 'var(--color-magenta)',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}>
                  {isRtl ? treatment.categoryAr : treatment.categoryEn}
                </div>

                <h3 style={{
                  fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: '1.25rem',
                }}>
                  {isRtl ? treatment.nameAr : treatment.nameEn}
                </h3>

                <a
                  href={`/${locale}/booking?service=${treatment.id}`}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.5rem', width: '100%', textAlign: 'center' }}
                >
                  {t('bookThis')}
                </a>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   HOME VS SALON SECTION
   ============================ */
function HomeVsSalonSection({ locale, isRtl }) {
  const t = useTranslations('homeVsSalon');
  const features = {
    home: t.raw('homeFeatures'),
    salon: t.raw('salonFeatures'),
  };

  return (
    <section style={{
      position: 'relative',
      padding: 'var(--section-pad) 0',
      background: 'linear-gradient(135deg, var(--color-blush) 0%, var(--color-rose) 50%, var(--color-blush) 100%)',
    }}>
      <GradientOrbs variant="section" />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              color: 'var(--color-magenta)',
              padding: '0.4rem 1.2rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              {t('badge')}
            </span>
            <h2 style={{
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-text)',
            }}>
              {t('title')}
            </h2>
          </div>
        </SectionReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {/* Home Service */}
          <SectionReveal direction={isRtl ? 'right' : 'left'}>
            <GlassCard intensity="strong" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <Image src="/images/home.png" alt="Home Service" width={56} height={56} style={{ objectFit: 'contain' }} />
              </div>
              <h3 style={{
                fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '0.75rem',
              }}>
                {t('homeService')}
              </h3>
              <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {t('homeDesc')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {features.home.map((feature, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-text)',
                  }}>
                    <span style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'rgba(212, 168, 67, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: 'var(--color-magenta)',
                      flexShrink: 0,
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </SectionReveal>

          {/* Salon Service */}
          <SectionReveal direction={isRtl ? 'left' : 'right'}>
            <GlassCard intensity="strong" style={{ padding: '2.5rem 2rem', border: '1px solid rgba(212, 168, 67, 0.2)' }}>
              <div style={{ marginBottom: '1rem' }}>
                <Image src="/images/spa.png" alt="Salon Service" width={56} height={56} style={{ objectFit: 'contain' }} />
              </div>
              <h3 style={{
                fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '0.75rem',
              }}>
                {t('salonService')}
              </h3>
              <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {t('salonDesc')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {features.salon.map((feature, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-text)',
                  }}>
                    <span style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'rgba(212, 168, 67, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: 'var(--color-magenta)',
                      flexShrink: 0,
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================
   TESTIMONIALS SECTION
   ============================ */
function TestimonialsSection({ locale, isRtl }) {
  const t = useTranslations('testimonials');
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = t.raw('items');

  return (
    <section style={{
      position: 'relative',
      padding: 'var(--section-pad) 0',
      background: 'var(--color-base)',
    }}>
      <GradientOrbs variant="subtle" />
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, var(--color-blush), var(--color-rose))',
              color: 'var(--color-magenta)',
              padding: '0.4rem 1.2rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '1rem',
            }}>
              💕 {t('badge')}
            </span>
            <h2 style={{
              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-text)',
            }}>
              {t('title')}
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <GlassCard intensity="strong" hover={false} style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3, color: 'var(--color-magenta)' }}>❝</div>

              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}
              >
                {testimonials[activeIndex].text}
              </motion.p>

              <motion.div
                key={`author-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <p style={{
                  fontWeight: 700,
                  color: 'var(--color-magenta)',
                  marginBottom: '0.25rem',
                  fontSize: '1rem',
                }}>
                  {testimonials[activeIndex].author}
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                  margin: 0,
                }}>
                  {testimonials[activeIndex].service}
                </p>
              </motion.div>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: activeIndex === i ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: activeIndex === i ? 'var(--color-magenta)' : 'var(--color-rose)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </GlassCard>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
