import mongoose from 'mongoose';

import { Ticket } from '../ticket';

it('implemets optimistic concurrency control', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });
  await ticket.save();

  const firstTicket = await Ticket.findById(ticket.id);
  const secondTicket = await Ticket.findById(ticket.id);

  firstTicket!.set({ price: 100 });
  secondTicket!.set({ price: 15 });

  await firstTicket!.save();

  try {
    await secondTicket!.save();
  } catch (err) {
    return expect(err).toBeInstanceOf(mongoose.Error.VersionError);
  }
  throw new Error('should not reach here');
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '121212',
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
