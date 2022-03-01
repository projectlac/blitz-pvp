import { Suspense } from "react"
import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Dashboard from "app/core/components/Dashboard"

const DashboardsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Dashboards</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Dashboard />
        </Suspense>
      </div>
    </>
  )
}

DashboardsPage.authenticate = true
DashboardsPage.getLayout = (page) => <Layout>{page}</Layout>

export default DashboardsPage
