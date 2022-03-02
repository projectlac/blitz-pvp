import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateShiki = z.object({
  name: z.string(),
  image: z.string(),
})

export default resolver.pipe(resolver.zod(CreateShiki), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const shiki = await db.shiki.create({ data: input })

  return shiki
})
