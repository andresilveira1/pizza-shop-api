import { Elysia, t } from 'elysia'
import { eq } from 'drizzle-orm'

import { auth } from '../auth'
import { UnauthorizedError } from '../utils/errors/unauthorized-error'
import { db } from '../db/connection'
import { orders } from '../db/schema'

export const approveOrder = new Elysia().use(auth).patch(
  '/orders/:orderId/approve',
  async ({ getCurrentUser, set, params }) => {
    const { orderId } = params
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError()
    }

    const order = await db.query.orders.findFirst({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.id, orderId),
          operators.eq(fields.restaurantId, restaurantId),
        )
      },
    })

    if (!order) {
      set.status = 400

      return { message: 'Order not found.' }
    }

    if (order.status !== 'pending') {
      set.status = 400

      return { message: 'You can only approve pending orders.' }
    }

    await db
      .update(orders)
      .set({ status: 'processing' })
      .where(eq(orders.id, orderId))
  },
  {
    params: t.Object({ orderId: t.String() }),
  },
)
