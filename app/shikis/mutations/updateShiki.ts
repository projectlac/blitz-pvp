import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateShiki = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateShiki),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const shiki = await db.shiki.update({ where: { id }, data })

    return shiki
  }
)
