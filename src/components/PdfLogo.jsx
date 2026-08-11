'use client';

import Image from 'next/image';

export default function PdfLogo({ scrolled = false, isFooter = false }) {
  // Use a sensible base width for the logo based on where it's displayed
  const baseWidth = isFooter ? 220 : (scrolled ? 140 : 180);
  const baseHeight = isFooter ? 75 : (scrolled ? 45 : 60);

  return (
    <div style={{
      position: 'relative',
      width: `${baseWidth}px`,
      height: `${baseHeight}px`,
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Image
        src="/images/mizhi-logo-master-5404px.png"
        alt="Mizhi Ladies Salon Logo"
        fill
        style={{
          objectFit: 'contain',
          objectPosition: 'left center'
        }}
        priority={!isFooter} // Load logo immediately for header
        unoptimized // Bypass cache to load the newly uploaded transparent image
      />
    </div>
  );
}
