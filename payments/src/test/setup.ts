import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

let mongo: any;

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51IhFf7LEIM0K4ZYETVgCrIQWn1F1kbQ23hPe6Fjprk3DIPtr86kZs0pop3hAcQBNBnuspHka5YktiQP0WYfBTTLm00JNP6yJ0M';

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfs';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

export const signup = (id?: string) => {
  // build a jwt payload : {id,email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object {jwt: MY_JWT}
  const session = { jwt: token };

  //turn session into json
  const sessionJSON = JSON.stringify(session);

  // take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string (cookie)

  return [`express:sess=${base64}`];
};
