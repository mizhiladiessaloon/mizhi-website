'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { businessInfo } from '@/data/services';

export default function BookingCTA({ locale }) {
  const t = useTranslations('bookingCta');
  const isRtl = locale === 'ar';

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      background: 'linear-gradient(135deg, rgba(255, 245, 224, 0.92) 0%, rgba(232, 213, 163, 0.92) 50%, rgba(212, 168, 67, 0.92) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '0.75rem 1rem',
      fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
    }}>
      <div className="section-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <a
          href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(isRtl ? 'مرحباً، أود حجز موعد في صالون ميزهي' : 'Hi, I would like to book an appointment at Mizhi Ladies Salon')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
          style={{
            padding: '0.6rem 2rem',
            fontSize: '0.95rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Image src="/images/whatsapp.png" alt="WhatsApp" width={20} height={20} style={{ objectFit: 'contain' }} unoptimized />
          {t('whatsapp')}
        </a>
      </div>
    </div>
  );
}
