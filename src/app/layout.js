import './globals.css';

export const metadata = {
  title: 'Mizhi Ladies Salon | Premium Beauty Salon in Al Ain, UAE',
  description: 'Mizhi Ladies Salon - Premium women-only beauty salon in Al Mu\'tarid, Al Ain, UAE. Expert services in facials, hair care, henna, nails, waxing & more. Book now!',
  keywords: 'ladies salon Al Ain, beauty salon Al Mu\'tarid, hair salon Al Ain UAE, henna home service Al Ain, صالون نسائي العين, صالون تجميل العين',
  icons: {
    icon: [
      { url: '/images/logo.webp', type: 'image/webp' },
    ],
    apple: [
      { url: '/images/logo.webp', type: 'image/webp' },
    ],
    shortcut: '/images/logo.webp',
  },
  verification: {
    google: '2HfIfxTBA83grv00X3Co3as1qdvO19N-ft6ruT3ez3I',
  },
  openGraph: {
    title: 'Mizhi Ladies Salon | Premium Beauty Salon in Al Ain, UAE',
    description: 'Premium women-only beauty salon in Al Mu\'tarid, Al Ain. Expert facials, hair, henna, nails & more.',
    type: 'website',
    images: [{ url: '/images/logo.webp' }],
  },
};

export default function RootLayout({ children }) {
  return children;
}
