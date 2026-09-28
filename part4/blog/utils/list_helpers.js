// eslint-disable-next-line
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (acc, blog) => acc + blog.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (largest, blog) => {
    return blog.likes > largest.likes ? blog : largest
  }
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const counts = blogs.reduce((authors, blog) => {
    authors[blog.author] = (authors[blog.author] || 0) + 1
    return authors
  }, {})

  return Object.entries(counts).reduce(
    (most, [author, blogs]) =>
      blogs > most.blogs ? { author, blogs } : most,
    { author: null, blogs: 0 }
  )
}

const mostLikes = (blogs) => {
  const likes = blogs.reduce((authors, blog) => {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes
    return authors
  }, {})

  console.log(JSON.stringify(likes))
  return Object.entries(likes).reduce(
    (most, [author, likes]) =>
      likes > most.likes ? { author, likes } : most,
    { author: null, likes: 0 }
  )
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
