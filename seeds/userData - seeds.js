const { User } = require('../models');

const userData = [
  {
    username: 'blairrrr_who',
    github: 'blairrrrwho',
    email: 'blair10324@@gmail.com',
    password: 'pw1234pw1',
  },
  {
    username: 'christina_h',
    github: 'chrish',
    email: 'christina@gmail.com',
    password: 'pw1234pw2',
  },
  {
    username: 'lacey_a',
    github: 'laceya',
    email: 'lacey@gmail.com',
    password: 'pw1234pw3',
  },
  {
    username: 'terry_l',
    github: 'terryl',
    email: 'terry@gmail.com',
    password: 'pw1234pw4',
  },
  {
    username: 'ben_s',
    github: 'ben456',
    email: 'ben@gmail.com',
    password: 'pw1234pw5',
  },
  {
    username: 'juno_m',
    github: 'mickie',
    email: 'juno@gmail.com',
    password: 'pw1234pw6',
  },
  {
    username: 'bruce_m',
    github: 'pickles',
    email: 'bruce@gmail.com',
    password: 'pw1234pw7',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
