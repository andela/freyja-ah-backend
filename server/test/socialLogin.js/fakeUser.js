import faker from 'faker';

const userRequest1 = {
  user: {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    id: faker.random.number({ min: 0, max: 30 }),
    token: faker.random.number({ min: 0, max: 30 }),
    isNewUser: false
  },
};

const userRequest2 = {
  user: {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    id: faker.random.number({ min: 0, max: 30 }),
    token: faker.random.number({ min: 0, max: 30 }),
    isNewUser: true
  }
};

export default {
  userRequest1,
  userRequest2,
};
