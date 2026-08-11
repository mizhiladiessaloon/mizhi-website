import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingCTA from '@/components/BookingCTA';
import { businessInfo } from '@/data/services';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'صالون ميزهي للسيدات | صالون تجميل فاخر في العين'
      : 'Mizhi Ladies Salon | Premium Beauty Salon in Al Ain, UAE',
    description: isAr
      ? 'صالون ميزهي للسيدات - صالون تجميل فاخر للسيدات فقط في المعترض، العين. خدمات خبيرة في العناية بالوجه والشعر والحناء والأظافر والشمع. احجزي الآن!'
      : 'Mizhi Ladies Salon - Premium women-only beauty salon in Al Mu\'tarid, Al Ain, UAE. Expert services in facials, hair care, henna, nails, waxing & more. Book now!',
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    other: {
      'google-site-verification': '',
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === 'ar';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'BeautySalon'],
    name: businessInfo.name,
    alternateName: businessInfo.nameAr,
    telephone: businessInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Al Ain',
      addressRegion: 'Abu Dhabi',
      addressCountry: 'AE',
      streetAddress: 'Zayed Bin Sultan St - Al Mu\'tarid - Hai Hazaa Mosque',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.coordinates.lat,
      longitude: businessInfo.coordinates.lng,
    },
    openingHours: 'Mo-Su 10:00-00:00',
    priceRange: 'AED 10 - AED 350',
    image: '/images/team.jpg',
    url: 'https://mizhisalon.ae',
  };

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <BookingCTA locale={locale} />
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
