const assert = require('node:assert')
const { test, after, before, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blogs')
const User = require('../models/users')
const app = require('../app')
const { init } = require('../utils/mongo')
const helper = require('./test_helper')

const api = supertest(app)

before(async () => {
  await init()
})

describe('when there is initially some blogs saved', () => {
  let testUser
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    testUser = await helper.createTestUser()
  })

  test('Verify blogs are return as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Verify that the _id field is renamed to id', async () => {
    const response = await api.get(`/api/blogs/${helper.existingId}`)
    assert.ok(Object.hasOwn(response.body, 'id'))
  })

  test('Verify that post created a new Blog', async () => {
    const originalCount = await Blog.countDocuments({})
    const newBlog =
      {
        title: 'new entry',
        author: 'Suzy Que',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 0,
        userId: testUser.id
      }
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
    const updatedCount = await Blog.countDocuments({})
    assert.strictEqual(updatedCount, originalCount + 1)
  })

  test('Verify that post created a new Blog with a default like', async () => {
    const originalCount = await Blog.countDocuments({})
    const newBlog =
      {
        title: 'new entry',
        author: 'Suzy Que',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        userId: testUser.id
      }
    const response = await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
    const updatedCount = await Blog.countDocuments({})
    assert.strictEqual(updatedCount, originalCount + 1)
    assert.strictEqual(response.body.likes, 0)
  })

  test('Verify the title is required', async () => {
    const newBlog =
      {
        author: 'Suzy Que',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
      }
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(400)
  })

  test('Verify the url is required', async () => {
    const newBlog =
      {
        title: 'new entry',
        author: 'Suzy Que'
      }
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(400)
  })

  test('Delete a blog', async () => {
    await api
      .delete(`/api/blogs/${helper.existingId}`)
      .expect(204)
  })

  test('Update the likes for a blog entry', async () => {
    const update = { ...helper.favoriteBlog, likes: helper.favoriteBlog.likes + 1 }

    const response = await api
      .put(`/api/blogs/${helper.existingId}`)
      .send(update)
      .expect(200)

    assert.strictEqual(response.body.likes, 6)
  })
})

after(async () => {
  await mongoose.connection.close(true)
})
