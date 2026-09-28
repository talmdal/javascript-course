const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const favoriteBlog =
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
const blogList = [
  favoriteBlog,
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'The meaning of life',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 3,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fA',
    title: 'Secret of Pi',
    author: 'Johnny B. Goode',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 3,
    __v: 0
  }
]

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([favoriteBlog])
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  test('Find the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogList)
    assert.deepStrictEqual(result, favoriteBlog)
  })
})

describe('Most Blogs', () => {
  test('Find the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogList)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 })
  })
})

describe('Most Likes', () => {
  test('Find the author with the most blogs', () => {
    const result = listHelper.mostLikes(blogList)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 8 })
  })
})
