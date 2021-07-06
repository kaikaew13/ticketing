import request from 'supertest';
import mongoose from 'mongoose';

import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { app } from '../../app';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  return ticket;
};

it('fetches orders for a particular user', async () => {
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const user1 = global.signup();
  const user2 = global.signup();

  await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({ ticketId: ticket1.id })
    .expect(201);
  const { body: order1 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket2.id })
    .expect(201);
  const { body: order2 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  const res = await request(app)
    .get('/api/orders')
    .set('Cookie', user2)
    .expect(200);

  expect(res.body.length).toEqual(2);
  expect(res.body[0].id).toEqual(order1.id);
  expect(res.body[1].id).toEqual(order2.id);
  expect(res.body[0].ticket.id).toEqual(ticket2.id);
  expect(res.body[1].ticket.id).toEqual(ticket3.id);
});
