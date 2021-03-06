'use strict'

module.exports = {
  siteMetadata: {
    title: 'if day has to become night',
    description: 'Words',
    siteUrl: 'https://trumanshuck.com',
    author: {
      name: 'Truman Shuck',
      url: 'https://trumanshuck.com',
      email: 'truman.shuck@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-mdx',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `Truman Shuck`,
        short_name: `Truman Shuck`,
        start_url: `/`,
        background_color: `#1A202C`,
        theme_color: `#319795`,
        display: `standalone`,
        icon: `src/images/favicon.png`
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/
        }
      }
    }
  ]
}
