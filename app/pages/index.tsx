import { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

import Home from "app/core/components/Home"

const IndexHome: BlitzPage = () => {
  return <Home />
}

IndexHome.suppressFirstRenderFlicker = true
IndexHome.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default IndexHome
