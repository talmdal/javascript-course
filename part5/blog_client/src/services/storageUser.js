export const getStorageUser = () => {
  const loggedUserJSON = window.localStorage.getItem('blogList')
  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON)
  }
  return null
}