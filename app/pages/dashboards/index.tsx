import { Suspense } from "react"
import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Dashboard from "app/core/components/Dashboard"
import { Grid, GridItem } from "@chakra-ui/react"

const DashboardsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Dashboards</title>
      </Head>

      <div>
        <Grid h="100vh" templateColumns="250px 1fr" gap={4}>
          <GridItem colSpan={1} bg="tomato" />
          <GridItem colSpan={1} p="2">
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          </GridItem>
        </Grid>
      </div>
    </>
  )
}

DashboardsPage.authenticate = true
DashboardsPage.getLayout = (page) => <Layout>{page}</Layout>

export default DashboardsPage
