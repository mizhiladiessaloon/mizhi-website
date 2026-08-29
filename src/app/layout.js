import './globals.css';

export const metadata = {
  title: 'Mizhi Ladies Salon | Premium Beauty Salon in Al Ain, UAE',
  description: 'Mizhi Ladies Salon - Premium women-only beauty salon in Al Mu\'tarid, Al Ain, UAE. Expert services in facials, hair care, henna, nails, waxing & more. Book now!',
  keywords: 'ladies salon Al Ain, beauty salon Al Mu\'tarid, hair salon Al Ain UAE, henna home service Al Ain, صالون نسائي العين, صالون تجميل العين',
  icons: {
    icon: [
      { url: '/images/mizhi-logo-800px.png', type: 'image/png', sizes: '800x800' },
    ],
    apple: [
      { url: '/images/mizhi-logo-800px.png', type: 'image/png', sizes: '800x800' },
    ],
    shortcut: '/images/mizhi-logo-800px.png',
  },
  openGraph: {
    title: 'Mizhi Ladies Salon | Premium Beauty Salon in Al Ain, UAE',
    description: 'Premium women-only beauty salon in Al Mu\'tarid, Al Ain. Expert facials, hair, henna, nails & more.',
    type: 'website',
    images: [{ url: '/images/mizhi-logo-800px.png' }],
  },
};

export default function RootLayout({ children }) {
  return children;
}
