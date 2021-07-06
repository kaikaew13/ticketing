import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@my-ms-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: ExpirationCompleteEvent['subject'] = Subjects.ExpirationComplete;
}
