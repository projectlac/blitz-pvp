import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getShikis from "app/shikis/queries/getShikis"

const ITEMS_PER_PAGE = 100

export const ShikisList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ shikis, hasMore }] = usePaginatedQuery(getShikis, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {shikis.map((shiki) => (
          <li key={shiki.id}>
            <Link href={Routes.ShowShikiPage({ shikiId: shiki.id })}>
              <a>{shiki.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ShikisPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Shikis</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewShikiPage()}>
            <a>Create Shiki</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ShikisList />
        </Suspense>
      </div>
    </>
  )
}

ShikisPage.authenticate = true
ShikisPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShikisPage
