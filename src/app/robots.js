export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://www.mizhi.ae/sitemap.xml',
    host: 'https://www.mizhi.ae',
  };
}
