const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const { userExtractor } = require('../middleware/userExtractor')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { 'blogs': 0 })
  return response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({ ...body, user: user.id })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  return response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { 'blogs': 0 })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { returnDocument: 'after', runValidators: true }
  )
  if (!updatedBlog) {
    return response.status(404).end()
  }
  return response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

module.exports = blogsRouter
