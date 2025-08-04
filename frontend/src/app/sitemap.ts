import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cullinary-canvas.vercel.app';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/image-to-recipe`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/random-recipe`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: new Date(),
    },
  ];
}
