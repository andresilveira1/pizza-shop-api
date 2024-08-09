import { Elysia, t } from 'elysia'
import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'

import { db } from '../db/connection'
import { auth } from '../auth'
import { authLinks } from '../db/schema'

export const authenticateFromLink = new Elysia().use(auth).get(
  '/auth-links/authenticate',
  async ({ query, signUser, redirect }) => {
    const { code, redirect: redirectUrl } = query

    const authLinkFromCode = await db.query.authLinks.findFirst({
      where(fields, operators) {
        return operators.eq(fields.code, code)
      },
    })

    if (!authLinkFromCode) {
      throw new Error('Auth link not found.')
    }

    const daysSinceAuthLinkWasCreated = dayjs().diff(
      authLinkFromCode.createdAt,
      'days',
    )

    if (daysSinceAuthLinkWasCreated > 7) {
      throw new Error('Auth link expired, please generate a new one.')
    }

    const managedRestaurant = await db.query.restaurants.findFirst({
      where(fields, operators) {
        return operators.eq(fields.managerId, authLinkFromCode.userId)
      },
    })

    await signUser({
      sub: authLinkFromCode.userId,
      restaurantId: managedRestaurant?.id,
    })

    await db.delete(authLinks).where(eq(authLinks.code, code))

    redirect(redirectUrl)
  },
  { query: t.Object({ code: t.String(), redirect: t.String() }) },
)
