import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getShiki from "app/shikis/queries/getShiki"
import updateShiki from "app/shikis/mutations/updateShiki"
import { ShikiForm, FORM_ERROR } from "app/shikis/components/ShikiForm"

export const EditShiki = () => {
  const router = useRouter()
  const shikiId = useParam("shikiId", "number")
  const [shiki, { setQueryData }] = useQuery(
    getShiki,
    { id: shikiId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateShikiMutation] = useMutation(updateShiki)

  return (
    <>
      <Head>
        <title>Edit Shiki {shiki.id}</title>
      </Head>

      <div>
        <h1>Edit Shiki {shiki.id}</h1>
        <pre>{JSON.stringify(shiki, null, 2)}</pre>

        <ShikiForm
          submitText="Update Shiki"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateShiki}
          initialValues={shiki}
          onSubmit={async (values) => {
            try {
              const updated = await updateShikiMutation({
                id: shiki.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowShikiPage({ shikiId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditShikiPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditShiki />
      </Suspense>

      <p>
        <Link href={Routes.ShikisPage()}>
          <a>Shikis</a>
        </Link>
      </p>
    </div>
  )
}

EditShikiPage.authenticate = true
EditShikiPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditShikiPage
