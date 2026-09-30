const bcrypt = require('bcrypt')
const User = require('../models/users')
const assert = require('node:assert')
const { test, after, before, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { init } = require('../utils/mongo')
const helper = require('./test_helper')

const api = supertest(app)

before(async () => {
  await init()
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'super user',
      passwordHash
    })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with a non unique username', async () => {
    const newUser = {
      username: 'root', name: 'SuperUser',
      password: 'salainen',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.error, 'expected `username` to be unique')
  })

  test('creation fails with missing username', async () => {
    const newUser = {
      name: 'SuperUser',
      password: 'salainen',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.error, 'User validation failed: username: is required')
  })

  test('creation fails with missing password', async () => {
    const newUser = {
      username: 'bbunny',
      name: 'SuperUser',
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.error, 'User validation failed: passwordHash: is required')
  })
})

after(async () => {
  await mongoose.connection.close(true)
})
