import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getShiki from "app/shikis/queries/getShiki"
import deleteShiki from "app/shikis/mutations/deleteShiki"

export const Shiki = () => {
  const router = useRouter()
  const shikiId = useParam("shikiId", "number")
  const [deleteShikiMutation] = useMutation(deleteShiki)
  const [shiki] = useQuery(getShiki, { id: shikiId })

  return (
    <>
      <Head>
        <title>Shiki {shiki.id}</title>
      </Head>

      <div>
        <h1>Shiki {shiki.id}</h1>
        <pre>{JSON.stringify(shiki, null, 2)}</pre>

        <Link href={Routes.EditShikiPage({ shikiId: shiki.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteShikiMutation({ id: shiki.id })
              router.push(Routes.ShikisPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowShikiPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ShikisPage()}>
          <a>Shikis</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Shiki />
      </Suspense>
    </div>
  )
}

ShowShikiPage.authenticate = true
ShowShikiPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowShikiPage
