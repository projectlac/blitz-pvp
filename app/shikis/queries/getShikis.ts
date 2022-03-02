import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetShikisInput
  extends Pick<Prisma.ShikiFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetShikisInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: shikis,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.shiki.count({ where }),
      query: (paginateArgs) => db.shiki.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      shikis,
      nextPage,
      hasMore,
      count,
    }
  }
)
