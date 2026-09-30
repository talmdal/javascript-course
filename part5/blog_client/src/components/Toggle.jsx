import { useState, useImperativeHandle } from 'react'

export const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const { buttonLabel, children } = props

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={{ display: visible ? 'none' : 'block' }}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={{ display: visible ? 'block' : 'none' }}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
