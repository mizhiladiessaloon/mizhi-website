'use client';

import { useTranslations } from 'next-intl';
import { businessInfo } from '@/data/services';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const PdfLogo = dynamic(() => import('./PdfLogo'), { ssr: false });

export default function Footer({ locale }) {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const isRtl = locale === 'ar';

  const quickLinks = [
    { key: 'home', href: `/${locale}` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'henna', href: `/${locale}/henna` },
    { key: 'booking', href: `/${locale}/booking` },
    { key: 'about', href: `/${locale}/about` },
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #4A3722 0%, #634B30 50%, #4A3722 100%)',
      color: '#FFF5E0',
      paddingTop: '4rem',
      paddingBottom: '6rem',
      fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
    }}>
      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: '1rem', display: 'inline-block' }}>
              <PdfLogo isFooter={true} />
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.7, maxWidth: '280px' }}>
              {t('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--color-rose)', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)' }}>
              {t('quickLinks')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {quickLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease',
                    fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-rose)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                >
                  {navT(link.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: 'var(--color-rose)', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)' }}>
              {t('contactInfo')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <a href={`tel:${businessInfo.phone}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', width: '20px', justifyContent: 'center' }}><Image src="/images/call icon.png" alt="Call" width={20} height={20} style={{ objectFit: 'contain' }} unoptimized /></span> {businessInfo.phone}
              </a>
              <a href={`https://wa.me/${businessInfo.whatsapp}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }} target="_blank" rel="noopener noreferrer">
                <span style={{ display: 'inline-flex', alignItems: 'center', width: '20px', justifyContent: 'center' }}><Image src="/images/whatsapp icon.png" alt="WhatsApp" width={20} height={20} style={{ objectFit: 'contain' }} unoptimized /></span> WhatsApp
              </a>
              {businessInfo.locations.map((loc, i) => (
                <a key={i} href={loc.mapsLink} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', width: '20px', justifyContent: 'center', marginTop: '2px' }}><Image src="/images/location.png" alt="Location" width={20} height={20} style={{ objectFit: 'contain' }} unoptimized /></span> <span style={{ flex: 1, lineHeight: 1.5 }}>{isRtl ? loc.addressAr : loc.address}</span>
                </a>
              ))}
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem', opacity: 0.7 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', width: '20px', justifyContent: 'center' }}><Image src="/images/time icon.png" alt="Time" width={20} height={20} style={{ objectFit: 'contain' }} unoptimized /></span> {isRtl ? businessInfo.hoursAr : businessInfo.hours}
              </p>
            </div>
          </div>

          {/* Social & Map */}
          <div>
            <h4 style={{ color: 'var(--color-rose)', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)' }}>
              {t('followUs')}
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { name: 'Facebook', url: businessInfo.social.facebook, img: '/images/facebook.png' },
                { name: 'Instagram', url: businessInfo.social.instagram, img: '/images/instagram.png' },
                { name: 'Snapchat', url: businessInfo.social.snapchat, img: '/images/snapchat.png' },
                { name: 'TikTok', url: businessInfo.social.tiktok, img: '/images/tik-tok.png' },
                { name: 'YouTube', url: businessInfo.social.youtube, img: '/images/youtube.png' },
              ].map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Image src={social.img} alt={social.name} width={32} height={32} style={{ objectFit: 'contain' }} unoptimized />
                </a>
              ))}
            </div>
            {/* Map Embed */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '120px', opacity: 0.8 }}>
              <iframe
                src={businessInfo.mapsEmbed}
                width="100%"
                height="120"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mizhi Ladies Salon Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          opacity: 0.5,
        }}>
          © {new Date().getFullYear()} {businessInfo.name}. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
