import {
  Publisher,
  PaymentCreatedEvent,
  Subjects,
} from '@my-ms-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: PaymentCreatedEvent['subject'] = Subjects.PaymentCreated;
}
