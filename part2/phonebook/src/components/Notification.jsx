import { useEffect, useState } from 'react'

const Notification = ({ msgType, message }) => {
  const [visible, setVisible] = useState(message !== null)

  useEffect(() => {
    if (message === null) {
      setVisible(false)
      return
    }

    setVisible(true)
    const timeoutId = setTimeout(() => {
      setVisible(false)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [message])

  if (message === null || !visible) {
    return null
  }

  return (
    <div className={msgType}>
      {message}
    </div>
  )
}

export default Notification