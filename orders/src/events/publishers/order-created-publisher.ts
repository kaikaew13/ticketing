import { Publisher, OrderCreatedEvent, Subjects } from '@my-ms-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: OrderCreatedEvent['subject'] = Subjects.OrderCreated;
}
