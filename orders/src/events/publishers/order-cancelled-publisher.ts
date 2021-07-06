import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@my-ms-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: OrderCancelledEvent['subject'] = Subjects.OrderCancelled;
}
