const { User } = require('../models');

const userData = [
  {
    username: 'blairrrr_who',
    github: 'blairrrrwho',
    email: 'blair10324@@gmail.com',
    password: 'pw1234pw1',
    bio: 'My name is blair!'
  },
  {
    username: 'christina_h',
    github: 'chrish',
    email: 'christina@gmail.com',
    password: 'pw1234pw2',
    bio: 'My name is Christina!'
  },
  {
    username: 'lacey_a',
    github: 'laceya',
    email: 'lacey@gmail.com',
    password: 'pw1234pw3',
    bio: 'My name is Lacey!'
  },
  {
    username: 'terry_l',
    github: 'terryl',
    email: 'terry@gmail.com',
    password: 'pw1234pw4',
    bio: 'My name is Terry!'
  },
  {
    username: 'ben_s',
    github: 'ben456',
    email: 'ben@gmail.com',
    password: 'pw1234pw5',
    bio: 'My name is Ben!'
  },
  {
    username: 'juno_m',
    github: 'mickie',
    email: 'juno@gmail.com',
    password: 'pw1234pw6',
    bio: 'My name is Juno!'
  },
  {
    username: 'bruce_m',
    github: 'pickles',
    email: 'bruce@gmail.com',
    password: 'pw1234pw7',
    bio: 'My name is Bruce!'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
