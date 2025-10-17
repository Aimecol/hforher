import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/checkout/',
        '/account/',
        '/auth/',
        '/*.json$',
        '/sitemap.xml',
      ],
    },
    sitemap: 'https://hforher.rw/sitemap.xml',
  };
}
