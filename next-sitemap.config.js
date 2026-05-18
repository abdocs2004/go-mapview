/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gomapview.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true, // Generates sitemap.xml and sitemap_index.xml
  exclude: ['/admin/*', '/api/*', '/_next/*', '/admin'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      'https://gomapview.com/sitemap.xml',
    ],
  },
}
