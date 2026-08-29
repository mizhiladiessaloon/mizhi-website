export default function sitemap() {
  const baseUrl = 'https://www.mizhi.ae';
  const locales = ['en', 'ar'];
  const pages = ['', '/services', '/henna', '/booking', '/about', '/gallery'];

  const urls = [];

  for (const locale of locales) {
    for (const page of pages) {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  return urls;
}
