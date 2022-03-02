import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createShiki from "app/shikis/mutations/createShiki"
import { ShikiForm, FORM_ERROR } from "app/shikis/components/ShikiForm"

const NewShikiPage: BlitzPage = () => {
  const router = useRouter()
  const [createShikiMutation] = useMutation(createShiki)

  return (
    <div>
      <h1>Create New Shiki</h1>

      <ShikiForm
        submitText="Create Shiki"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateShiki}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const shiki = await createShikiMutation(values)
            router.push(Routes.ShowShikiPage({ shikiId: shiki.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ShikisPage()}>
          <a>Shikis</a>
        </Link>
      </p>
    </div>
  )
}

NewShikiPage.authenticate = true
NewShikiPage.getLayout = (page) => <Layout title={"Create New Shiki"}>{page}</Layout>

export default NewShikiPage
