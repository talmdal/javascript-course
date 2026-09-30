import { useState } from 'react'
import { TextField } from './TextField'

export const NewBlogForm = (props) => {
  const {
    onSubmit
  } = props

  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const submitHandler = (event) => {
     event.preventDefault()
     onSubmit({title, author, url}, resetForm)
  }
  return (
    <div>
      <h2>create new note</h2>

      <form onSubmit={submitHandler}>
        <TextField
          label='title:'
          type='text'
          value={title}
          onChange={ (value) => setTitle(value) }
        />
        <TextField
          label='author:'
          type='text'
          value={author}
          onChange={ (value) => setAuthor(value) }
        />
        <TextField
          label='url:'
          type='text'
          value={url}
          onChange={ (value) => setUrl(value) }
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}