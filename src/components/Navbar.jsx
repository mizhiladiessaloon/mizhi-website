'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
const PdfLogo = dynamic(() => import('./PdfLogo'), { ssr: false });

const navLinks = [
  { key: 'home', href: '' },
  { key: 'services', href: '/services' },
  { key: 'henna', href: '/henna' },
  { key: 'booking', href: '/booking' },
  { key: 'about', href: '/about' },
];

export default function Navbar({ locale }) {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRtl = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath}`);
  };

  const isActive = (href) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    if (href === '') return currentPath === '/' || currentPath === '';
    return currentPath.startsWith(href);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(255, 251, 242, 0.85)' : 'rgba(255, 255, 255, 0.2)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(12px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(212, 168, 67, 0.06)' : 'none',
          padding: scrolled ? '0.5rem 0' : '1rem 0',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center gap-2 no-underline" style={{ pointerEvents: 'auto' }}>
            <PdfLogo scrolled={scrolled} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={`/${locale}${link.href}`}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: isActive(link.href) ? 600 : 400,
                  color: isActive(link.href) ? 'var(--color-magenta)' : 'var(--color-text)',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  background: isActive(link.href) ? 'rgba(212, 168, 67, 0.08)' : 'transparent',
                  fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href)) {
                    e.target.style.color = 'var(--color-magenta)';
                    e.target.style.background = 'rgba(212, 168, 67, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href)) {
                    e.target.style.color = 'var(--color-text)';
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Right side: lang toggle + Book Now */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={switchLocale}
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-text-light)',
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212, 168, 67, 0.15)',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: locale === 'en' ? 'var(--font-arabic)' : 'var(--font-body)',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--color-magenta)';
                e.target.style.color = 'var(--color-magenta)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(212, 168, 67, 0.15)';
                e.target.style.color = 'var(--color-text-light)';
              }}
            >
              {t('langSwitch')}
            </button>
            <a href={`/${locale}/booking`} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>
              {t('bookNow')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-text)', borderRadius: '2px', transition: 'background 0.3s' }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              style={{ display: 'block', width: '24px', height: '2px', background: 'var(--color-text)', borderRadius: '2px', transition: 'background 0.3s' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(26, 26, 26, 0.3)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                [isRtl ? 'left' : 'right']: 0,
                width: '80%',
                maxWidth: '320px',
                height: '100%',
                background: 'rgba(255, 251, 242, 0.95)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                padding: '5rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: '-10px 0 40px rgba(212, 168, 67, 0.1)',
              }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '1.05rem',
                    fontWeight: isActive(link.href) ? 600 : 400,
                    color: isActive(link.href) ? 'var(--color-magenta)' : 'var(--color-text)',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    background: isActive(link.href) ? 'rgba(212, 168, 67, 0.08)' : 'transparent',
                    fontFamily: isRtl ? 'var(--font-arabic)' : 'var(--font-body)',
                  }}
                >
                  {t(link.key)}
                </motion.a>
              ))}

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => { switchLocale(); setMobileOpen(false); }}
                  style={{
                    padding: '0.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--color-text-light)',
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(212, 168, 67, 0.15)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontFamily: locale === 'en' ? 'var(--font-arabic)' : 'var(--font-body)',
                  }}
                >
                  {t('langSwitch')}
                </button>
                <a
                  href={`/${locale}/booking`}
                  className="btn-primary"
                  style={{ textAlign: 'center', fontSize: '0.95rem' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t('bookNow')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
