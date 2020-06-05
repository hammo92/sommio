const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  siteMetadata: {
    title: 'Sommio',
    description: 'Sommio',
    author: '',
    url: process.env.DEPLOY_PRIME_URL || process.env.URL || 'localhost:8000'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, `src`, `images`)
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-component']
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `1eaguqndmewd`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#131313',
        theme_color: '#131313',
        display: 'minimal-ui',
        icon: 'src/images/i-love-lamp-icon.png'
      }
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-transition-link'
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/styles/main.css']
      }
    },

    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svgImages/ // See below to configure properly
        }
      }
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: "https://builton-61902.firebaseio.com",
          projectId: "builton-61902",
          storageBucket: "builton-61902.appspot.com",
          messagingSenderId: "745570464230",
          appId: "1:745570464230:web:43cc5861f629f575166627",
          measurementId: "G-PWPJD009SL"

        }
      }
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          'https://images.ctfassets.net',
          'https://p.typekit.net',
          'https://cdnjs.cloudflare.com',
          'https://securetoken.googleapis.com',
          'https://use.typekit.net',
        ],
      },
    },
    
    
    {
      resolve: `gatsby-builton`,
      options: {
        apiKey:
          'Rqd56FLNq539fNET8PGvIsA9kNkr12dkyHwk8SLyLtKISlMgEJ-cyQ3aTKtQapYxXNwx-u18dByEnViH59QBBQ=='
      }
    },
    `gatsby-plugin-netlify`,

    'gatsby-plugin-stripe',
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: false,
      },
    }
  ]
}
