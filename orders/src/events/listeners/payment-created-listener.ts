import { Listener, PaymentCreatedEvent, Subjects } from '@my-ms-tickets/common';
import { Message } from 'node-nats-streaming';

import { queueGroupName } from './queue-group-name';
import { Order, OrderStatus } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: PaymentCreatedEvent['subject'] = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error('order not found');
    }

    order.set({
      status: OrderStatus.Completed,
    });
    await order.save();

    msg.ack();
  }
}
