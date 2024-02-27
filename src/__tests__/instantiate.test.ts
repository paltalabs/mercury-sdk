import { Mercury } from '../index';

interface MercuryOptions {
  backendEndpoint: string;
  graphqlEndpoint: string;
  defaultMaxSingleSize?: number;
  email: string;
  password: string;
  updateTokenOnRequest?: boolean;
}

const mercuryOptions: MercuryOptions = {
  backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
  graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
  email: process.env.MERCURY_TESTER_EMAIL!,
  password: process.env.MERCURY_TESTER_PASSWORD!,
};

test('.env Should have valid data', () => {
  const backendEndpoint = process.env.MERCURY_BACKEND_ENDPOINT!;
  const graphqlEndpoint = process.env.MERCURY_GRAPHQL_ENDPOINT!;
  const email = process.env.MERCURY_TESTER_EMAIL!;
  const password = process.env.MERCURY_TESTER_PASSWORD!;

  expect(backendEndpoint).toBeDefined();
  expect(graphqlEndpoint).toBeDefined();
  expect(email).toBeDefined();
  expect(password).toBeDefined();

  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  expect(backendEndpoint).toMatch(urlRegex);
  expect(graphqlEndpoint).toMatch(urlRegex);

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  expect(email).toMatch(emailRegex);

  expect(password.length).toBeGreaterThan(3)

});

test('Should return a new instance of Mercury', () => {
  const mercury = new Mercury(mercuryOptions);
  expect(mercury).toBeInstanceOf(Mercury);
});

  
