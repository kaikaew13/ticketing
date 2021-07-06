import { Listener, OrderCancelledEvent, Subjects } from '@my-ms-tickets/common';
import { Message } from 'node-nats-streaming';

import { queueGroupName } from './queue-group-name';
import { Order, OrderStatus } from '../../models/order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: OrderCancelledEvent['subject'] = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });
    if (!order) {
      throw new Error('order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
