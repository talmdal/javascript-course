export const NewNameText = (props) => {
  const { newName, onChange } = props
  return (
    <div>
      name: <input value={newName} onChange={onChange} />
    </div>
  )
}

export const NewNumberText = (props) => {
  const { newNumber, onChange } = props
  return (
    <div>
      number: <input value={newNumber} onChange={onChange} />
    </div>
  )
}

export const FilterText = (props) => {
  const { newFilter, onChange } = props
  return (
    <div>
      filter shown with: <input value={newFilter} onChange={onChange} />
    </div>
  )
}