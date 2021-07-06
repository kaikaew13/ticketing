import { Publisher, Subjects, TicketCreatedEvent } from '@my-ms-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: TicketCreatedEvent['subject'] = Subjects.TicketCreated;
}
