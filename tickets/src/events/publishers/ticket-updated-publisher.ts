import { Publisher, Subjects, TicketUpdatedEvent } from '@my-ms-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: TicketUpdatedEvent['subject'] = Subjects.TicketUpdated;
}
