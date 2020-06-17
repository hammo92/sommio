import React, {useState} from 'react'
import Layout from "../components/Layout/Layout";
import SEO from '../components/SEO'


const NotFoundPage = () => {
  const [clicked, setClicked] = useState(false)
  const onclick = () => {
    setClicked(!clicked)
  }
  
  return(
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
  )
}

export default NotFoundPage
