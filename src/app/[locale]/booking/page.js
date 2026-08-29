'use client';

import { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import SectionReveal from '@/components/SectionReveal';
import GradientOrbs from '@/components/GradientOrbs';
import { services, allServices, businessInfo } from '@/data/services';

function CustomSelect({ value, onChange, options, placeholder, isRtl }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value);

  return (
    <div style={{ position: 'relative' }}>
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
        />
      )}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.85rem 1rem',
          borderRadius: '12px',
          border: '1px solid rgba(212, 168, 67, 0.25)',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          fontSize: '0.9rem',
          color: selectedOption ? 'var(--color-text)' : 'rgba(0,0,0,0.5)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: isRtl ? 'rtl' : 'ltr',
          transition: 'all 0.3s ease',
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', fontSize: '0.7rem', opacity: 0.6 }}>▼</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '0.5rem',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(212, 168, 67, 0.2)',
              borderRadius: '12px',
              overflow: 'hidden',
              zIndex: 50,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              maxHeight: '250px',
              overflowY: 'auto',
            }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text)',
                  background: value === opt.value ? 'rgba(212, 168, 67, 0.15)' : 'transparent',
                  direction: isRtl ? 'rtl' : 'ltr',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (value !== opt.value) e.target.style.background = 'rgba(255,255,255,0.6)';
                }}
                onMouseLeave={(e) => {
                  if (value !== opt.value) e.target.style.background = 'transparent';
                }}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BookingPage({ params }) {
  const { locale } = use(params);
  const isRtl = locale === 'ar';
  const t = useTranslations('bookingPage');
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('');
  const [service, setService] = useState('');
  const [mode, setMode] = useState('salon');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const categoryOptions = Object.values(services).filter(cat => cat.items && cat.items.length > 0);
  const serviceOptions = category ? (services[category]?.items || []) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedService = serviceOptions.find(s => s.id === service);
    const message = isRtl
      ? `مرحباً، أود حجز موعد:\n\nالخدمة: ${selectedService?.nameAr || ''}\nالنوع: ${mode === 'home' ? 'منزلية' : 'صالون'}\nالتاريخ: ${date}\nالوقت: ${time}\nالاسم: ${name}\nالهاتف: ${phone}\n${notes ? `ملاحظات: ${notes}` : ''}`
      : `Hi, I'd like to book an appointment:\n\nService: ${selectedService?.nameEn || ''}\nType: ${mode === 'home' ? 'Home Service' : 'At Salon'}\nDate: ${date}\nTime: ${time}\nName: ${name}\nPhone: ${phone}\n${notes ? `Notes: ${notes}` : ''}`;

    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
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
    fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
  };

  return (
    <div style={{ fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)' }}>
      {/* Header */}
      <section style={{
        position: 'relative',
        paddingTop: '9rem',
        paddingBottom: '5rem',
        background: 'linear-gradient(rgba(255, 251, 242, 0.75), rgba(232, 213, 163, 0.85)), url("/images/booking page bg.webp") center/cover no-repeat',
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
            style={{ fontSize: '1.05rem', color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}
          >
            {t('description')}
          </motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section style={{ position: 'relative', padding: '3rem 0 8rem', background: 'var(--color-base)' }}>
        <GradientOrbs variant="subtle" />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {/* Form */}
            <SectionReveal>
              {submitted ? (
                <GlassCard intensity="strong" hover={false} style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                  <h2 style={{
                    fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '1rem',
                  }}>
                    {t('submitted')}
                  </h2>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                    style={{ fontSize: '0.9rem' }}
                  >
                    {isRtl ? 'حجز آخر' : 'Book Another'}
                  </button>
                </GlassCard>
              ) : (
                <GlassCard intensity="strong" hover={false} style={{ padding: '2rem' }}>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Service Category */}
                    <div>
                      <label style={labelStyle}>{t('serviceType')}</label>
                      <CustomSelect
                        value={category}
                        onChange={(val) => { setCategory(val); setService(''); }}
                        placeholder={t('selectCategory')}
                        options={categoryOptions.map(cat => ({
                          value: cat.id,
                          label: isRtl ? cat.titleAr : cat.titleEn
                        }))}
                        isRtl={isRtl}
                      />
                    </div>

                    {/* Specific Service */}
                    {category && (
                      <div>
                        <CustomSelect
                          value={service}
                          onChange={(val) => setService(val)}
                          placeholder={t('selectService')}
                          options={serviceOptions.map(s => ({
                            value: s.id,
                            label: `${isRtl ? s.nameAr : s.nameEn} — ${s.price} AED`
                          }))}
                          isRtl={isRtl}
                        />
                      </div>
                    )}

                    {/* Service Mode */}
                    <div>
                      <label style={labelStyle}>{t('serviceMode')}</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['salon', 'home'].map(m => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMode(m)}
                            style={{
                              flex: 1,
                              padding: '0.75rem',
                              borderRadius: '12px',
                              border: mode === m ? '2px solid var(--color-magenta)' : '1px solid rgba(212, 168, 67, 0.15)',
                              background: mode === m ? 'rgba(212, 168, 67, 0.08)' : 'rgba(255, 255, 255, 0.5)',
                              color: mode === m ? 'var(--color-magenta)' : 'var(--color-text-light)',
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
                            }}
                          >
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                              {m === 'salon'
                                ? <><Image src="/images/spa.png" alt="Salon" width={16} height={16} unoptimized style={{ filter: mode === m ? 'none' : 'grayscale(100%) opacity(60%)' }} /> {t('salon')}</>
                                : <><Image src="/images/home.png" alt="Home" width={16} height={16} unoptimized style={{ filter: mode === m ? 'none' : 'grayscale(100%) opacity(60%)' }} /> {t('home')}</>
                              }
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={labelStyle}>{t('preferredDate')}</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} required />
                      </div>
                      <div>
                        <label style={labelStyle}>{t('preferredTime')}</label>
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} required />
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label style={labelStyle}>{t('yourName')}</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={labelStyle}>{t('phoneNumber')}</label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} required />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>{t('email')}</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                    </div>

                    {/* Notes */}
                    <div>
                      <label style={labelStyle}>{t('notes')}</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}>
                      {t('submit')}
                    </button>
                  </form>
                </GlassCard>
              )}
            </SectionReveal>

            {/* Quick Contact */}
            <SectionReveal delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <GlassCard intensity="strong" hover={false} style={{ padding: '2rem', textAlign: 'center' }}>
                  <h3 style={{
                    fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-heading)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '0.5rem',
                  }}>
                    {t('quickBook')}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>
                    {t('orContact')}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <a
                      href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(isRtl ? 'مرحباً، أود حجز موعد' : 'Hi, I would like to book an appointment')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp"
                      style={{ width: '100%', fontSize: '0.95rem' }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                        <Image src="/images/whatsapp.png" alt="WhatsApp" width={20} height={20} unoptimized /> WhatsApp
                      </span>
                    </a>
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="btn-secondary"
                      style={{ width: '100%', fontSize: '0.95rem', textAlign: 'center' }}
                    >
                      <Image src="/images/call icon.png" alt="Call" width={20} height={20} unoptimized style={{ display: 'inline' }} /> {businessInfo.phone}
                    </a>
                  </div>
                </GlassCard>

                {/* Decorative image to fill the space */}
                <GlassCard intensity="strong" hover={false} style={{ padding: '0.5rem', overflow: 'hidden', flex: 1, display: 'flex' }}>
                  <div style={{ borderRadius: '14px', overflow: 'hidden', width: '100%', minHeight: '300px' }}>
                    <Image
                      src="/images/booking page img.webp"
                      alt="Mizhi Ladies Salon"
                      width={600}
                      height={800}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                </GlassCard>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
