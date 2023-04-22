const { User } = require('../models');

const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('password', 10);
// passwords for seed data will now be "password"

const userData = [
  {
    username: 'blairrrr_who',
    github: 'blairrrrwho',
    email: 'blair10324@gmail.com',
    password: hash,
    bio: 'My name is blair!'
  },
  {
    username: 'christina_h',
    github: 'chrish',
    email: 'christina@gmail.com',
    password: hash,
    bio: 'My name is Christina!'
  },
  {
    username: 'lacey_a',
    github: 'laceya',
    email: 'lacey@gmail.com',
    password: hash,
    bio: 'My name is Lacey!'
  },
  {
    username: 'terry_l',
    github: 'terryl',
    email: 'terry@gmail.com',
    password: hash,
    bio: 'My name is Terry!'
  },
  {
    username: 'ben_s',
    github: 'ben456',
    email: 'ben@gmail.com',
    password: hash,
    bio: 'My name is Ben!'
  },
  {
    username: 'juno_m',
    github: 'mickie',
    email: 'juno@gmail.com',
    password: hash,
    bio: 'My name is Juno!'
  },
  {
    username: 'bruce_m',
    github: 'pickles',
    email: 'bruce@gmail.com',
    password: hash,
    bio: 'My name is Bruce!'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
