'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import SectionReveal from '@/components/SectionReveal';
import GradientOrbs from '@/components/GradientOrbs';
import { businessInfo } from '@/data/services';

export default function AboutPage({ params }) {
  const { locale } = use(params);
  const isRtl = locale === 'ar';
  const t = useTranslations('aboutPage');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContact = (e) => {
    e.preventDefault();
    const message = isRtl
      ? `مرحباً، أنا ${contactName}\n\n${contactMessage}\n\nالهاتف: ${contactPhone}\nالبريد: ${contactEmail}`
      : `Hi, I'm ${contactName}\n\n${contactMessage}\n\nPhone: ${contactPhone}\nEmail: ${contactEmail}`;
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    setContactSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(212, 168, 67, 0.15)',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    fontSize: '0.9rem',
    color: 'var(--color-text)',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
    direction: isRtl ? 'rtl' : 'ltr',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: '0.4rem',
  };

  return (
    <div style={{ fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)' }}>
      {/* Header */}
      <section style={{
        position: 'relative',
        paddingTop: '9rem',
        paddingBottom: '5rem',
        background: 'linear-gradient(rgba(255, 251, 242, 0.75), rgba(232, 213, 163, 0.85)), url("/images/about page.png") center/cover no-repeat',
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
        </div>
      </section>

      {/* Brand Story */}
      <section style={{ position: 'relative', padding: 'var(--section-pad) 0', background: 'var(--color-base)' }}>
        <GradientOrbs variant="subtle" />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <SectionReveal>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              marginBottom: '4rem',
            }}>
              <div>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'var(--color-text-light)',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                }}>
                  {t('story')}
                </p>

                {/* Women Only Card */}
                <GlassCard intensity="strong" hover={false} style={{
                  padding: '1.5rem',
                  border: '1px solid rgba(212, 168, 67, 0.15)',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(212, 168, 67, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0,
                    }}>
                      🔒
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        marginBottom: '0.4rem',
                      }}>
                        {t('womenOnly')}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.7, margin: 0 }}>
                        {t('womenOnlyDesc')}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Team Photo */}
              <GlassCard style={{ padding: '0.75rem', maxWidth: '500px', margin: '0 auto' }}>
                <div style={{ borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
                  <Image
                    src="/images/team.jpg"
                    alt="Mizhi Ladies Salon Team"
                    width={800}
                    height={600}
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              </GlassCard>
            </div>
          </SectionReveal>



          {/* Contact Section */}
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{
                fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '0.5rem',
              }}>
                {t('contactTitle')}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-light)' }}>
                {t('contactDesc')}
              </p>
            </div>
          </SectionReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}>
            {/* Contact Form */}
            <SectionReveal>
              <GlassCard intensity="strong" hover={false} style={{ padding: '2rem' }}>
                {contactSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <p style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                      {isRtl ? 'تم إرسال رسالتك!' : 'Message sent!'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>{isRtl ? 'اسمكِ' : 'Your Name'}</label>
                      <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} style={inputStyle} required />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRtl ? 'البريد الإلكتروني' : 'Email'}</label>
                      <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRtl ? 'رقم الهاتف' : 'Phone'}</label>
                      <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} style={inputStyle} required />
                    </div>
                    <div>
                      <label style={labelStyle}>{t('yourMessage')}</label>
                      <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} required />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                      {t('sendMessage')}
                    </button>
                  </form>
                )}
              </GlassCard>
            </SectionReveal>

            {/* Contact Info + Map */}
            <SectionReveal delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <GlassCard intensity="strong" hover={false} style={{ padding: '2rem' }}>
                  <h3 style={{
                    fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '1.25rem',
                  }}>
                    {t('findUs')}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                    {businessInfo.locations.map((loc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}><Image src="/images/location.png" alt="Location" width={24} height={24} unoptimized /></span>
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>
                            {isRtl ? loc.nameAr : loc.name}
                          </p>
                          <a href={loc.mapsLink} target="_blank" rel="noopener noreferrer" style={{ margin: 0, color: 'var(--color-text-light)', textDecoration: 'none' }}>
                            {isRtl ? loc.addressAr : loc.address}
                          </a>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}><Image src="/images/call icon.png" alt="Call" width={24} height={24} unoptimized /></span>
                      <a href={`tel:${businessInfo.phone}`} style={{ color: 'var(--color-magenta)', textDecoration: 'none', fontWeight: 600 }}>
                        {businessInfo.phone}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}><Image src="/images/time icon.png" alt="Time" width={24} height={24} unoptimized /></span>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>{t('hours')}</p>
                        <p style={{ margin: 0, color: 'var(--color-text-light)' }}>{t('hoursValue')}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Decorative salon image to fill the space */}
                <GlassCard intensity="strong" hover={false} style={{ padding: '0.5rem', overflow: 'hidden' }}>
                  <div style={{ borderRadius: '14px', overflow: 'hidden', height: '220px' }}>
                    <Image
                      src="/images/contact-beauty.png"
                      alt="Mizhi Ladies Salon"
                      width={500}
                      height={300}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                </GlassCard>

              </div>
            </SectionReveal>
          </div>

          {/* Maps Section */}
          <SectionReveal delay={0.2}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {businessInfo.locations.map((loc, i) => (
                <GlassCard key={i} intensity="strong" hover={false} style={{ padding: '0.5rem' }}>
                  <p style={{ margin: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)' }}>
                    <Image src="/images/location.png" alt="Location" width={16} height={16} unoptimized style={{ display: 'inline' }} /> {isRtl ? loc.nameAr : loc.name}
                  </p>
                  <div style={{ borderRadius: '14px', overflow: 'hidden', height: '250px' }}>
                    <iframe
                      src={loc.mapsEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title={loc.name}
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
