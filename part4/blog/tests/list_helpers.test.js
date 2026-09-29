const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')
const { favoriteBlog, initialBlogs } = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([favoriteBlog])
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  test('Find the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(initialBlogs)
    assert.deepStrictEqual(result, favoriteBlog)
  })
})

describe('Most Blogs', () => {
  test('Find the author with the most blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 })
  })
})

describe('Most Likes', () => {
  test('Find the author with the most blogs', () => {
    const result = listHelper.mostLikes(initialBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 8 })
  })
})
