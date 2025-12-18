import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jules Deschamps - Portfolio',
    short_name: 'Jules Deschamps',
    description: 'Portfolio de Jules Deschamps, développeur web',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/img/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

