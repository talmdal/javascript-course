import { TextField } from './TextField'
export const LoginForm = (props) => {
  const { onSubmit, onUsernameChange, username, onPasswordChange, password } = props

  return (
    <>
      <h2>log into application</h2>
      <form onSubmit={onSubmit}>
        <TextField
          label='username:'
          type='text'
          value={username}
          onChange={onUsernameChange}
        />
        <TextField
          label='password:'
          type='password'
          value={password}
          onChange={onPasswordChange}
        />
        <button type="submit">login</button>
      </form>
    </>
  )
}
