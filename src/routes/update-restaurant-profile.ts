import { Elysia, t } from 'elysia'
import { eq } from 'drizzle-orm'

import { auth } from '../auth'
import { db } from '../db/connection'
import { restaurants } from '../db/schema'

export const updateRestaurantProfile = new Elysia().use(auth).put(
  '/update-restaurant-profile',
  async ({ getCurrentUser, body, set }) => {
    const { restaurantId } = await getCurrentUser()
    const { name, description } = body

    await db
      .update(restaurants)
      .set({ name, description })
      .where(eq(restaurants.id, restaurantId))

    set.status = 204
  },
  {
    body: t.Object({ name: t.String(), description: t.Optional(t.String()) }),
  },
)
