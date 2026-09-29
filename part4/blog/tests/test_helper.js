const existingId = '5a422aa71b54a676234d17f8'
const favoriteBlog =
  {
    _id: existingId,
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }

const initialBlogs = [
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

const nonExistingId = async () => {
  const Blog = require('../models/blogs')
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const Blog = require('../models/blogs')
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  existingId,
  favoriteBlog,
  initialBlogs,
  nonExistingId,
  blogsInDb
}
