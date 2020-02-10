import React from 'react'
import Layout from "../components/Layout/Layout";
import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'

const AboutPage = () => (
  <Layout>
    <SEO title="Sommio" />
    <PageTitle>About this demo</PageTitle>

    <div className="max-w-xl mx-auto">
      <p>
        This demo is built using Gatsby & the{' '}
        <pre className="inline font-mono">gatsby-source-moltin</pre> plugin. All
        catalog pages are statically created at build time and all dynamic
        cart/checkout logic is performed client-side with React.
      </p>
    </div>
  </Layout>
)

export default AboutPage
