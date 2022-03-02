import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetShiki = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetShiki), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const shiki = await db.shiki.findFirst({ where: { id } })

  if (!shiki) throw new NotFoundError()

  return shiki
})
